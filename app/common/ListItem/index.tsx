import classNames from 'classnames'

import Box from 'app/common/Box'
import Stats from 'app/common/Stats'
import Text from 'app/common/Text'
import { ListItemComponentProps } from 'types/ListItem'

import styles from './ListItem.module.scss'

const ListItem = ({ title, description, stats }: ListItemComponentProps) => {
  return (
    <Box className={styles.listItem}>
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

export default ListItem
