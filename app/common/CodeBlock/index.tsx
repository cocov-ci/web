import classNames from 'classnames'
import { AlertTriangle } from 'lucide-react'
import React from 'react'

import { inconsolata } from 'utils/fonts'

import styles from './CodeBlock.module.scss'

type BasicIssueData = {
  kind: 'line' | 'warn'
}

interface LineData extends BasicIssueData {
  kind: 'line'
  line: number
  source: string
}

interface WarningData extends BasicIssueData {
  kind: 'warn'
  text: string
  padding: string
}

type LineProps = {
  line: number
  source: string
  children?: React.ReactNode
}

const Line = ({ line, source, children }: LineProps) => {
  return (
    <tr>
      <td className={classNames(styles.gutter, inconsolata.className)}>
        <div>{line}</div>
      </td>
      <td
        className={classNames(
          'codeblock-line',
          styles.line,
          inconsolata.className,
        )}
      >
        {children}
        <div dangerouslySetInnerHTML={{ __html: source }} />
      </td>
    </tr>
  )
}

type WarningProps = {
  text: string
  padding: string
}

const Warning = ({ text, padding }: WarningProps) => {
  return (
    <tr>
      <td className={styles.gutter} />
      <td className={classNames(styles.warningLine)}>
        <pre>{padding}</pre>
        <div className={classNames(styles.warning)}>
          <AlertTriangle className={classNames(styles.icon)} size={20} />
          <div className={classNames(styles.content)}>{text}</div>
        </div>
      </td>
    </tr>
  )
}

type LineOrWarning = LineData | WarningData

type IssueData = {
  objects: LineOrWarning[]
}

const Issue = ({ objects }: IssueData) => {
  return (
    <>
      {objects.map(obj =>
        'source' in obj ? (
          <Line key={`line=${obj.line}`} line={obj.line} source={obj.source} />
        ) : (
          <Warning key="warning" padding={obj.padding} text={obj.text} />
        ),
      )}
    </>
  )
}

type CoverageBlockProps = {
  kind: string
  span: number
}

const CoverageBlock = ({ kind, span }: CoverageBlockProps) => {
  return (
    <div
      className={classNames(styles.block, styles[kind])}
      style={{ height: `${span * 19 + 2}px` }}
    />
  )
}

type CoverageData = {
  source: Array<{
    kind: string
    line: number
    source: string
  }>
  blocks: Array<{
    kind: 'covered' | 'neutral' | 'missed'
    start: number
    end: number
  }>
}

const Coverage = ({ source, blocks }: CoverageData) => {
  return (
    <>
      {source.map(obj => {
        const blockStart = blocks.find(b => b.start == obj.line)

        return (
          <Line key={`line=${obj.line}`} line={obj.line} source={obj.source}>
            {blockStart && (
              <CoverageBlock
                kind={blockStart.kind}
                span={blockStart.end - blockStart.start + 1}
              />
            )}
          </Line>
        )
      })}
    </>
  )
}

type BaseCodeBlockProps = {
  className?: string
}

interface IssueCodeBlock extends BaseCodeBlockProps {
  issue: IssueData
  coverage: never
}

interface CoverageCodeBlock extends BaseCodeBlockProps {
  issue: never
  coverage: CoverageData
}

type CodeBlockProps = CoverageCodeBlock | IssueCodeBlock

const CodeBlock = ({ className, issue, coverage }: CodeBlockProps) => {
  return (
    <div className={classNames(styles.base, className)}>
      <table className={classNames(styles.table)}>
        <tbody>
          {issue ? (
            <Issue objects={issue.objects} />
          ) : (
            <Coverage blocks={coverage.blocks} source={coverage.source} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CodeBlock
