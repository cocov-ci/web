import { BoxSelect } from 'lucide-react'
import Image from 'next/image'

import styles from './Empty.module.scss'

const Empty = () => {
  return (
    <div className={styles.empty}>
      <div className={styles.box}>
        <BoxSelect className={styles.icon} size={40} />
        <div className={styles.content}>
          <h2>Hmm. It's empty here…</h2>
          <h3>How about adding a new repository to get started?</h3>
        </div>
      </div>
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
