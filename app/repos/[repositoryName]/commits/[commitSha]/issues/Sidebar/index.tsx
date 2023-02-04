'use client'

import Sidebar from 'app/common/Sidebar'
import { CommitsSourcesResponseProps } from 'types/Commits'

import styles from './Sidebar.module.scss'

interface SidebarItems {
  id: number
  name: string
  counter: number
}

const SidebarComponent = ({
  allItemsText,
  data,
}: {
  allItemsText: string
  data: CommitsSourcesResponseProps
}) => {
  if (!data) return null

  const allItems = {
    id: 0,
    name: allItemsText,
    counter: Object.values(data).reduce((prev, next) => prev + next),
  }

  const items: SidebarItems[] = Object.keys(data)
    .sort((a, b) => a.localeCompare(b))
    .map((item: string, index: number) => ({
      id: index + 1,
      name: item,
      counter: data[item],
    }))

  return (
    <Sidebar
      className={styles.sidebar}
      items={[allItems, ...items]}
      selectedId={0}
      width="250px"
    />
  )
}

export default SidebarComponent
