'use client'

import classNames from 'classnames'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React, { forwardRef } from 'react'

import { satoshi } from 'utils/fonts'

import styles from './Menu.module.scss'

interface MenuItemProps {
  label: string
  icon?: LucideIcon
  danger?: boolean
  onClick?: () => void
  href?: string
}

export const MenuItem = ({
  label,
  icon,
  danger,
  onClick,
  href,
}: MenuItemProps) => {
  const IconComponent = icon

  const contents = (
    <div
      className={classNames(styles.item, {
        [styles.danger]: danger,
      })}
    >
      <span className={classNames(styles.label, satoshi.className)}>
        {label}
      </span>
      {IconComponent && <IconComponent size={16} />}
    </div>
  )

  if (onClick) {
    return (
      <a href="javascript:void(0)" onClick={onClick}>
        {contents}
      </a>
    )
  } else if (href) {
    return <Link href={href}>{contents}</Link>
  } else {
    return contents
  }
}

interface MenuProps {
  children?: React.ReactNode
  visible?: boolean
  className?: string
}

export const MenuContainer = forwardRef<HTMLDivElement, MenuProps>(
  ({ children, visible, className }: MenuProps, ref) => (
    <div
      className={classNames(styles.base, className, {
        [styles.visible]: visible,
      })}
      ref={ref}
    >
      <div className={styles.background} />
      <div className={styles.content}>{children}</div>
    </div>
  ),
)
