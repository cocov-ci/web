'use client'

import { PagingProps } from 'types/Paging'
import { OrgRepo, RepositoryProps } from 'types/Repositories'

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

export type OrgReposInput = {
  page?: number
  search_term?: string
}

export interface OrgReposOutput {
  status: 'updating' | 'ok'
  paging: PagingProps
  total_pages: number
  current_page: number
  last_updated: string
  items: OrgRepo[]
}
