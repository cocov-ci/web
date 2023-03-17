'use client'

import {
  BranchListInput,
  BranchListOutput,
  RepositoryListInput,
  RepositoryListOutput,
} from './request_response_types'

export default interface APIProvider {
  repositoryList(params: RepositoryListInput): Promise<RepositoryListOutput>

  branchList(params: BranchListInput): Promise<BranchListOutput>
}
