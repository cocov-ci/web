import classNames from 'classnames'
import React from 'react'

import { inconsolata } from 'utils/fonts'

import styles from './Kbd.module.scss'

type BoxProps = {
  className?: string
  text: string
}

const Kbd = ({ className, text }: BoxProps) => {
  return (
    <kbd className={classNames(styles.base, inconsolata.variable, className)}>
      {text}
    </kbd>
  )
}

export default Kbd
