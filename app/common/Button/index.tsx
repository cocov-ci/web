import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import Url from 'types/Url'

import styles from './Button.module.scss'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  uppercase?: boolean
  onClick?: () => void
  href?: Url
  style?: 'primary' | 'secondary' | 'inactive' | 'danger' | 'mini'
  disabled?: boolean
}

const Button = ({
  children,
  uppercase,
  className,
  onClick,
  href,
  disabled,
  style = 'primary',
}: ButtonProps) => {
  const baseProps = {
    className: classNames(styles.button, className, styles[style], {
      [styles.uppercase]: uppercase,
    }),
  }

  if (href && !disabled) {
    return (
      <Link href={href}>
        <div {...baseProps}>{children}</div>
      </Link>
    )
  }

  return (
    <button
      {...baseProps}
      disabled={disabled === true}
      onClick={() => onClick && !disabled && onClick()}
    >
      {children}
    </button>
  )
}

export default Button
