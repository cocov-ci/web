'use client'

import Link from 'next/link'

import { useAuth } from 'app/AuthContext'

import styles from './Header.module.scss'

const Menu = () => {
  const { logout, isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  return (
    <nav>
      <ul className={styles.menu}>
        <li>
          <Link href="#">Repositories</Link>
        </li>
        <li>
          <p onClick={() => logout()}>Sign Out</p>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
