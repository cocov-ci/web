'use client'

import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import Loading from 'app/common/Loading'
import Sidebar from 'app/common/Sidebar'

import styles from './Sidebar.module.scss'

interface SidebarProps {
  loading: boolean
  currentSelectedPath: string | null
  counters?: {
    tokens: number
    secrets: number
    repositories: number
    users: number
  }
}

const SidebarComponent = ({
  loading,
  currentSelectedPath,
  counters,
}: SidebarProps) => {
  const router = useRouter()

  const data = useMemo(
    () => [
      {
        id: 0,
        name: 'General',
        href: '',
      },
      {
        id: 1,
        name: 'Service Tokens',
        counter: counters?.tokens,
        href: '/service-tokens',
      },
      {
        id: 2,
        name: 'Secrets',
        counter: counters?.secrets,
        href: '/secrets',
      },
      {
        id: 3,
        name: 'Repositories',
        counter: counters?.repositories,
        href: '/repositories',
      },
      {
        id: 4,
        name: 'Users',
        counter: counters?.users,
        href: '/users',
      },
    ],
    [counters],
  )

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

  const onClick = (id: number) => {
    router.push(`/adminland/${data[id].href}`)
  }

  if (!data) return null

  return (
    <Sidebar
      className={styles.sidebar}
      defaultSelectedId={data.find(i => i.href == currentSelectedPath)?.id}
      items={data}
      onSelectItem={item => onClick(parseInt(item.id as string))}
      width="250px"
    />
  )
}

export default SidebarComponent
