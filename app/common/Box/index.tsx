import classNames from 'classnames'
import React from 'react'

import styles from './Box.module.scss'

type BoxProps = {
  children?: React.ReactNode
  className?: string
  gutterBottom?: boolean
  backgroundTextSmall?: string
  backgroundTextLarge?: string
}

const Box = ({
  children,
  gutterBottom,
  backgroundTextLarge,
  backgroundTextSmall,
  className,
}: BoxProps) => {
  const backgroundText = backgroundTextLarge || backgroundTextSmall

  return (
    <div
      className={classNames(styles.box, className, {
        [styles.gutterBottom]: gutterBottom,
      })}
    >
      {backgroundText && (
        <span
          className={classNames(styles.backgroundText, {
            [styles.small]: Boolean(backgroundTextSmall),
          })}
        >
          {backgroundText}
        </span>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Box
