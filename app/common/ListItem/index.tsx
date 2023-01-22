import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import Box from 'app/common/Box'
import Stats from 'app/common/Stats'
import Text from 'app/common/Text'
import { ListItemComponentProps } from 'types/ListItem'

import styles from './ListItem.module.scss'

const ListBox = ({
  title,
  description,
  stats,
}: Omit<ListItemComponentProps, 'href'>): JSX.Element => {
  return (
    <div className={styles.listBox}>
      <Box
        backgroundTextLarge={title.length <= 4 ? title : undefined}
        backgroundTextSmall={title.length > 4 ? title : undefined}
        className={styles.listItem}
        gutterBottom
      >
        <div className={styles.info}>
          <Text className={styles.title} title={title} variant="title">
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
          <Stats data={stats?.issues} type="issues" />
          <Stats data={stats?.coverage} type="coverage" />
        </div>
      </Box>
    </div>
  )
}

const ListItem = (props: ListItemComponentProps) => {
  const { href } = props

  if (href) {
    return (
      <Link href={href}>
        <ListBox {...props} />
      </Link>
    )
  }

  return <ListBox {...props} />
}

export default ListItem
