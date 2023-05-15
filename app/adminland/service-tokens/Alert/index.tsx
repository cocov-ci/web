import { AlertTriangle, Info } from "lucide-react";
import Link from 'next/link'

import Text from 'app/common/Text'

import styles from './Alert.module.scss'

const Alert = () => {
  return (
    <div className={styles.alert}>
      <Text variant="description">
        <strong>Caution:</strong> Unlike User Tokens, Service Tokens have irrestrict access to all repository and data stored on this instance. Handle those tokens as passwords.
      </Text>
      <AlertTriangle className={styles.icon} size="64" />
    </div>
  )
}

export default Alert
