'use client'

import { Crown, LogOut, RefreshCw, Trash, UserX } from 'lucide-react'
import React from 'react'

import AccessoryMenu from 'app/common/AccessoryMenu'
import Avatar from 'app/common/Avatar'
import { MenuItem } from 'app/common/Menu'
import { AdminUser } from 'types/AdminUser'

import styles from './Item.module.scss'

type ItemProps = {
  item: AdminUser
  onRevoke?: (id: number) => void
  onPromote?: (id: number) => void
  onRequestSync?: (id: number) => void
  onForceLogout?: (id: number) => void
  onDelete?: (id: number) => void
}

const Item = ({
  item,
  onPromote,
  onRequestSync,
  onRevoke,
  onDelete,
  onForceLogout,
}: ItemProps) => {
  const repositories = (qty: number) =>
    `${qty} repositor${qty === 1 ? 'y' : 'ies'}`

  const details = (): string[] => {
    if (item.permissions) {
      return [
        `Admin in ${repositories(item.permissions.admin)}`,
        `Maintainer in ${repositories(item.permissions.maintainer)}`,
        `Have read access to other ${repositories(item.permissions.user)}`,
      ]
    }

    return ['Platform Administrator', 'Full Access']
  }

  return (
    <div className={styles.base}>
      <div className={styles.avatarWrapper}>
        <Avatar avatarURL={item.user.avatar_url} size="25px" />
      </div>
      <div className={styles.dataWrapper}>
        <div className={styles.loginContainer}>
          <div className={styles.login}>{item.user.login}</div>
          {item.user.admin && <div className={styles.badge}>Admin</div>}
        </div>
        <div className={styles.description}>
          {details().map((txt, idx) => {
            // eslint-disable-next-line react/no-array-index-key
            return <div key={`item-${item.user.id}-detail${idx}`}>{txt}</div>
          })}
        </div>
      </div>
      <div className={styles.menuWrapper}>
        <AccessoryMenu muted={true}>
          {item.user.admin ? (
            <MenuItem
              icon={UserX}
              label="Revoke Admin"
              onClick={() => onRevoke && onRevoke(item.user.id)}
            />
          ) : (
            <MenuItem
              icon={Crown}
              label="Make Admin"
              onClick={() => onPromote && onPromote(item.user.id)}
            />
          )}
          <MenuItem
            icon={RefreshCw}
            label="Sync Permissions"
            onClick={() => onRequestSync && onRequestSync(item.user.id)}
          />
          <MenuItem
            icon={LogOut}
            label="Force Logout"
            onClick={() => onForceLogout && onForceLogout(item.user.id)}
          />
          <MenuItem
            danger={true}
            icon={Trash}
            label="Delete"
            onClick={() => onDelete && onDelete(item.user.id)}
          />
        </AccessoryMenu>
      </div>
    </div>
  )
}

export default Item
