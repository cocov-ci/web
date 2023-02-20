'use client'

import { useEffect } from 'react'

import Box from 'app/common/Box'
import Text from 'app/common/Text'

import styles from './Error.module.scss'

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // TODO: ERROR REPORTING SERVICE HERE
    console.error(error)
  }, [error])

  return (
    <div className={styles.error}>
      <Box className={styles.box}>
        <Text variant="title">Uh-oh. This is an error.</Text>
        <Text gutterBottom variant="description">
          An internal error prevented this operation from completing. Please
          check the instance's logs for further information.
        </Text>
      </Box>
    </div>
  )
}
