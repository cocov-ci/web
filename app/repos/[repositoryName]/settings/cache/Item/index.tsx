'use client'

import { Package, Trash } from 'lucide-react'
import { useState } from 'react'

import AccessoryButton from 'app/common/AccessoryButton'
import Loading from 'app/common/Loading'
import RelativeTime from 'app/common/RelativeTime'
import SizeFormatter from 'app/common/SizeFormatter'
import { useErrorBanner } from 'hooks/useBanner'
import { RepositoryCacheArtifact } from 'types/Cache'
import API from 'utils/api'

import styles from './Item.module.scss'

interface ItemParams extends RepositoryCacheArtifact {
  repositoryName: string
  refetch: () => void
}

const Item = ({
  id,
  name,
  size,
  created_at,
  last_used_at,
  repositoryName,
  refetch,
}: ItemParams) => {
  const { showBanner } = useErrorBanner()
  const created = new Date(Date.parse(created_at))
  const used = new Date(Date.parse(last_used_at))
  const [loading, setLoading] = useState(false)

  const onDeleteCache = async () => {
    setLoading(true)

    try {
      await API.shared.repositoryCacheDelete({
        artifactID: id,
        repositoryName,
      })

      refetch()
    } catch (err) {
      showBanner({
        children: `Failed deleting the artifact Id ${id}. Please try again.`,
        autoClose: false,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.base}>
      <div className={styles.iconContainer}>
        <Package />
      </div>
      <div className={styles.metadata}>
        <div className={styles.filename}>{name}</div>
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
          disabled={loading}
          kind="squared"
          onClick={() => !loading && onDeleteCache()}
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
