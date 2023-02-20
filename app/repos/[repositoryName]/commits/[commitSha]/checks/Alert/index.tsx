import { Info } from 'lucide-react'
import Link from 'next/link'

import Text from 'app/common/Text'

import styles from './Alert.module.scss'

const Alert = () => {
  return (
    <div className={styles.alert}>
      <Text gutterBottom variant="description">
        <strong>Notice:</strong> Those checks have already finished. See its
        results on the{' '}
        <Link className={styles.link} href="#">
          commit results page
        </Link>
        .
      </Text>
      <Info className={styles.icon} size="64" />
    </div>
  )
}

export default Alert
