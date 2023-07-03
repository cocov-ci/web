'use client'

import { useState } from 'react'

import API from 'utils/api'

import Button from '../../common/Button'

const AdminlandBase = () => {
  const [loading, setLoading] = useState(false)

  const onButtonClick = async () => {
    setLoading(true)

    try {
      await API.shared.adminSidekiqPanelToken()
    } catch (err) {
      // console.log(err)
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
