import classNames from 'classnames'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import ProgressBar from '../ProgressBar'

import styles from './FileList.module.scss'

type FileListItem = {
  id: number
  file: string
  percentCovered: number
}
type FileListProps = {
  className?: string
  files: Array<FileListItem>
}

const FileList = ({ className, files }: FileListProps) => {
  const searchParams = useSearchParams()
  const repositoryName = searchParams.get('repositoryName')
  const commitSha = searchParams.get('commitSha')

  return (
    <div className={classNames(styles.base, className)}>
      <div className={styles.header}>
        <div className={styles.file}>File</div>
        <div className={styles.coverage}>Coverage</div>
      </div>
      <div className={styles.fileList}>
        {files &&
          files.map(f => (
            <Link
              className={styles.fileItem}
              href={`/repos/${repositoryName}/commits/${commitSha}/coverage/${f.id}`}
              key={f.id}
            >
              <div className={styles.file}>{f.file}</div>
              <div className={styles.percentage}>
                <div className={styles.percentageValue}>
                  {f.percentCovered}%
                </div>
                <div className={styles.percentageProgressBar}>
                  <ProgressBar value={f.percentCovered} width="100%" />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default FileList
