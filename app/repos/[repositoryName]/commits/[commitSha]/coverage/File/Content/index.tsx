'use client'

import CodeBlock from 'app/common/CodeBlock'
import { FileIdReponseProps } from 'types/Coverage'

import styles from './Content.module.scss'
import Loading from './Loading'

interface ContentParams {
  data: FileIdReponseProps
}

const Content = ({ data }: ContentParams) => {
  if (!data) return <Loading />

  return (
    <div className={styles.content}>
      <CodeBlock
        coverage={{
          blocks: data.coverage?.blocks,
          source: data.file?.source,
        }}
      />
    </div>
  )
}

export default Content
