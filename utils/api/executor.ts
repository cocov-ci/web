'use client'

import axios, { AxiosRequestConfig } from 'axios'

import { ErrorHandler } from 'utils/errorHandler'

export type Method =
  | 'GET'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'POST'
  | 'PUT'
  | 'PATCH'

const behavesLikeGet: Method[] = ['GET', 'DELETE', 'HEAD', 'OPTIONS']

interface ParamList {
  [key: string | symbol]: number | string | undefined
}

type RequestParams<I extends ParamList> = {
  method?: Method
  url: string
  params: I
}

const URL_PARAM_REGEXP = /:([a-z_0-9-]+)/gi

type FormattedURL = { url: string; restParams?: Record<string, string> }

export default class BaseAPIExecutor {
  private formatURL<I extends ParamList>(
    url: string,
    params?: I,
  ): FormattedURL {
    const restParams: Record<string, string> = {}
    const hasURLParams = URL_PARAM_REGEXP.test(url)

    if (!hasURLParams && !params) {
      return { url }
    } else if (!hasURLParams && params) {
      for (const k of Object.keys(params)) {
        if (params[k] !== undefined && params[k] !== null) {
          restParams[k] = `${params[k]}`
        }
      }

      return { url, restParams }
    }

    if (!params) {
      throw new Error(
        `url \`${url}' requires parameters, but no parameters were provided`,
      )
    }

    const matchedParams: string[] = []

    url = url.replace(URL_PARAM_REGEXP, match => {
      const param = match.substring(1)
      matchedParams.push(param)

      return `${params[param]}`
    })

    for (const k of Object.keys(params)) {
      if (
        params[k] !== undefined &&
        params[k] !== null &&
        !matchedParams.includes(k)
      ) {
        restParams[k] = `${params[k]}`
      }
    }

    return { url, restParams }
  }

  protected async doRequest<I extends ParamList, O extends object>({
    method = 'GET',
    params,
    url,
  }: RequestParams<I>): Promise<O> {
    const { url: newURL, restParams } = this.formatURL(url, params)
    const config: AxiosRequestConfig = {
      headers: {
        Accept: 'application/json',
      },
      method,
    }

    if (behavesLikeGet.includes(method)) {
      config.params = new URLSearchParams(restParams)
    } else {
      const fd = new FormData()

      for (const k in restParams) {
        fd.set(k, restParams[k])
      }

      config.data = fd
    }

    return await axios(newURL, config)
      .then(resp => {
        return resp.data
      })
      .catch(err => {
        if (ErrorHandler(err.response?.data?.code)) {
          window.location.href = ErrorHandler(err.response.data.code) as string
        }

        throw err
      })
  }
}
