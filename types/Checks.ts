import { HeadProps } from './Commits'

export type CheckStatus =
  | 'waiting'
  | 'running'
  | 'succeeded'
  | 'errored'
  | 'canceled'

const finishedStatuses: CheckStatus[] = ['succeeded', 'errored', 'canceled']

export const isCheckFinished = (status: CheckStatus | undefined) =>
  status && status in finishedStatuses

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
