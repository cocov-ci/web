'use client'

import { PagingProps } from 'types/Paging'
import { RepositoryProps } from 'types/Repositories'

export type RepositoryListInput = {
  page?: number
  search_term?: string
}

export interface RepositoryListOutput {
  repositories: RepositoryProps[]
  paging: PagingProps
}

export type BranchListInput = {
  repositoryName: string
}

export interface BranchListOutput {
  branches: string[]
}
