import classNames from 'classnames'

import Box from 'app/common/Box'

import styles from './Box.module.scss'

const BoxComponent = ({
  children,
  hasContent,
}: {
  children: React.ReactNode
  hasContent: boolean
}) => {
  return (
    <div className={styles.main}>
      <Box
        className={classNames(styles.box, {
          [styles.extraPadding]: hasContent,
        })}
      >
        {children}
      </Box>
    </div>
  )
}

export default BoxComponent
