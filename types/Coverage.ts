import { HeadProps, StatusKind } from './Commits'

export interface CoverageFileProps {
  file: string
  id: number
  percent_covered: number
}
export interface CoverageResponseProps {
  files: CoverageFileProps[]
  status: StatusKind
  commit: HeadProps
}

export type BlockKind = 'neutral' | 'covered' | 'missed'

export interface Block {
  end: number
  kind: BlockKind
  start: number
}

export interface Source {
  kind: string
  line: number
  source: string
}

export interface FileIdReponseProps {
  coverage: {
    blocks: Block[]
    lines_covered: number
    lines_total: number
    percent_covered: number
  }
  file: {
    base_path: string
    name: string
    source: Source[]
  }
}
