import React from 'react'

import { StatusKind } from './Commits'

type BasicIssueData = {
  type: 'line' | 'warn'
}

interface LineData extends BasicIssueData {
  type: 'line'
  line: number
  source: string
}

interface WarningData extends BasicIssueData {
  type: 'warn'
  text: string
  padding: string
}

export type IssueFileContentProps = LineData | WarningData

export type IssueIgnoreMetadata = {
  ignore_source: 'rule' | 'user'
  ignored_at: string
  reason?: string
  ignored_by: {
    name: string
    avatar?: string
  }
}

export interface IssueProps {
  affected_file: {
    content: IssueFileContentProps[]
    status: 'ok' | 'errored' | 'new'
  }
  ignored?: IssueIgnoreMetadata
  check_source: string
  file: string
  id: number
  kind: string
  line_end: number
  line_start: number
  message: string
  status: StatusKind
  status_reason: string | null
  uid: string
}

export type IssueIgnoreModes = 'ephemeral' | 'permanent'

export interface IssuesPropsContext {
  repositoryName: string
  commitSha: string
  refetch: () => void
}

export interface IssuesPropsProvider {
  repositoryName: string
  commitSha: string
  children: React.ReactNode
  refetch: () => void
}
