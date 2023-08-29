'use client'

import { useState } from 'react'

import { useErrorBanner } from 'hooks/useBanner'
import API from 'utils/api'

import Button from '../../common/Button'

const ResyncAllPermissionsButton = () => {
  const [loading, setLoading] = useState(false)
  const { showBanner } = useErrorBanner()

  const onButtonClick = async () => {
    setLoading(true)

    try {
      await API.shared.adminResyncAllPermissions()
    } catch (err) {
      showBanner({
        children: `Failed resyncing permissions. Please try again.`,
        autoClose: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button disabled={loading} onClick={onButtonClick} style="danger">
      Resync All Permissions
    </Button>
  )
}

export default ResyncAllPermissionsButton
