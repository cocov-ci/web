'use client'

import classNames from 'classnames'
import React, { useState } from 'react'

import styles from './Sidebar.module.scss'
import { SidebarItem } from './SidebarItem'

export interface Item {
  id: string | number
  name: string
  counter?: number
}

type SelectedId = string | number | undefined

interface SidebarProps {
  items: Array<Item>
  defaultSelectedId: SelectedId
  onSelectItem?: (item: Item) => void
  className?: string
  width?: string
}

const Sidebar = ({
  items,
  defaultSelectedId,
  onSelectItem,
  className,
  width,
}: SidebarProps) => {
  const [selectedId, setSelectedId] = useState<SelectedId>(defaultSelectedId)

  return (
    <div
      className={classNames(styles.base, className)}
      style={{ width: width }}
    >
      {items.map(item => (
        <SidebarItem
          item={item}
          key={item.id}
          onClick={() => {
            if (onSelectItem) {
              onSelectItem(item)
              setSelectedId(item.id)
            }
          }}
          selected={selectedId === item.id}
        />
      ))}
    </div>
  )
}

export default Sidebar
