import classNames from 'classnames'

import Box from 'app/common/Box'
import Text from 'app/common/Text'

import styles from './Repository.module.scss'

interface RepositoriesProps {
  title: string
  description?: string
}

const Repository = ({ title, description }: RepositoriesProps) => {
  return (
    <Box className={styles.repository}>
      <span
        className={classNames(styles.backgroundText, {
          [styles.small]: title.length > 4,
        })}
      >
        {title}
      </span>
      <div className={styles.info}>
        <Text className={styles.title} variant="title">
          {title}
        </Text>
        <Text
          className={classNames(styles.description, {
            [styles.disabled]: !description,
          })}
          variant="description"
        >
          {description || 'No description'}
        </Text>
      </div>
    </Box>
  )
}

export default Repository
