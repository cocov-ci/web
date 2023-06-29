import { bindAll } from './bind_all'
import APIError from './error'
import ErrorCode from './error_codes'
import BaseAPIExecutor from './executor'
import APIProvider from './provider_type'
import {
  AdminRepositoryDeleteInput,
  AdminRepositoryDeleteOutput,
  AdminRepositoryListInput,
  AdminRepositoryListOutput,
  AdminServiceTokenCreateInput,
  AdminServiceTokenCreateOutput,
  AdminServiceTokenDeleteInput,
  AdminServiceTokenDeleteOutput,
  AdminSidebarCountersOutput,
  BranchListInput,
  BranchListOutput,
  ChecksCancelInput,
  ChecksInfoInput,
  ChecksInfoOutput,
  ChecksListInput,
  ChecksListOutput,
  ChecksReRunInput,
  EmptyRequest,
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
  RepositoryAddInput,
  RepositoryAddOutput,
  RepositoryDeleteInput,
  RepositoryGraphsInput,
  RepositoryGraphsOutput,
  RepositoryListInput,
  RepositoryListOutput,
  RepositoryRegenerateTokenInput,
  RepositoryRegenerateTokenOutput,
  RepositoryResyncInput,
  RepositorySettingsInput,
  RepositorySettingsOutput,
  SecretsCheckNameInput,
  SecretsCheckNameOutput,
  SecretsCreateInput,
  SecretsCreateOutput,
  SecretsDeleteInput,
  SecretsListInput,
  SecretsListOutput,
  ServiceTokensOutput,
} from './request_response_types'

export { default as useAPI } from 'hooks/useAPI'
export { APIError, ErrorCode }

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
      url: `/api/repositories/:repositoryName/commits/:commitSHA/checks/re_run`,
      method: 'POST',
      params,
    })
  }

  checksCancel(params: ChecksCancelInput): Promise<EmptyResponse> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/commits/:commitSHA/checks/delete`,
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
      url: `/api/repositories/:repositoryName/commits/:commitSHA/issues/:issueID/cancelIgnore`,
      method: 'DELETE',
      params,
    })
  }

  issueIgnore(params: IssueIgnoreInput): Promise<IssueIgnoreOutput> {
    return this.doRequest({
      method: 'POST',
      url: `/api/repositories/:repositoryName/commits/:commitSHA/issues/:issueID/ignore`,
      params,
    })
  }

  secretsList(params: SecretsListInput): Promise<SecretsListOutput> {
    if (params.repositoryName) {
      return this.doRequest({
        url: `/api/repositories/:repositoryName/secrets`,
        params,
      })
    }

    return this.doRequest({
      url: `/api/secrets`,
      params: {},
    })
  }

  secretsCheckName(
    params: SecretsCheckNameInput,
  ): Promise<SecretsCheckNameOutput> {
    let url = '/api/secrets/check_name'

    if (params.repositoryName) {
      url = '/api/repositories/:repositoryName/secrets/check_name'
    }

    return this.doRequest<SecretsCheckNameInput, SecretsCheckNameOutput>({
      method: 'POST',
      url,
      params,
    }).catch(err => {
      if (err instanceof APIError && err.code == ErrorCode.SecretsInvalidName) {
        return Promise.resolve({
          status: 'invalid',
        })
      }

      throw err
    })
  }

  secretsCreate(params: SecretsCreateInput): Promise<SecretsCreateOutput> {
    let url = '/api/secrets/new'

    if (params.repositoryName) {
      url = '/api/repositories/:repositoryName/secrets/new'
    }

    return this.doRequest({
      method: 'POST',
      url,
      params,
    })
  }

  secretsDelete(params: SecretsDeleteInput): Promise<EmptyResponse> {
    let url = '/api/secrets/delete/:secretID'

    if (params.repositoryName) {
      url = '/api/repositories/:repositoryName/secrets/delete/:secretID'
    }

    return this.doRequest({
      method: 'DELETE',
      url,
      params,
    })
  }

  repositorySettings(
    params: RepositorySettingsInput,
  ): Promise<RepositorySettingsOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/settings`,
      params,
    })
  }

  orgRefreshReposList(params: EmptyRequest): Promise<EmptyResponse> {
    return this.doRequest({
      method: 'POST',
      url: `/api/repositories/$org_repos/update`,
      params,
    })
  }

  repositoryAdd(params: RepositoryAddInput): Promise<RepositoryAddOutput> {
    return this.doRequest({
      method: 'POST',
      url: `/api/repositories/add`,
      params,
    })
  }

  repositoryDelete(params: RepositoryDeleteInput): Promise<EmptyResponse> {
    return this.doRequest({
      method: 'POST',
      url: `/api/repositories/:repositoryName/settings/delete`,
      params,
    })
  }

  repositoryRegenerateToken(
    params: RepositoryRegenerateTokenInput,
  ): Promise<RepositoryRegenerateTokenOutput> {
    return this.doRequest({
      method: 'POST',
      url: `/api/repositories/:repositoryName/settings/regen-token`,
      params,
    })
  }

  repositoryResync(params: RepositoryResyncInput): Promise<EmptyResponse> {
    return this.doRequest({
      method: 'POST',
      url: `/api/repositories/:repositoryName/settings/sync-github`,
      params,
    })
  }

  repositoryGraphs(
    params: RepositoryGraphsInput,
  ): Promise<RepositoryGraphsOutput> {
    return this.doRequest({
      url: `/api/repositories/:repositoryName/graphs`,
      params,
    })
  }

  serviceTokens(): Promise<ServiceTokensOutput> {
    return this.doRequest({
      url: '/api/adminland/service_tokens',
      params: {},
    })
  }

  adminServiceTokenCreate(
    params: AdminServiceTokenCreateInput,
  ): Promise<AdminServiceTokenCreateOutput> {
    return this.doRequest({
      method: 'POST',
      url: '/api/adminland/service_tokens/new',
      params,
    })
  }

  adminServiceTokenDelete(
    params: AdminServiceTokenDeleteInput,
  ): Promise<AdminServiceTokenDeleteOutput> {
    return this.doRequest({
      method: 'DELETE',
      url: '/api/adminland/service_tokens/delete',
      params,
    })
  }

  adminSidebarCounters(): Promise<AdminSidebarCountersOutput> {
    return this.doRequest({
      method: 'GET',
      url: '/api/adminland/sidebar_counters',
      params: {},
    })
  }

  adminRepositories(
    params: AdminRepositoryListInput,
  ): Promise<AdminRepositoryListOutput> {
    return this.doRequest({
      method: 'GET',
      url: '/api/adminland/repositories',
      params: params,
    })
  }

  adminRepositoriesDelete(
    params: AdminRepositoryDeleteInput,
  ): Promise<AdminRepositoryDeleteOutput> {
    return this.doRequest({
      method: 'DELETE',
      url: '/api/adminland/repositories/delete',
      params: params,
    })
  }
}

API.shared = new API()

export default API
