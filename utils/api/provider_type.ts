'use client'

import {
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
} from './request_response_types'

export default interface APIProvider {
  // Repository

  repositoryList(params: RepositoryListInput): Promise<RepositoryListOutput>
  repositorySettings(
    params: RepositorySettingsInput,
  ): Promise<RepositorySettingsOutput>
  repositoryAdd(params: RepositoryAddInput): Promise<RepositoryAddOutput>
  repositoryDelete(params: RepositoryDeleteInput): Promise<EmptyResponse>
  repositoryRegenerateToken(
    params: RepositoryRegenerateTokenInput,
  ): Promise<RepositoryRegenerateTokenOutput>
  repositoryResync(params: RepositoryResyncInput): Promise<EmptyResponse>

  // Branch

  branchList(params: BranchListInput): Promise<BranchListOutput>

  // Org

  orgReposList(params: OrgReposInput): Promise<OrgReposOutput>
  orgRefreshReposList(params: EmptyRequest): Promise<EmptyResponse>

  // Checks

  checksList(params: ChecksListInput): Promise<ChecksListOutput>
  checksCancel(params: ChecksCancelInput): Promise<EmptyResponse>
  checksReRun(params: ChecksReRunInput): Promise<EmptyResponse>
  checksInfo(params: ChecksInfoInput): Promise<ChecksInfoOutput>

  // Issues

  issuesList(params: IssuesListInput): Promise<IssuesListOutput>
  issuesStates(params: IssuesStatesInput): Promise<IssuesStatesOutput>
  issuesSources(params: IssuesSourcesInput): Promise<IssuesSourcesOutput>
  issuesCategories(
    params: IssuesCategoriesInput,
  ): Promise<IssuesCategoriesOutput>
  issueIgnore(params: IssueIgnoreInput): Promise<IssueIgnoreOutput>
  issueCancelIgnore(
    params: IssueCancelIgnoreInput,
  ): Promise<IssueCancelIgnoreOutput>

  // Secrets

  secretsList(params: SecretsListInput): Promise<SecretsListOutput>
  secretsCheckName(
    params: SecretsCheckNameInput,
  ): Promise<SecretsCheckNameOutput>
  secretsCreate(params: SecretsCreateInput): Promise<SecretsCreateOutput>
  secretsDelete(params: SecretsDeleteInput): Promise<EmptyResponse>
}
