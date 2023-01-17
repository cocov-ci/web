import classNames from 'classnames'
import React from 'react'

import { inconsolata } from 'utils/fonts'

import styles from './Kbd.module.scss'

type BoxProps = {
  className?: string
  text: string
  variation?: 'light' | 'dark'
  size?: 'normal' | 'mini'
}

const Kbd = ({
  className,
  text,
  variation = 'light',
  size = 'normal',
}: BoxProps) => {
  return (
    <kbd
      className={classNames(styles.base, inconsolata.variable, className, {
        [styles.light]: variation === 'light',
        [styles.dark]: variation === 'dark',
        [styles.mini]: size === 'mini',
      })}
    >
      {text}
    </kbd>
  )
}

export default Kbd
