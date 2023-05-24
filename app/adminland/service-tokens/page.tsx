'use client'

import React from 'react'

import Button from 'app/common/Button'
import Text from 'app/common/Text'
import useModal from 'hooks/useModal'
import API, { useAPI } from 'utils/api'

import Base from '../Base'
import BaseStyles from '../Base/Base.module.scss'

import Alert from './Alert'
import Item from './Item'
import AddNewToken from './Modals/AddNewToken'
import NewTokenSuccess from './Modals/NewTokenSuccess'
import styles from './ServiceTokens.module.scss'

const Page = () => {
  const {
    result: tokensList,
    loading: tokensLoading,
    error: tokensError,
    refresh: tokensRefresh,
  } = useAPI(API.shared.serviceTokens, {})

  const { openModal } = useModal()

  const onNewTokenClick = () => {
    openModal(
      <AddNewToken
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
        {tokensList?.tokens?.map(s => (
          <Item {...s} key={s.id} onDelete={() => tokensRefresh()} />
        ))}
      </div>
    </Base>
  )
}

export default Page
