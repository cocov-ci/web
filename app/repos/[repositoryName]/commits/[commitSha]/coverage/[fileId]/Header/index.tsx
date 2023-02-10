'use client'

import { X } from 'lucide-react'

import Kbd from 'app/common/Kbd'
import ProgressBar from 'app/common/ProgressBar'
import Text from 'app/common/Text'
import { FileIdReponseProps } from 'types/Coverage'

import styles from './Header.module.scss'

const Header = ({
  data,
  onClose,
}: {
  data: FileIdReponseProps
  onClose: () => void
}) => {
  if (!data) return null

  return (
    <div className={styles.header}>
      <div className={styles.data}>
        <div className={styles.file}>
          <Text variant="description">{data.file?.base_path}</Text>
          <Text variant="title">{data.file.name}</Text>
        </div>
        <div className={styles.stats}>
          <div className={styles.progressBar}>
            <Text variant="description">
              {data.coverage?.percent_covered}% covered
            </Text>
            <ProgressBar value={data.coverage.percent_covered} width="200px" />
          </div>
          <Text variant="description">
            {data.coverage.lines_total} relevant lines.{' '}
            <span className={styles.covered}>
              {data.coverage.lines_covered} lines covered
            </span>{' '}
            and{' '}
            <span className={styles.missed}>
              {data.coverage.lines_total - data.coverage.lines_covered} lines
              missed
            </span>
          </Text>
        </div>
      </div>
      <div className={styles.close}>
        <X onClick={() => onClose && onClose()} size={30} />
        <Kbd size="mini" text="esc" />
      </div>
    </div>
  )
}

export default Header
