'use client'

import Loading from 'app/common/Loading'
import Sidebar, { Item } from 'app/common/Sidebar'
import { CommitsSourcesResponseProps } from 'types/Commits'

import styles from './Sidebar.module.scss'

interface SidebarItemsProps {
  id: number
  name: string
  counter: number
}

interface SidebarProps {
  allItemsText: string
  data: CommitsSourcesResponseProps
  loading: boolean
  defaultSelectedItem: string | null
  onSelectItem: (arg: Item) => void
}

const SidebarComponent = ({
  allItemsText,
  data,
  loading,
  onSelectItem,
  defaultSelectedItem,
}: SidebarProps) => {
  if (loading)
    return (
      <Loading
        className={styles.loading}
        count={5}
        height="30px"
        type="skeleton"
        width="230px"
      />
    )

  if (!data) return null

  const allItems = {
    id: 0,
    name: allItemsText,
    counter: Object.values(data).reduce((prev, next) => prev + next),
  }

  const items: SidebarItemsProps[] = Object.keys(data)
    .sort((a, b) => a.localeCompare(b))
    .map((item: string, index: number) => ({
      id: index + 1,
      name: item,
      counter: data[item],
    }))

  return (
    <Sidebar
      className={styles.sidebar}
      defaultSelectedId={
        items?.filter(item => item.name === defaultSelectedItem)[0]?.id || 0
      }
      items={[allItems, ...items]}
      onSelectItem={item => onSelectItem(item)}
      width="250px"
    />
  )
}

export default SidebarComponent
