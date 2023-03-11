import { HeadProps } from './Commits'

export type CheckStatus =
  | 'waiting'
  | 'in_progress'
  | 'completed'
  | 'errored'
  | 'canceled'

export interface CheckProps {
  id: number
  plugin_name: string
  status: CheckStatus
  started_at: string
  finished_at: string
  error_output?: string
}

export interface ChecksResponseProps {
  checks: CheckProps[]
  commit: HeadProps
  issues: { [arg: string]: number }
  status: CheckStatus
}
