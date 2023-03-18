'use client'

import { bindAll } from './bind_all'
import APIError from './error'
import ErrorCode from './error_codes'
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
  IssueCancelIgnoreInput,
  IssueCancelIgnoreOutput,
  IssueIgnoreInput,
  IssueIgnoreOutput,
  IssuesCategoriesInput,
  IssuesCategoriesOutput,
  IssuesListInput,
  IssuesListOutput,
  IssuesSourcesInput,
  IssuesSourcesOutput,
  IssuesStatesInput,
  IssuesStatesOutput,
  OrgReposInput,
  OrgReposOutput,
  RepositoryListInput,
  RepositoryListOutput,
} from './request_response_types'

export { default as useAPI } from 'hooks/useAPI'
export { APIError, ErrorCode }
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
  IssueCancelIgnoreInput,
  IssueCancelIgnoreOutput,
  IssueIgnoreInput,
  IssueIgnoreOutput,
  IssuesCategoriesInput,
  IssuesCategoriesOutput,
  IssuesListInput,
  IssuesListOutput,
  IssuesSourcesInput,
  IssuesSourcesOutput,
  IssuesStatesInput,
  IssuesStatesOutput,
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

  issuesCategories(
    params: IssuesCategoriesInput,
  ): Promise<IssuesCategoriesOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/issues/categories`,
      params,
    })
  }

  issuesList(params: IssuesListInput): Promise<IssuesListOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/issues`,
      params,
    })
  }

  issuesSources(params: IssuesSourcesInput): Promise<IssuesSourcesOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/issues/sources`,
      params,
    })
  }

  issuesStates(params: IssuesStatesInput): Promise<IssuesStatesOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/issues/states`,
      params,
    })
  }

  issueCancelIgnore(
    params: IssueCancelIgnoreInput,
  ): Promise<IssueCancelIgnoreOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/issues/:issueID/ignore`,
      method: 'POST',
      params,
    })
  }

  issueIgnore(params: IssueIgnoreInput): Promise<IssueIgnoreOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/issues/:issueID/cancelIgnore`,
      params,
    })
  }
}

API.shared = new API()

export default API
