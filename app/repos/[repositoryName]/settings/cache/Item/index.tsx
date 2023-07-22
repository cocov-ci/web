'use client'

import { Package, Trash } from 'lucide-react'

import AccessoryButton from 'app/common/AccessoryButton'
import Loading from 'app/common/Loading'
import RelativeTime from 'app/common/RelativeTime'
import SizeFormatter from 'app/common/SizeFormatter'

import styles from './Item.module.scss'

interface ItemParams {
  id: number
  filename: string
  size: number
  createdAt: string
  lastAccessAt: string
  onDelete?: (id: number) => void
}

const Item = ({
  id,
  filename,
  size,
  createdAt,
  lastAccessAt,
  onDelete,
}: ItemParams) => {
  const created = new Date(Date.parse(createdAt))
  const used = new Date(Date.parse(lastAccessAt))

  return (
    <div className={styles.base}>
      <div className={styles.iconContainer}>
        <Package />
      </div>
      <div className={styles.metadata}>
        <div className={styles.filename}>{filename}</div>
        <div>
          Created <RelativeTime timestamp={created} />
        </div>
        <div>
          Last Accessed <RelativeTime timestamp={used} />
        </div>
        <div>
          <SizeFormatter size={size} />
        </div>
      </div>
      <div className={styles.accessory}>
        <AccessoryButton
          kind="squared"
          onClick={() => onDelete && onDelete(id)}
        >
          <Trash width="18px" />
        </AccessoryButton>
      </div>
    </div>
  )
}

export default Item

export const ItemLoading = () => {
  return (
    <div className={styles.base}>
      <div className={styles.iconContainer}>
        <Loading alignment="left" height="25px" type="skeleton" width="25px" />
      </div>
      <div className={styles.metadata}>
        <div className={styles.filename}>
          <Loading alignment="left" type="skeleton" width="100px" />
        </div>
        <div>
          <Loading alignment="left" type="skeleton" width="200px" />
        </div>
        <div>
          <Loading alignment="left" type="skeleton" width="300px" />
        </div>
        <div>
          <Loading alignment="left" type="skeleton" width="400px" />
        </div>
      </div>
      <div className={styles.accessory}>
        <Loading alignment="left" height="32px" type="skeleton" width="32px" />
      </div>
    </div>
  )
}
