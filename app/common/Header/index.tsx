'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { useAuth } from 'app/AuthContext'
import Loading from 'app/loading'

import styles from './Header.module.scss'
import Menu from './Menu'

const Header = () => {
  const { user } = useAuth()

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link className={styles.logo} href="/">
          <Image
            alt="Cocov logo"
            height="54"
            src="/icons/logo.png"
            width="46"
          />
        </Link>
        <p className={styles.title}>
          <Link href="/">
            Cocov <span>v0.1 beta</span>
          </Link>
        </p>
        {user && (
          <Suspense fallback={<Loading width="200px" />}>
            <Menu />
          </Suspense>
        )}
      </div>
    </header>
  )
}

export default Header
