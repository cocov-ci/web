'use client'

import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import Loading from 'app/common/Loading'
import Sidebar from 'app/common/Sidebar'
import API, { useAPI } from 'utils/api'

import styles from './Sidebar.module.scss'

interface SidebarProps {
  currentSelectedPath: string | null
}

const SidebarComponent = ({ currentSelectedPath }: SidebarProps) => {
  const { result, loading } = useAPI(API.shared.adminSidebarCounters, {})
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
        counter: result?.tokens,
        href: '/service-tokens',
      },
      {
        id: 2,
        name: 'Secrets',
        counter: result?.secrets,
        href: '/secrets',
      },
      {
        id: 3,
        name: 'Repositories',
        counter: result?.repositories,
        href: '/repositories',
      },
      {
        id: 4,
        name: 'Users',
        counter: result?.users,
        href: '/users',
      },
    ],
    [result],
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
