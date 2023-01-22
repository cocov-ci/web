/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { redirect } from 'next/navigation'

type NextHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

type RedirectMaker = (req: NextApiRequest, err: CocovAPIError) => string

type CocovAPIError = {
  code: string
  message: string
}

type RedirectList = { [key: string]: RedirectMaker }

export default class APIProxy {
  private readonly baseURL: string | undefined
  private method = ''
  private url: string | undefined
  private headers: object | undefined
  private paramMapper: ((req: NextApiRequest) => object) | undefined
  private responseMapper: ((data: any) => any) | undefined
  private urlMapper: ((req: NextApiRequest) => string) | undefined

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
    let url: string

    const cocov_auth_token = req.cookies['cocov_auth_token']

    const headers = {
      ...(cocov_auth_token && { authorization: `bearer ${cocov_auth_token}` }),
      ...(req.headers || {}),
    }

    if (this.url) {
      url = this.url
    } else if (this.urlMapper) {
      url = this.urlMapper(req)
    } else {
      throw new Error(
        `Either provide an url through the ${this.method} call, or use mapURL to dynamically assemble one`,
      )
    }

    const args: AxiosRequestConfig = {
      url: `${this.baseURL}${url}`,
      method: this.method,
      headers: headers,
      params: {},
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
      args.params = this.paramMapper(req)
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
