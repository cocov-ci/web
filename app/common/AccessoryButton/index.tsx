import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { HTMLAttributeAnchorTarget } from 'react'

import Url from 'types/Url'

import styles from './AccessoryButton.module.scss'

type AccessoryButtonProps = {
  children?: React.ReactNode
  className?: string
  kind: 'squared' | 'round' | 'squared-muted'
  onClick?: (ev: React.MouseEvent) => void
  title?: string
  href?: Url
  disabled?: boolean
  hrefTarget?: HTMLAttributeAnchorTarget
}

const AccessoryButton = ({
  children,
  className,
  kind,
  onClick,
  title,
  href,
  hrefTarget,
  disabled,
}: AccessoryButtonProps) => {
  const baseProps = {
    className: classNames(
      styles.base,
      className,
      ...kind.split('-').map(i => styles[i]),
      {
        [styles.disabled]: disabled,
      },
    ),
    title: title,
  }

  if (href) {
    return (
      <Link href={href} target={hrefTarget}>
        <div {...baseProps}>{children}</div>
      </Link>
    )
  }

  return (
    <button {...baseProps} onClick={ev => onClick && onClick(ev)}>
      {children}
    </button>
  )
}

export const CopyIcon = () => (
  <Image alt="" height={13} src="/icons/copy.svg" width={13} />
)

export const CheckIcon = () => (
  <Image alt="" height={11} src="/icons/check.svg" width={16} />
)

export const HelpIcon = () => (
  <Image alt="" height={10.5} src="/icons/help.svg" width={5.83} />
)

export default AccessoryButton
