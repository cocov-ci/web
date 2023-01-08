import { BoxSelect } from 'lucide-react'
import Image from 'next/image'

import Alert from 'app/common/Alert'

import styles from './Empty.module.scss'

const Empty = () => {
  return (
    <div className={styles.empty}>
      <Alert
        description="How about adding a new repository to get started?"
        icon={BoxSelect}
        title="Hmm. It's empty here…"
      />

      <Image
        alt="arrow"
        className={styles.arrow}
        height="73"
        src="/icons/repositories/arrow.svg"
        width="187"
      />
    </div>
  )
}

export default Empty
