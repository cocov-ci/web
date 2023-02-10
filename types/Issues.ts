import { HeadProps, StatusKind } from './Commits'
import { PagingProps } from './Paging'
import { RepositoryProps } from './Repositories'

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

export interface IssueProps {
  affected_file: {
    content: IssueFileContentProps[]
    status: 'ok' | 'errored' | 'new'
  }
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

export interface IssuesResponseProps {
  commit: HeadProps
  issues: IssueProps[]
  paging: PagingProps[]
  repository: Omit<RepositoryProps, 'head'>
}
