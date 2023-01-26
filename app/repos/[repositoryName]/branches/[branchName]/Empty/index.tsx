import { BoxSelect } from 'lucide-react'

import Alert from 'app/common/Alert'

import styles from './Empty.module.scss'

const Empty = () => {
  return (
    <div className={styles.empty}>
      <Alert
        description="This repository doesn't have a branch yet, or, if it has been recently added, its default branch is being processed. Try refreshing this page in a few seconds."
        icon={BoxSelect}
        title="Hmm. It's empty here…"
      />
    </div>
  )
}

export default Empty
