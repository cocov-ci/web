'use client'

import { bindAll } from './bind_all'
import BaseAPIExecutor from './executor'
import APIProvider from './provider_type'
import {
  BranchListInput,
  BranchListOutput,
  ChecksCancelInput,
  ChecksInfoInput,
  ChecksInfoOutput,
  ChecksListInput,
  ChecksListOutput,
  ChecksReRunInput,
  EmptyResponse,
  OrgReposInput,
  OrgReposOutput,
  RepositoryListInput,
  RepositoryListOutput,
} from './request_response_types'

export { default as useAPI } from 'hooks/useAPI'
export type {
  BranchListInput,
  BranchListOutput,
  ChecksCancelInput,
  ChecksInfoInput,
  ChecksInfoOutput,
  ChecksListInput,
  ChecksListOutput,
  ChecksReRunInput,
  EmptyResponse,
  OrgReposInput,
  OrgReposOutput,
  RepositoryListInput,
  RepositoryListOutput,
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

  checksList(params: ChecksListInput): Promise<ChecksListOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/checks`,
      params,
    })
  }

  checksReRun(params: ChecksReRunInput): Promise<EmptyResponse> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/checks`,
      method: 'POST',
      params,
    })
  }

  checksCancel(params: ChecksCancelInput): Promise<EmptyResponse> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/checks`,
      method: 'DELETE',
      params,
    })
  }

  checksInfo(params: ChecksInfoInput): Promise<ChecksInfoOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/checks/:checkID`,
      params,
    })
  }
}

API.shared = new API()

export default API
