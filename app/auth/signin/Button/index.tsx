'use client'

import Image from 'next/image'

import { useAuth } from 'app/AuthContext'

import Loading from '../Loading'

import styles from './Button.module.scss'

const SignInButton = () => {
  const { login, loading } = useAuth()

  if (loading) return <Loading />

  return (
    <button className={styles.button} onClick={(): void => login()}>
      <Image
        alt="GitHub logo"
        className={styles.logo}
        height="20"
        src="/icons/github.svg"
        width="20"
      />
      Log in with GitHub
    </button>
  )
}

export default SignInButton
