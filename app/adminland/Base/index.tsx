'use client'

import FixedContent from 'app/common/FixedContent'
import TopBar from 'app/common/TopBar'

import Sidebar from '../Sidebar'

import styles from './Base.module.scss'

interface AdminlandBaseProps {
  currentPage: string
  children: React.ReactNode
}

const AdminlandBase = ({ currentPage, children }: AdminlandBaseProps) => {
  return (
    <div>
      <TopBar title="Adminland" />
      <FixedContent>
        <div className={styles.wrapper}>
          <div className={styles.warningStripes} />
          <div className={styles.content}>
            <div className={styles.sidebar}>
              <Sidebar currentSelectedPath={currentPage} loading={false} />
            </div>
            <div className={styles.info}>{children}</div>
          </div>
        </div>
      </FixedContent>
    </div>
  )
}

export default AdminlandBase
