import classNames from 'classnames'

import Box from 'app/common/Box'
import Stats from 'app/common/Stats'
import Text from 'app/common/Text'
import { RepositoriesProps } from 'types/Repositories'

import styles from './Repository.module.scss'

const Repository = ({ title, description, stats }: RepositoriesProps) => {
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
      <div className={styles.stats}>
        <Stats data={stats.issues} type="issues" />
        <Stats data={stats.coverage} type="coverage" />
      </div>
    </Box>
  )
}

export default Repository
