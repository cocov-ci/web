'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Image
          className={styles.logo}
          src='/icons/logo.png'
          width='46'
          height='54'
          alt='Cocov logo'
        />
        <p className={styles.title}>
          Cocov <span>v0.1 beta</span>
        </p>

        {session && (
          <nav>
            <ul className={styles.menu}>
              <li>
                <Link href='#'>Repositories</Link>
              </li>
              <li>
                <p onClick={() => signOut()}>Sign Out</p>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
