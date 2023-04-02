/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import formidable from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'
import { redirect } from 'next/navigation'

type NextHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

type RedirectMaker = (req: NextApiRequest, err: CocovAPIError) => string

type CocovAPIError = {
  code: string
  message: string
}

type RedirectList = { [key: string]: RedirectMaker }

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export const nonGETConfig = {
  api: {
    bodyParser: false,
  },
}

export interface ParsedNextAPIRequest extends NextApiRequest {
  body: Record<string, string>
}

export default class APIProxy {
  private readonly baseURL: string | undefined
  private method = ''
  private url: string | undefined
  private headers: object | undefined
  private paramMapper:
    | ((req: ParsedNextAPIRequest) => Record<string, any>)
    | undefined
  private responseMapper: ((data: any) => any) | undefined
  private urlMapper: ((req: ParsedNextAPIRequest) => string) | undefined
  private requiredMethod?: HTTPMethod

  constructor() {
    this.baseURL = process.env.COCOV_API_URL
  }

  private setBaseOptions(method: string, url?: string): NextHandler {
    this.method = method

    if (url) {
      this.url = url
      this.urlMapper = undefined
    }

    return async (req, res) => await this.call(req, res)
  }

  private async call(req: NextApiRequest, res: NextApiResponse) {
    if (
      this.requiredMethod &&
      req.method?.toLowerCase() !== this.requiredMethod.toLowerCase()
    ) {
      // Reject requests not matching expected HTTP method
      res.status(405).json({
        error: 'Method not allowed',
      })

      return
    }

    let url: string

    const cocov_auth_token = req.cookies['cocov_auth_token']

    const headers = {
      ...(cocov_auth_token && { authorization: `bearer ${cocov_auth_token}` }),
      ...(req.headers || {}),
    }

    const body: Record<string, string> = {}

    if (this.requiredMethod && this.requiredMethod !== 'GET') {
      const length = parseInt(headers['content-length'] || '0', 10)

      if (length > 0) {
        const { fields } = await (new Promise((resolve, reject) => {
          const form = new formidable.IncomingForm()
          form.parse(req, (err: any, fields: any) => {
            if (err) {
              reject(err)

              return
            }

            resolve({ fields })
          })
        }) as Promise<any>)

        Object.keys(fields).forEach(k => {
          body[k] = fields[k]
        })
      }

      delete headers['content-type']
      delete headers['content-length']
    }

    const parsedRequest: ParsedNextAPIRequest = req
    parsedRequest.body = body

    if (this.url) {
      url = this.url
    } else if (this.urlMapper) {
      url = this.urlMapper(parsedRequest)
    } else {
      throw new Error(
        `Either provide an url through the ${this.method} call, or use mapURL to dynamically assemble one`,
      )
    }

    const args: AxiosRequestConfig = {
      url: `${this.baseURL}${url}`,
      method: this.method,
      headers: headers,
    }

    if (this.headers) {
      Object.entries(this.headers).forEach((value, key) => {
        if (args.headers) {
          args.headers[key] = value
        } else {
          args.headers = { [key]: value }
        }
      })
    }

    if (this.paramMapper) {
      const mapped = this.paramMapper(parsedRequest)

      if (this.requiredMethod && this.requiredMethod !== 'GET') {
        const toPush: Record<string, any> = {}
        Object.keys(mapped).forEach(k => {
          if (mapped[k] !== undefined && mapped[k] !== null) {
            toPush[k] = mapped[k]
          }
        })

        args.data = toPush
      } else {
        args.params = mapped
      }
    }

    let response

    try {
      response = await axios.request(args)
    } catch (ex) {
      if (ex instanceof AxiosError && ex.response) {
        this.handleAxiosError(req, res, ex.response)

        return
      }

      throw ex
    }

    let result = response.data

    if (this.responseMapper) {
      result = this.responseMapper(result)
    }

    this.streamJSONResponse(res, response, result)
  }

  private streamJSONResponse(
    res: NextApiResponse,
    axiosResponse: AxiosResponse,
    data: any,
  ) {
    for (const k in axiosResponse.headers) {
      res.setHeader(k, axiosResponse.headers[k] as string)
    }

    res.status(axiosResponse.status).json(data)
  }

  get(url?: string): NextHandler {
    return this.setBaseOptions('get', url)
  }

  post(url?: string): NextHandler {
    return this.setBaseOptions('post', url)
  }

  patch(url?: string): NextHandler {
    return this.setBaseOptions('patch', url)
  }

  delete(url?: string): NextHandler {
    return this.setBaseOptions('delete', url)
  }

  requireMethod(name: HTTPMethod): APIProxy {
    this.requiredMethod = name

    return this
  }

  mapURL(fn: (req: NextApiRequest) => string): APIProxy {
    this.urlMapper = fn
    this.url = undefined

    return this
  }

  extraHeaders(headers: object): APIProxy {
    this.headers = headers

    return this
  }

  mapParams(fn: (req: NextApiRequest) => object): APIProxy {
    this.paramMapper = fn

    return this
  }

  mapResponse(fn: (data: any) => any): APIProxy {
    this.responseMapper = fn

    return this
  }

  private static REDIRECTABLE_ERROR_CODES: RedirectList = {
    'auth.invalid_token': () => '/auth/signin?invalid_token=true',
  }

  private handleAxiosError(
    req: NextApiRequest,
    res: NextApiResponse,
    response: AxiosResponse<any>,
  ) {
    if (
      response.data &&
      response.data.code &&
      response.data.code in APIProxy.REDIRECTABLE_ERROR_CODES
    ) {
      const next = APIProxy.REDIRECTABLE_ERROR_CODES[response.data.code](
        req,
        response.data as CocovAPIError,
      )

      redirect(next)

      return
    }

    this.streamJSONResponse(res, response, response.data)
  }
}
