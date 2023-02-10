'use client'

import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import Box from 'app/common/Box'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { FileIdReponseProps } from 'types/Coverage'

import Content from './Content'
import styles from './File.module.scss'
import Header from './Header'

interface FileIdParams {
  repositoryName: string
  commitSha: string
  data: FileIdReponseProps
}

const File = ({ repositoryName, commitSha, data }: FileIdParams) => {
  const router = useRouter()
  const fileRef = useRef<HTMLDivElement>(null)
  const [close, setClose] = useState(true)

  const onClose = () => {
    setClose(true)
    setTimeout(
      () =>
        router.push(`/repos/${repositoryName}/commits/${commitSha}/coverage`),
      500,
    )
  }

  useEffect(() => {
    setTimeout(() => setClose(false), 200)
  }, [data])

  useOnClickOutside(fileRef, onClose)

  return (
    <div
      className={classNames(styles.file, {
        [styles.open]: !close,
      })}
      ref={fileRef}
    >
      <Box className={styles.box}>
        <Header data={data} onClose={onClose} />
        <Content data={data} />
      </Box>
    </div>
  )
}

export default File
