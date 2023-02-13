'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

import { CoverageFileProps } from 'types/Coverage'

import ProgressBar from '../ProgressBar'

import styles from './FileList.module.scss'
import Loading from './Loading'

type FileListProps = {
  className?: string
  loading?: boolean
  resetScrollAfterPageLoad?: boolean
  commitSha: string
  repositoryName: string
  files: CoverageFileProps[]
}

const FileList = ({
  className,
  files,
  commitSha,
  loading,
  repositoryName,
  resetScrollAfterPageLoad,
}: FileListProps) => {
  const listRef = useRef<HTMLDivElement>(null)

  const onClick = () => {
    const list = listRef.current

    if (list) {
      localStorage.setItem(
        `coverage-list-${commitSha}`,
        list.scrollTop?.toString(),
      )
    }
  }

  useEffect(() => {
    const top = localStorage.getItem(`coverage-list-${commitSha}`)
    const list = listRef.current

    if (list && top !== null) {
      list.scrollTop = parseInt(top, 10)
    }

    if (resetScrollAfterPageLoad) {
      localStorage.removeItem(`coverage-list-${commitSha}`)
    }
  }, [])

  if (loading) return <Loading className={className} />

  return (
    <div className={classNames(styles.base, className)}>
      <div className={styles.header}>
        <div className={styles.file}>File</div>
        <div className={styles.coverage}>Coverage</div>
      </div>
      <div className={styles.fileList} ref={listRef}>
        {files?.map(f => (
          <Link
            className={styles.fileItem}
            href={`/repos/${repositoryName}/commits/${commitSha}/coverage/${f.id}`}
            key={f.id}
            onClick={() => onClick()}
          >
            <div className={styles.file}>{f.file}</div>
            <div className={styles.percentage}>
              <div className={styles.percentageValue}>{f.percent_covered}%</div>
              <div className={styles.percentageProgressBar}>
                <ProgressBar value={f.percent_covered} width="100%" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FileList
