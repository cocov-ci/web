'use client'

import { setCookie } from 'cookies-next'
import { isEmpty, isEqual } from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import Box from 'app/common/Box'
import Auth from 'services/auth'
import { AuthExchangeRequestProps, AuthExchangeResponseProps } from 'types/Auth'

import SignInButton from './Button'
import Loading from './Loading'
import styles from './SignIn.module.scss'

const exchangeParams = ['exchange_token', 'code', 'state']

const SignIn = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const router = useRouter()
  const [loadingPage, setLoadingPage] = useState<boolean>(
    !isEmpty(searchParams),
  )

  const isExchangeFlow = useMemo(
    () =>
      isEqual(
        exchangeParams.filter((k: string) => k in searchParams!),
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
      const params: AuthExchangeRequestProps = {
        exchange_token: searchParams?.exchange_token?.toString(),
        state: searchParams?.state?.toString(),
        code: searchParams?.code?.toString(),
        redirect: process.env.NEXT_PUBLIC_AUTH_REDIRECT!,
      }

      Auth.exchange(params)
        .then(({ data }: AuthExchangeResponseProps) => {
          if (data.token) {
            setCookie('cocov_auth_token', data.token)
            router.push(searchParams?.next?.toString() || '/')
          }
        })
        .finally(() => setLoadingPage(false))
    }
  }, [searchParams])

  if (loadingPage) {
    return <Loading />
  }

  return (
    <div className={styles.signin}>
      <Box className={styles.box}>
        <h1>Welcome back!</h1>
        <p className={styles.description}>
          To continue, please authenticate using your GitHub account.
        </p>
        <SignInButton />
      </Box>
    </div>
  )
}

export default SignIn
