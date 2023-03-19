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

  // Branch

  branchList(params: BranchListInput): Promise<BranchListOutput>

  // Org

  orgReposList(params: OrgReposInput): Promise<OrgReposOutput>

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
