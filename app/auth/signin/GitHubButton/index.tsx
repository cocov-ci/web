'use client'

import Image from 'next/image'

import { useAuth } from 'app/AuthContext'
import Button from 'app/common/Button'
import Loading from 'app/loading'

import styles from './GitHubButton.module.scss'

const GitHubButton = () => {
  const { login, loading } = useAuth()

  if (loading) return <Loading />

  return (
    <Button className={styles.button} onClick={(): void => login()}>
      <Image
        alt="GitHub logo"
        className={styles.logo}
        height="20"
        src="/icons/github.svg"
        width="20"
      />
      Log in with GitHub
    </Button>
  )
}

export default GitHubButton
