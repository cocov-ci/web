import { AlertTriangle } from 'lucide-react'
import React from 'react'

import Text from 'app/common/Text'

import styles from './Alert.module.scss'

interface AlertProps {
  children: React.ReactNode
}

const Alert = ({ children }: AlertProps) => {
  return (
    <div className={styles.alert}>
      <AlertTriangle className={styles.icon} size="64" />
      <Text variant="description">{children}</Text>
    </div>
  )
}

export default Alert
