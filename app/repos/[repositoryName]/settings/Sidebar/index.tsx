'use client'

import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import Loading from 'app/common/Loading'
import Sidebar from 'app/common/Sidebar'

import styles from './Sidebar.module.scss'

interface SidebarProps {
  loading: boolean
  defaultSelectedItem: string | null
  repositoryName: string
  secretsCount: number
}

const SidebarComponent = ({
  loading,
  defaultSelectedItem,
  repositoryName,
  secretsCount,
}: SidebarProps) => {
  const router = useRouter()

  const data = useMemo(
    () => [
      {
        id: 0,
        name: 'General',
        href: '/',
      },
      {
        id: 1,
        name: 'Secrets',
        counter: secretsCount,
        href: '/secrets',
      },
      {
        id: 2,
        name: 'Cache',
        href: '/cache',
      },
    ],
    [secretsCount],
  )

  if (loading)
    return (
      <Loading
        className={styles.loading}
        count={3}
        height="30px"
        type="skeleton"
        width="230px"
      />
    )

  const onClick = (id: number) => {
    router.push(`/repos/${repositoryName}/settings${data[id].href}`)
  }

  if (!data) return null

  return (
    <Sidebar
      className={styles.sidebar}
      defaultSelectedId={
        data?.filter(item => item.name === defaultSelectedItem)[0]?.id || 0
      }
      items={data}
      onSelectItem={item => onClick(parseInt(item.id as string))}
      width="250px"
    />
  )
}

export default SidebarComponent
