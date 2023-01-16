'use client'

import classNames from 'classnames'
import Link from 'next/link'
import React, { HTMLAttributeAnchorTarget } from 'react'

import Url from 'types/Url'

import styles from './Button.module.scss'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  uppercase?: boolean
  onClick?: (ev: React.MouseEvent) => void
  href?: Url
  style?: 'primary' | 'secondary' | 'inactive' | 'danger' | 'mini'
  disabled?: boolean
  hrefTarget?: HTMLAttributeAnchorTarget
}

const Button = ({
  children,
  uppercase,
  className,
  onClick,
  href,
  disabled,
  hrefTarget,
  style = 'primary',
}: ButtonProps) => {
  const baseProps = {
    className: classNames(styles.button, className, styles[style], {
      [styles.uppercase]: uppercase,
    }),
  }

  if (href && !disabled) {
    return (
      <Link href={href} target={hrefTarget}>
        <div {...baseProps}>{children}</div>
      </Link>
    )
  }

  return (
    <button
      {...baseProps}
      disabled={disabled === true}
      onClick={ev => onClick && !disabled && onClick(ev)}
    >
      {children}
    </button>
  )
}

export default Button
