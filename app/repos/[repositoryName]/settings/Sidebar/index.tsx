'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import Loading from 'app/common/Loading'
import Sidebar from 'app/common/Sidebar'
import useAPI from 'hooks/useAPI'
import { useErrorBanner } from 'hooks/useBanner'
import API from 'utils/api'

import styles from './Sidebar.module.scss'

interface SidebarProps {
  defaultSelectedItem: string | null
  repositoryName: string
}

const SidebarComponent = ({
  defaultSelectedItem,
  repositoryName,
}: SidebarProps) => {
  const router = useRouter()
  const { showBanner } = useErrorBanner()

  const {
    result: repositoryMeta,
    loading: repositoryMetaLoading,
    error: repositoryMetaError,
  } = useAPI(API.shared.repositorySettings, { repositoryName })

  useEffect(() => {
    if (repositoryMetaError) {
      showBanner({
        children: `Failed requesting repository metadata. Please try again.`,
        autoClose: false,
      })
    }
  }, [repositoryMetaError])

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
        counter: repositoryMeta?.secrets_count ?? 0,
        href: '/secrets',
      },
      {
        id: 2,
        name: 'Cache',
        href: '/cache',
      },
    ],
    [repositoryMeta?.secrets_count],
  )

  if (repositoryMetaLoading)
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
