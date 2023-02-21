'use client'

import Loading from 'app/common/Loading'
import Sidebar from 'app/common/Sidebar'

import styles from './Sidebar.module.scss'

interface SidebarItemsProps {
  id: number
  name: string
  counter?: number
}

interface SidebarProps {
  data: SidebarItemsProps[]
  loading: boolean
  defaultSelectedItem: string | null
}

const SidebarComponent = ({
  data,
  loading,
  defaultSelectedItem,
}: SidebarProps) => {
  if (loading)
    return (
      <Loading
        className={styles.loading}
        count={2}
        height="30px"
        type="skeleton"
        width="230px"
      />
    )

  if (!data) return null

  return (
    <Sidebar
      className={styles.sidebar}
      defaultSelectedId={
        data?.filter(item => item.name === defaultSelectedItem)[0]?.id || 0
      }
      items={data}
      onSelectItem={item => null}
      width="250px"
    />
  )
}

export default SidebarComponent
