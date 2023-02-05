'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'

import Box from 'app/common/Box'
import useFetch from 'hooks/useFetch'
import { CommitsResponseProps } from 'types/Commits'

import CategoriesList from './CategoriesList'
import CommitHeader from './CommitHeader'
import List from './List'
import NavMenu from './NavMenu'
import styles from './Page.module.scss'
import SourcesList from './SourcesList'

interface CommitsIssues {
  params: { repositoryName: string; commitSha: string }
}

interface CommitdFetchResponse {
  data: CommitsResponseProps
  loading: boolean
}

const CommitsIssues = ({
  params: { repositoryName, commitSha },
}: CommitsIssues) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const category = searchParams.get('category') as string
  const source = searchParams.get('category') as string
  const sidebarHeight = sidebarRef.current?.clientHeight

  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues`,
    handler: [category, source],
  }) as CommitdFetchResponse

  // console.log(data)

  if (!data && !loading) router.push(`/repositories/${repositoryName}`)

  return (
    <div className={styles.main}>
      <Box className={styles.box}>
        <CommitHeader
          head={data?.commit}
          loading={loading}
          repositoryName={repositoryName}
        />
        <NavMenu
          active="issues"
          counter={data?.repository?.issues}
          loading={loading}
          onChange={() => null}
        />
        <div className={styles.content}>
          <div className={styles.sidebar} ref={sidebarRef}>
            <SourcesList
              commitSha={commitSha}
              repositoryName={repositoryName}
            />
            <CategoriesList
              commitSha={commitSha}
              repositoryName={repositoryName}
            />
          </div>
          <List height={sidebarHeight} issues={data?.issues} />
        </div>
      </Box>
    </div>
  )
}

export default CommitsIssues
