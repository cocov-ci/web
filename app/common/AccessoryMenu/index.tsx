import classNames from 'classnames'
import { LucideIcon, LucideMoreVertical } from 'lucide-react'
import React, { useRef, useState } from 'react'

import useOnClickOutside from 'hooks/useOnClickOutside'

import AccessoryButton from '../AccessoryButton'
import { MenuContainer } from '../Menu'

import styles from './AccessoryMenu.module.scss'

interface AccessoryMenuProps {
  className?: string
  icon?: LucideIcon
  children: React.ReactNode
  open?: boolean
}

const AccessoryMenu = ({
  className,
  icon,
  open,
  children,
}: AccessoryMenuProps) => {
  const Icon = icon || LucideMoreVertical
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(open)
  useOnClickOutside(menuContainerRef, () => setVisible(false))

  return (
    <div className={classNames(styles.base, className)}>
      <AccessoryButton
        className={styles.button}
        kind="squared"
        onClick={() => setVisible(!visible)}
      >
        <Icon size={13} />
      </AccessoryButton>
      <MenuContainer
        className={styles.container}
        ref={menuContainerRef}
        visible={visible}
      >
        {children}
      </MenuContainer>
    </div>
  )
}

export default AccessoryMenu
