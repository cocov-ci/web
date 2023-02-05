'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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
  const [boxHeight, setBoxHeight] = useState<number>()
  const category = searchParams.get('category') as string
  const source = searchParams.get('category') as string

  window.addEventListener('resize', () => setBoxHeight(getPageHeight()))

  const getPageHeight = () => {
    const elements = [
      document.querySelector('header') as Element,
      document.querySelector('#topBar') as Element,
    ]

    const elementsSize: number = elements
      .map(
        item =>
          item.clientHeight + parseInt(getComputedStyle(item)?.marginBottom),
      )
      .reduce((prev, next) => prev + next)

    const contentSize = window.innerHeight - elementsSize

    return contentSize < 515 ? 515 : contentSize
  }

  useEffect(() => {
    setBoxHeight(getPageHeight())

    return () => {
      window.removeEventListener('resize', () => setBoxHeight(getPageHeight()))
    }
  }, [])

  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues`,
    handler: [category, source],
  }) as CommitdFetchResponse

  // console.log(data)

  if (!data && !loading) router.push(`/repositories/${repositoryName}`)

  return (
    <div className={styles.main} style={{ maxHeight: `${boxHeight}px` }}>
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
          <div className={styles.sidebar}>
            <SourcesList
              commitSha={commitSha}
              repositoryName={repositoryName}
            />
            <CategoriesList
              commitSha={commitSha}
              repositoryName={repositoryName}
            />
          </div>
          <List issues={data?.issues} />
        </div>
      </Box>
    </div>
  )
}

export default CommitsIssues
