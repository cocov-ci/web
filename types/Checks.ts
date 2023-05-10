export type CheckStatus =
  | 'waiting'
  | 'in_progress'
  | 'completed'
  | 'errored'
  | 'canceled'
  | 'cancelling'
  | 'failure'

export interface CheckProps {
  id: number
  plugin_name: string
  status: CheckStatus
  started_at: string
  finished_at: string
  error_output?: string
}
