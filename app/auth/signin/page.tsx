'use client'

import { isEmpty, isEqual } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import Box from 'app/common/Box'
import Button from 'app/common/Button'
import Text from 'app/common/Text'
import Auth from 'services/auth'
import { AuthExchangeRequestProps, AuthExchangeResponseProps } from 'types/Auth'

import GitHubButton from './GitHubButton'
import Loading from './loading'
import styles from './SignIn.module.scss'

const exchangeParams = ['exchange_token', 'code', 'state']

const WelcomeContent = () => {
  return (
    <Box className={styles.box}>
      <Text variant="title">Welcome back!</Text>
      <Text variant="description">
        To continue, please authenticate using your GitHub account.
      </Text>
      <GitHubButton />
    </Box>
  )
}

const AccessDeniedContent = () => {
  return (
    <Box className={styles.box}>
      <Text variant="title">Access Denied</Text>
      <Text variant="description">
        {`You are not allowed to access this resource.
        Textlease contact your administrator.`}
      </Text>
      <Button className={styles.accessDeniedButton} uppercase>
        Ok
      </Button>
    </Box>
  )
}

const SignIn = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loadingPage, setLoadingPage] = useState<boolean>(
    !isEmpty(searchParams),
  )
  const [accessDenied, setAccessDenied] = useState<boolean>(false)

  const isExchangeFlow = useMemo(
    () =>
      isEqual(
        exchangeParams.filter((k: string) => searchParams.get(k)),
        exchangeParams,
      ),
    [searchParams],
  )

  useEffect(() => {
    if (!isExchangeFlow) {
      setLoadingPage(false)
    }
  }, [isExchangeFlow])

  useEffect(() => {
    if (isExchangeFlow) {
      const params = {
        ...(exchangeParams.reduce(
          (ac, a) => ({ ...ac, [a]: searchParams.get(a) }),
          {},
        ) as AuthExchangeRequestProps),
      }

      Auth.exchange(params)
        .then(({ data }: AuthExchangeResponseProps) => {
          if (data.token) {
            Auth.setToken(data.token)
            router.push(searchParams.get('next') || '/repositories')
          } else {
            router.replace('/auth/signin')
          }
        })
        .catch(err => {
          if (err.code === 'session.not_an_org_member') {
            setAccessDenied(true)
          } else if (err.code) {
            router.replace('/auth/signin')
          }
        })
    }
  }, [])

  if (loadingPage) {
    return <Loading />
  }

  return (
    <div className={styles.signin}>
      {!accessDenied && <WelcomeContent />}

      {accessDenied && <AccessDeniedContent />}
    </div>
  )
}

export default SignIn
