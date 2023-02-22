'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import useAuth from 'hooks/useAuth'
import { UserProps } from 'types/User'

import styles from './Header.module.scss'

const Menu = () => {
  const [loggedUser, setLoggedUser] = useState<UserProps>()
  const { logout, user } = useAuth()

  useEffect(() => {
    setLoggedUser(user)
  }, [user])

  if (!loggedUser) return null

  return (
    <nav>
      <ul className={styles.menu}>
        <li>
          <Link href="/">Repositories</Link>
        </li>
        {loggedUser?.isAdmin && (
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
