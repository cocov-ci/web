'use client'

import React, { useState } from 'react'

import Button from 'app/common/Button'
import Loading from 'app/common/Loading'
import ProgressBar from 'app/common/ProgressBar'
import SizeFormatter from 'app/common/SizeFormatter'

import UsagePopover from '../UsagePopover'

import styles from './SizeInfoBar.module.scss'

type SizeInfoProps = {
  loading: boolean
  enabled?: boolean
  limit?: number
  used?: number
}

const SizeInfoBar = ({ loading, enabled, limit, used }: SizeInfoProps) => {
  const [showPopover, setShowPopover] = useState(true)

  const limitLabel = () => {
    if (limit === undefined) {
      return null
    }

    if (limit === 0) {
      return <span>&infin; MB?</span>
    }

    return <SizeFormatter size={limit} />
  }

  const usageProgress = () => {
    if (limit === undefined || used === undefined) return null
    const value = limit === 0 ? 0 : (used / limit) * 100

    return (
      <div className={styles.progressBar}>
        <ProgressBar value={value} width="100px" />
        {showPopover && <UsagePopover className={styles.popover} />}
      </div>
    )
  }

  const usageIndicatorOrLoader = () => {
    if (loading) {
      return <Loading type="skeleton" />
    }

    return (
      <div className={styles.usageIndicator}>
        {used !== undefined && <SizeFormatter size={used} />}
        {usageProgress()}
        {limitLabel()}
      </div>
    )
  }

  return (
    <div className={styles.base}>
      <div
        className={styles.usageIndicator}
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
      >
        {usageIndicatorOrLoader()}
      </div>
      {!loading && used !== undefined && (
        <Button disabled={used === 0 || !enabled} style="danger">
          Purge Cache
        </Button>
      )}
    </div>
  )
}

export default SizeInfoBar
