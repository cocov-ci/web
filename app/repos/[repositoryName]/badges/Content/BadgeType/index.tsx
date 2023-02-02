'use client'

import parse from 'html-react-parser'

import SnippetBox from 'app/common/SnippetBox'
import Text from 'app/common/Text'

import styles from './BadgeType.module.scss'

interface BadgeTypeProps {
  title: string
  source: string
  badge: string
}

const BadgeType = ({ title, source, badge }: BadgeTypeProps) => {
  return (
    <div className={styles.base}>
      <Text className={styles.title} variant="title">
        {title}
      </Text>
      <div className={styles.content}>
        <Text className={styles.description} variant="description">
          Preview
          <br />
          {parse(badge)}
        </Text>
        <SnippetBox className={styles.snippetBox} multiline source={source} />
      </div>
    </div>
  )
}

export default BadgeType
