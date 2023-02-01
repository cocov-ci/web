import Box from 'app/common/Box'

import styles from './Box.module.scss'

const BoxComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.main}>
      <Box className={styles.box}>{children}</Box>
    </div>
  )
}

export default BoxComponent
