import React from 'react'

import Box from '../Box'

import styles from './FixedContent.module.scss'

const FixedContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.main}>
      <Box className={styles.box}>{children}</Box>
    </div>
  )
}

export default FixedContent
