'use client'

import classNames from 'classnames'
import { AlertTriangle } from 'lucide-react'
import React from 'react'

import { Block, BlockKind, Source } from 'types/Coverage'
import { IssueFileContentProps } from 'types/Issues'
import { inconsolata } from 'utils/fonts'

import styles from './CodeBlock.module.scss'

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

const Issue = ({ data }: { data: IssueFileContentProps[] }) => {
  return (
    <>
      {data.map(obj =>
        'source' in obj ? (
          <Line key={`line-${obj.line}`} line={obj.line} source={obj.source} />
        ) : (
          <Warning key="warning" padding={obj.padding} text={obj.text} />
        ),
      )}
    </>
  )
}

type PlainTextBlockProps = {
  source: string
}

const cleanHTML = (source: string) =>
  source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const PlainText = ({ source }: PlainTextBlockProps) => {
  return (
    <>
      {source
        .split('\n')
        .map((i, idx) => ({ source: `<pre>${cleanHTML(i)}</pre>`, idx: idx }))
        .map(obj => (
          <Line
            key={`plaintext-${obj.idx}`}
            line={obj.idx + 1}
            source={obj.source}
          />
        ))}
    </>
  )
}

type CoverageBlockProps = {
  kind: BlockKind
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
  source: Source[]
  blocks: Block[]
}

const Coverage = ({ source, blocks }: CoverageData) => {
  return (
    <>
      {source.map(obj => {
        const blockStart = blocks.find(b => b.start == obj.line)

        return (
          <Line key={`line-${obj.line}`} line={obj.line} source={obj.source}>
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

interface CodeBlockProps {
  coverage?: CoverageData
  issue?: IssueFileContentProps[]
  plainText?: string
  className?: string
}

const CodeBlock = ({
  className,
  issue,
  coverage,
  plainText,
}: CodeBlockProps) => {
  return (
    <div className={classNames(styles.base, className)}>
      <table className={classNames(styles.table)}>
        <tbody>
          {issue && <Issue data={issue} />}
          {coverage && (
            <Coverage blocks={coverage.blocks} source={coverage.source} />
          )}
          {plainText && <PlainText source={plainText} />}
        </tbody>
      </table>
    </div>
  )
}

export default CodeBlock
