import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

import styles from './AccessoryButton.module.scss'

type AccessoryButtonProps = {
  children?: React.ReactNode
  className?: string
  kind: 'squared' | 'round'
  onClick?: (ev: React.MouseEvent) => void
  title?: string
}

const AccessoryButton = ({
  children,
  className,
  kind,
  onClick,
  title,
}: AccessoryButtonProps) => {
  return (
    <button
      className={classNames(styles.base, className, styles[kind])}
      onClick={ev => onClick && onClick(ev)}
      title={title}
    >
      {children}
    </button>
  )
}

export const CopyIcon = () => (
  <Image alt="" height={13} src="public/icons/copy.svg" width={13} />
)

export const CheckIcon = () => (
  <Image alt="" height={11} src="public/icons/check.svg" width={16} />
)

export const HelpIcon = () => (
  <Image alt="" height={10.5} src="public/icons/help.svg" width={5.83} />
)

export default AccessoryButton
