import classNames from 'classnames'
import React from 'react'

import styles from './Button.module.scss'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  uppercase?: boolean
  onClick?: () => void
  style?: 'primary' | 'secondary' | 'inactive' | 'danger' | 'mini'
  disabled?: boolean
}

const Button = ({
  children,
  uppercase,
  className,
  onClick,
  disabled,
  style = 'primary',
}: ButtonProps) => {
  return (
    <button
      className={classNames(styles.button, className, styles[style], {
        [styles.uppercase]: uppercase,
      })}
      disabled={disabled === true}
      onClick={() => onClick && !disabled && onClick()}
    >
      {children}
    </button>
  )
}

export default Button
