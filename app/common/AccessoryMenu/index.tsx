import classNames from 'classnames'
import { LucideIcon, MoreVertical } from 'lucide-react'
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
  muted?: boolean
}

const AccessoryMenu = ({
  className,
  icon,
  open,
  children,
  muted,
}: AccessoryMenuProps) => {
  const Icon = icon || MoreVertical
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(open)
  useOnClickOutside(menuContainerRef, () => setVisible(false))

  return (
    <div className={classNames(styles.base, className)}>
      <AccessoryButton
        className={styles.button}
        kind={muted ? 'squared-muted' : 'squared'}
        onClick={() => setVisible(!visible)}
      >
        <Icon size={20} />
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
