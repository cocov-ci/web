'use client'

import { useEffect } from 'react'

import Box from 'app/common/Box'

import styles from './Error.module.scss'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className={styles.error}>
      <Box
        className={styles.box}
        description="An internal error prevented this operation from completing. Please check
    the instance's logs for further information."
        title="Uh-oh. This is an error."
      />
    </div>
  )
}
