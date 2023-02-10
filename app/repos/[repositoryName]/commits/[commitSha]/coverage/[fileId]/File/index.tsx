'use client'

import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import Box from 'app/common/Box'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { FileIdReponseProps } from 'types/Coverage'

import Content from '../Content'
import Header from '../Header'

import styles from './File.module.scss'

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
      100,
    )
  }

  const onEscKeyUpEvent = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()

      return
    }
  }

  useEffect(() => {
    setTimeout(() => setClose(false), 50)

    document.addEventListener('keyup', onEscKeyUpEvent)

    return () => {
      document.removeEventListener('keyup', onEscKeyUpEvent)
    }
  }, [])

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
