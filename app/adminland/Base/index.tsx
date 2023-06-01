'use client'

import FixedContent from 'app/common/FixedContent'
import TopBar from 'app/common/TopBar'
import API, { useAPI } from 'utils/api'

import Sidebar from '../Sidebar'

import styles from './Base.module.scss'

interface AdminlandBaseProps {
  currentPage: string
  children: React.ReactNode
}

const AdminlandBase = ({ currentPage, children }: AdminlandBaseProps) => {
  const { result, error, loading } = useAPI(API.shared.adminSidebarCounters, {})

  return (
    <div>
      <TopBar title="Adminland" />
      <FixedContent>
        <div className={styles.wrapper}>
          <div className={styles.warningStripes} />
          <div className={styles.content}>
            <div className={styles.sidebar}>
              <Sidebar
                counters={result}
                currentSelectedPath={currentPage}
                loading={loading}
              />
            </div>
            <div className={styles.info}>{children}</div>
          </div>
        </div>
      </FixedContent>
    </div>
  )
}

export default AdminlandBase
