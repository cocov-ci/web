'use client'

import { bindAll } from './bind_all'
import BaseAPIExecutor from './executor'
import APIProvider from './provider_type'
import {
  RepositoryListInput,
  RepositoryListOutput,
} from './request_response_types'

export { default as useAPI } from 'hooks/useAPI'
export type { RepositoryListInput, RepositoryListOutput }

class API extends BaseAPIExecutor implements APIProvider {
  static shared: API

  constructor() {
    super()
    bindAll(this)
  }

  repositoryList(params: RepositoryListInput): Promise<RepositoryListOutput> {
    return this.doRequest({
      url: '/api/repositories',
      params,
    })
  }
}

API.shared = new API()

export default API
