'use client'

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
    <a
      className={classNames(styles.item, {
        [styles.selected]: selected,
      })}
      href="javascript:void(0)"
      onClick={() => onClick && onClick(item)}
    >
      <span className={styles.label}>{item.name}</span>
      {item.counter !== undefined && (
        <span className={styles.counter}>{item.counter}</span>
      )}
    </a>
  )
}
