'use client'

import { CheckProps, CheckStatus } from 'types/Checks'
import { HeadProps } from 'types/Commits'
import { IssueIgnoreModes, IssueProps } from 'types/Issues'
import { PagingProps } from 'types/Paging'
import { OrgRepo, RepositoryProps } from 'types/Repositories'
import { SecretParams } from 'types/Secrets'

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

export type IssuesListInput = {
  repositoryName: string
  commitSHA: string
  source?: string
  category?: string
  state?: string
  page: number
}

export interface IssuesListOutput {
  commit: HeadProps
  issues: IssueProps[]
  paging: PagingProps[]
  repository: Omit<RepositoryProps, 'head'>
}

export type IssuesStatesInput = {
  repositoryName: string
  commitSHA: string
}

export interface IssuesStatesOutput {
  [arg: string]: number
}

export type IssuesSourcesInput = {
  repositoryName: string
  commitSHA: string
}

export interface IssuesSourcesOutput {
  [arg: string]: number
}

export type IssuesCategoriesInput = {
  repositoryName: string
  commitSHA: string
}

export interface IssuesCategoriesOutput {
  [arg: string]: number
}

export type IssueIgnoreInput = {
  repositoryName: string
  commitSHA: string
  issueID: number
  reason?: string
  mode: IssueIgnoreModes
}

export type IssueIgnoreOutput = IssueProps

export type IssueCancelIgnoreInput = {
  repositoryName: string
  commitSHA: string
  issueID: number
}

export type IssueCancelIgnoreOutput = IssueProps

export type SecretsListInput = {
  repositoryName?: string
}

export interface SecretsListOutput {
  paging: PagingProps
  secrets: SecretParams[]
}

export type SecretsCheckNameInput = {
  repositoryName?: string
  name: string
}

export interface SecretsCheckNameOutput {
  status: 'ok' | 'conflict' | 'override' | 'invalid'
}

export type SecretsCreateInput = {
  repositoryName?: string
  name: string
  data: string
}

export type SecretsCreateOutput = SecretParams

export type SecretsDeleteInput = {
  repositoryName?: string
  secretID: number
}
