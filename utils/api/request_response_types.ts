'use client'

import { CheckProps, CheckStatus } from 'types/Checks'
import { HeadProps } from 'types/Commits'
import { IssueIgnoreModes, IssueProps } from 'types/Issues'
import { PagingProps } from 'types/Paging'
import { OrgRepo, RepositoryProps } from 'types/Repositories'
import { SecretParams } from 'types/Secrets'

export type EmptyRequest = Record<string, never>

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

export type BranchListOutput = Array<string>

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

export type ChecksFailureReason =
  | 'commit_fetch_failed'
  | 'manifest_root_must_be_mapping'
  | 'manifest_missing_version'
  | 'manifest_version_type_mismatch'
  | 'manifest_version_unsupported'
  | 'manifest_unknown_secret'
  | 'manifest_duplicated_mount_destination'
  | 'manifest_invalid_mount_source'
  | 'manifest_invalid_or_missing_data'

export interface ChecksListOutput {
  checks: CheckProps[]
  commit: HeadProps
  issues: Record<string, number>
  status: CheckStatus
  failure_reason?: ChecksFailureReason
  failure_details?: string
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

export type RepositorySettingsInput = {
  repositoryName: string
}

export interface RepositorySettingsOutput {
  repository: Omit<RepositoryProps, 'head'>
  secrets_count: number
  permissions: {
    can_delete: boolean
    can_regen_token: boolean
    can_sync_github: boolean
  }
}

export type RepositoryAddInput = {
  name: string
}

export type RepositoryAddOutput = RepositoryProps

export type RepositoryDeleteInput = {
  repositoryName: string
}

export type RepositoryRegenerateTokenInput = {
  repositoryName: string
}

export interface RepositoryRegenerateTokenOutput {
  new_token: string
}

export type RepositoryResyncInput = {
  repositoryName: string
}

export type RepositoryGraphsInput = {
  repositoryName: string
}

export interface RepositoryGraphsOutput {
  issues: number[]
  coverage: number[]
}

export interface ServiceToken {
  id: number
  description: string
  created_by: string
  created_at: string
  last_used_at?: string
}

export interface ServiceTokensOutput {
  tokens: ServiceToken[]
}

export type AdminServiceTokenCreateInput = {
  description: string
}

export interface AdminServiceTokenCreateOutput extends ServiceToken {
  token_value: string
}

export type AdminServiceTokenDeleteInput = {
  id: number
}

export interface AdminServiceTokenDeleteOutput {
  token_value: string
}

export interface AdminSidebarCountersOutput {
  tokens: number
  secrets: number
  repositories: number
  users: number
}
