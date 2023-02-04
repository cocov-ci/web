'use client'

import Loading from 'app/common/Loading'
import Sidebar from 'app/common/Sidebar'
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
}

const SidebarComponent = ({ allItemsText, data, loading }: SidebarProps) => {
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
      items={[allItems, ...items]}
      selectedId={0}
      width="250px"
    />
  )
}

export default SidebarComponent
