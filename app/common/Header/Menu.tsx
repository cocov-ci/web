'use client'

import Link from 'next/link'

import { useAuth } from 'context/AuthContext'

import styles from './Header.module.scss'

const Menu = () => {
  const { logout, isAuthenticated, user } = useAuth()

  if (!isAuthenticated) return null

  return (
    <nav>
      <ul className={styles.menu}>
        <li>
          <Link href="/">Repositories</Link>
        </li>
        {user?.isAdmin && (
          <li>
            <Link href="#">Adminland</Link>
          </li>
        )}
        <li>
          <p onClick={() => logout()}>Sign Out</p>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
