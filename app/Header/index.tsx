import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Image
          className={styles.logo}
          src='/images/logo.png'
          width='46'
          height='54'
          alt='Cocov logo'></Image>
        <p className={styles.title}>
          Cocov <span>v0.1 beta</span>
        </p>

        <nav>
          <ul className={styles.menu}>
            <li>
              <Link href='#'>Repositories</Link>
            </li>
            <li>
              <Link href='#'>Sign Out</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
