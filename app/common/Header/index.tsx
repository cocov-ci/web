import Image from 'next/image'
import Link from 'next/link'

import styles from './Header.module.scss'
import Menu from './Menu'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link className={styles.logo} href="/">
          <Image
            alt="Cocov logo"
            height="54"
            src="/icons/logo.png"
            width="54"
          />
        </Link>
        <p className={styles.title}>
          <Link href="/">
            Cocov <span>v0.1 beta</span>
          </Link>
        </p>
        <Menu />
      </div>
    </header>
  )
}

export default Header
