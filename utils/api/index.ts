'use client'

import { bindAll } from './bind_all'
import BaseAPIExecutor from './executor'
import APIProvider from './provider_type'
import {
  BranchListInput,
  BranchListOutput,
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

  branchList(params: BranchListInput): Promise<BranchListOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/branches`,
      params,
    })
  }
}

API.shared = new API()

export default API
