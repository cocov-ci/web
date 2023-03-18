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
}
