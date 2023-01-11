import classNames from 'classnames'
import React from 'react'

import styles from './Avatar.module.scss'

type AvatarProps = {
  className?: string
  avatarURL: string
  size: string
}

const Avatar = ({ avatarURL, className, size }: AvatarProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden={true}
      className={classNames(styles.base, className)}
      src={avatarURL}
      style={{
        height: size,
        width: size,
      }}
    />
  )
}

export default Avatar
