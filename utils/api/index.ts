'use client'

import { bindAll } from './bind_all'
import BaseAPIExecutor from './executor'
import APIProvider from './provider_type'
import {
  BranchListInput,
  BranchListOutput,
  OrgReposInput,
  OrgReposOutput,
  RepositoryListInput,
  RepositoryListOutput,
} from './request_response_types'

export { default as useAPI } from 'hooks/useAPI'
export type {
  RepositoryListInput,
  RepositoryListOutput,
  BranchListInput,
  BranchListOutput,
  OrgReposInput,
  OrgReposOutput,
}

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

  orgReposList(params: OrgReposInput): Promise<OrgReposOutput> {
    return this.doRequest({
      url: `/api/repositories/$org_repos`,
      params,
    })
  }
}

API.shared = new API()

export default API
