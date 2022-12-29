import classNames from 'classnames'
import React from 'react'

import styles from './Button.module.scss'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  uppercase?: boolean
  onClick?: () => void
}

const Button = ({ children, uppercase, className, onClick }: ButtonProps) => {
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.uppercase]: uppercase,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
