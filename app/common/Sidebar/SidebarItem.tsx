import classNames from 'classnames'
import React from 'react'

import styles from './Sidebar.module.scss'

import { Item } from './index'

interface SidebarItemProps {
  item: Item
  selected: boolean
  onClick?: (item: Item) => void
}

export const SidebarItem = ({ item, selected, onClick }: SidebarItemProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={classNames(styles.item, {
        [styles.selected]: selected,
      })}
      onClick={() => onClick && onClick(item)}
    >
      <span className={styles.label}>{item.name}</span>
      {item.counter !== undefined && (
        <span className={styles.counter}>{item.counter}</span>
      )}
    </div>
  )
}
