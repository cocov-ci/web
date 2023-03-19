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
} from './request_response_types'

export default interface APIProvider {
  repositoryList(params: RepositoryListInput): Promise<RepositoryListOutput>

  branchList(params: BranchListInput): Promise<BranchListOutput>

  orgReposList(params: OrgReposInput): Promise<OrgReposOutput>

  checksList(params: ChecksListInput): Promise<ChecksListOutput>
  checksCancel(params: ChecksCancelInput): Promise<EmptyResponse>
  checksReRun(params: ChecksReRunInput): Promise<EmptyResponse>
  checksInfo(params: ChecksInfoInput): Promise<ChecksInfoOutput>

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
}
