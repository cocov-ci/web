'use client'

import {
  BranchListInput,
  BranchListOutput,
  OrgReposInput,
  OrgReposOutput,
  RepositoryListInput,
  RepositoryListOutput,
} from './request_response_types'

export default interface APIProvider {
  repositoryList(params: RepositoryListInput): Promise<RepositoryListOutput>

  branchList(params: BranchListInput): Promise<BranchListOutput>

  orgReposList(params: OrgReposInput): Promise<OrgReposOutput>
}
