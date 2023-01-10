import localFont from '@next/font/local'
import classNames from 'classnames'
import React from 'react'

import styles from './Kbd.module.scss'

type BoxProps = {
  className?: string
  text: string
}

const inconsolata = localFont({
  src: '../../../public/fonts/Inconsolata.ttf',
  variable: '--inconsolata-font',
})

const Kbd = ({ className, text }: BoxProps) => {
  return (
    <kbd className={classNames(styles.base, inconsolata.variable, className)}>
      {text}
    </kbd>
  )
}

export default Kbd
