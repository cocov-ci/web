'use client'

import Image from 'next/image'

import Button from 'app/common/Button'
import Loading from 'app/common/Loading'
import useAuth from 'hooks/useAuth'

import styles from './GitHubButton.module.scss'

const GitHubButton = () => {
  const { login, loading } = useAuth()

  if (loading) return <Loading />

  return (
    <div className={styles.gitHubButton}>
      <Button
        className={styles.button}
        onClick={(): void => login()}
        style="secondary"
      >
        <Image
          alt="GitHub logo"
          className={styles.logo}
          height="20"
          src="/icons/github.svg"
          width="20"
        />
        Log in with GitHub
      </Button>
    </div>
  )
}

export default GitHubButton
