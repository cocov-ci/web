import classNames from 'classnames'
import React from 'react'

import styles from './Sidebar.module.scss'
import { SidebarItem } from './SidebarItem'

export interface Item {
  id: string | number
  name: string
  counter?: number
}

interface SidebarProps {
  items: Array<Item>
  selectedId: string | number | undefined
  onSelectItem?: (item: Item) => void
  className?: string
  width?: string
}

const Sidebar = ({
  items,
  selectedId,
  onSelectItem,
  className,
  width,
}: SidebarProps) => {
  return (
    <div
      className={classNames(styles.base, className)}
      style={{ width: width }}
    >
      {items.map(item => (
        <SidebarItem
          item={item}
          key={item.id}
          onClick={onSelectItem}
          selected={selectedId === item.id}
        />
      ))}
    </div>
  )
}

export default Sidebar
