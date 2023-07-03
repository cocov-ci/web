'use client'

import { useState } from 'react'

import { useErrorBanner } from 'hooks/useBanner'
import API from 'utils/api'

import Button from '../../common/Button'

const AdminlandBase = () => {
  const [loading, setLoading] = useState(false)
  const { showBanner } = useErrorBanner()

  const onButtonClick = async () => {
    setLoading(true)

    try {
      const { url_redirection } = await API.shared.adminSidekiqPanelToken()

      window.open(url_redirection)
    } catch (err) {
      showBanner({
        children: `Failed requesting the dashboard access. Please try again.`,
        autoClose: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button disabled={loading} onClick={onButtonClick} style="secondary">
      Access Dashboard
    </Button>
  )
}

export default AdminlandBase
