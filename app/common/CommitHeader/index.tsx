import classNames from 'classnames'
import React from 'react'

import Avatar from 'app/common/Avatar'
import RelativeTime from 'app/common/RelativeTime'
import { inconsolata } from 'utils/fonts'

import styles from './CommitHeader.module.scss'

type CommitHeaderProps = {
  className?: string
  username: string
  avatarURL: string
  headSHA: string
  headURL: string
  timestamp: Date
  commitMessage: string
}

const CommitHeader = ({
  className,
  username,
  avatarURL,
  headSHA,
  headURL,
  timestamp,
  commitMessage,
}: CommitHeaderProps) => {
  return (
    <div className={classNames(styles.base, className)}>
      <div className={styles.avatarWrapper}>
        <Avatar avatarURL={avatarURL} size="25px" />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.commitMeta}>
          <a
            className={styles.username}
            href={`https://github.com/${username}`}
            rel="noreferrer"
            target="_blank"
          >
            {username}
          </a>
          <span>committed</span>
          <a
            className={classNames(styles.headLink, inconsolata.className)}
            href={headURL}
            rel="noreferrer"
            target="_blank"
          >
            {headSHA.substring(0, 6)}
          </a>
          <RelativeTime timestamp={timestamp} />
        </div>
        <div className={styles.commitTitle}>
          <a href={headURL} rel="noreferrer" target="_blank">
            {commitMessage}
          </a>
        </div>
      </div>
    </div>
  )
}

export default CommitHeader
