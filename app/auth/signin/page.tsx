'use client'

import { isEmpty, isEqual } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import Box from 'app/common/Box'
import Button from 'app/common/Button'
import Loading from 'app/loading'
import Auth from 'services/auth'
import { AuthExchangeRequestProps, AuthExchangeResponseProps } from 'types/Auth'

import GitHubButton from './GitHubButton'
import styles from './SignIn.module.scss'

const exchangeParams = ['exchange_token', 'code', 'state']

const WelcomeContent = () => {
  return (
    <Box
      className={styles.box}
      description="To continue, please authenticate using your GitHub account."
      title="Welcome back!"
    >
      <GitHubButton />
    </Box>
  )
}

const AccessDeniedContent = () => {
  return (
    <Box
      className={styles.box}
      description={`You are not allowed to access this resource.
        Please contact your administrator.`}
      title="Access Denied"
    >
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
            if (data.code === 'session.not_an_org_member') {
              setAccessDenied(true)
            } else if (data.code) {
              router.replace('/auth/signin')
            }
          }
        })
        .catch(() => {
          // TODO: HANDLE WITH IT
        })
    }
  }, [])

  // if (loadingPage) {
  return <Loading count={1} height="200px" type="skeleton" />
  // }

  return (
    <div className={styles.signin}>
      {!accessDenied && <WelcomeContent />}

      {accessDenied && <AccessDeniedContent />}
    </div>
  )
}

export default SignIn
