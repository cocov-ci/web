'use client'

import React, { useEffect } from 'react'

import Alert from 'app/adminland/Alert'
import Button from 'app/common/Button'
import Text from 'app/common/Text'
import { useErrorBanner } from 'hooks/useBanner'
import useModal from 'hooks/useModal'
import API, { useAPI } from 'utils/api'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import Item from './Item'
import AddNewToken from './Modals/AddNewToken'
import NewTokenSuccess from './Modals/NewTokenSuccess'
import styles from './ServiceTokens.module.scss'

const Page = () => {
  const {
    result: tokensList,
    error: tokensError,
    refresh: tokensRefresh,
  } = useAPI(API.shared.serviceTokens, {})

  const { showBanner } = useErrorBanner()
  const { openModal } = useModal()

  useEffect(() => {
    if (tokensError) {
      showBanner({
        children: `Failed requesting the service tokens list. Please try again.`,
        autoClose: false,
      })
    }
  }, [tokensError])

  const onNewTokenClick = () => {
    openModal(
      <AddNewToken
        onFailure={(token?: string) => {
          showBanner({
            children: `Failed creating token "${token}". Please try again.`,
            autoClose: true,
          })
        }}
        onSuccess={(token: string) => {
          newTokenSuccess(token)
          tokensRefresh()
        }}
      />,
    )
  }

  const newTokenSuccess = (token: string) => {
    openModal(<NewTokenSuccess token={token} />)
  }

  return (
    <Base currentPage="/service-tokens">
      <Text className={BaseStyles.title} variant="title">
        Service Tokens
      </Text>
      <Text className={BaseStyles.bottomMargin}>
        Service Tokens, unlike User Tokens, are used with integrations and other
        internal components in order to access the API without an user account.
      </Text>
      <Alert>
        <strong>Caution:</strong> Unlike User Tokens, Service Tokens have
        unrestricted access to all repository and data stored on this instance.
        Handle those tokens as passwords.
      </Alert>
      <div className={styles.toolbar}>
        <Button onClick={onNewTokenClick} style="primary">
          New Token
        </Button>
      </div>
      <div className={styles.list}>
        {tokensList?.tokens?.map(token => (
          <Item {...token} key={token.id} onDelete={() => tokensRefresh()} />
        ))}
      </div>
    </Base>
  )
}

export default Page
