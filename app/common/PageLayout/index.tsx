import React from 'react'

import styles from './PageLayout.module.scss'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.page}>
      <main>{children}</main>
    </div>
  )
}

export default PageLayout
