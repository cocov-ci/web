import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import Box from 'app/common/Box'
import Stats from 'app/common/Stats'
import Text from 'app/common/Text'
import { ListItemComponentProps } from 'types/ListItem'

import styles from './ListItem.module.scss'

const ListItem = ({
  title,
  description,
  stats,
  href,
}: ListItemComponentProps) => {
  const wrapLink = (children: React.ReactNode) => {
    if (href) {
      return <Link href={href}>{children}</Link>
    }

    return children
  }

  return wrapLink(
    <Box className={styles.listItem}>
      <span
        className={classNames(styles.backgroundText, {
          [styles.small]: title.length > 4,
        })}
      >
        {title}
      </span>
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
    </Box>,
  )
}

export default ListItem
