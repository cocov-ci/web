'use client'

import { CheckProps, CheckStatus } from 'types/Checks'
import { HeadProps } from 'types/Commits'
import { PagingProps } from 'types/Paging'
import { OrgRepo, RepositoryProps } from 'types/Repositories'

export interface EmptyResponse {
  [key: string]: never
}

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

export type ChecksListInput = {
  repositoryName: string
  commitSHA: string
}

export type ChecksCancelInput = ChecksListInput
export type ChecksReRunInput = ChecksListInput

export interface ChecksListOutput {
  checks: CheckProps[]
  commit: HeadProps
  issues: Record<string, number>
  status: CheckStatus
}

export type ChecksInfoInput = {
  repositoryName: string
  commitSHA: string
  checkID: number
}

export type ChecksInfoOutput = CheckProps
