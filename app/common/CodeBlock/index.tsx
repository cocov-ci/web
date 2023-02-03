import classNames from 'classnames'
import { AlertTriangle } from 'lucide-react'
import React from 'react'

import { inconsolata } from 'utils/fonts'

import styles from './CodeBlock.module.scss'

type LineProps = {
  line: number
  source: string
}
type WarningProps = {
  text: string
  padding: string
}

type CodeBlockProps = {
  className?: string
  objects?: [any]
}

const Line = ({ line, source }: LineProps) => {
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
        dangerouslySetInnerHTML={{ __html: source }}
      />
    </tr>
  )
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

const CodeBlock = ({ className, objects }: CodeBlockProps) => {
  return (
    <div className={classNames(styles.base, className)}>
      <table className={classNames(styles.table)}>
        <tbody>
          {objects?.map(obj => {
            if (obj?.source) {
              return (
                <Line
                  key={`line=${obj.line}`}
                  line={obj.line}
                  source={obj.source}
                />
              )
            } else {
              return (
                <Warning key="warning" padding={obj.padding} text={obj.text} />
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CodeBlock
