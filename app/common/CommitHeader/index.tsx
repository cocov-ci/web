import classNames from 'classnames'
import React from 'react'

import Avatar from 'app/common/Avatar'
import RelativeTime from 'app/common/RelativeTime'
import { CommitHeaderProps } from 'types/Commits'
import { inconsolata } from 'utils/fonts'

import styles from './CommitHeader.module.scss'
import Loading from './Loading'

const CommitHeader = ({
  className,
  username,
  avatarURL,
  headSHA,
  headURL,
  timestamp,
  commitMessage,
  isRegisteredUser,
  loading,
}: CommitHeaderProps) => {
  if (loading) return <Loading className={className} />

  return (
    <div className={classNames(styles.base, className)}>
      {avatarURL && (
        <div className={styles.avatarWrapper}>
          <Avatar avatarURL={avatarURL} size="25px" />
        </div>
      )}
      <div className={styles.infoWrapper}>
        <div className={styles.commitMeta}>
          {!isRegisteredUser ? (
            <span className={styles.username}>{username}</span>
          ) : (
            <a
              className={styles.username}
              href={`https://github.com/${username}`}
              rel="noreferrer"
              target="_blank"
            >
              {username}
            </a>
          )}
          <span>committed</span>

          <a
            className={classNames(styles.headLink, inconsolata.className)}
            href={headURL}
            rel="noreferrer"
            target="_blank"
          >
            {headSHA?.substring(0, 6)}
          </a>

          {timestamp && <RelativeTime timestamp={timestamp} />}
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
