import { CheckCircle, XOctagon } from 'lucide-react'

import Button from 'app/common/Button'
import Loading from 'app/common/Loading'
import Text from 'app/common/Text'
import { CheckProps } from 'types/Checks'

import styles from './Check.module.scss'

interface ChecksProps {
  check: CheckProps
  issuesCounter?: number
}

const Check = ({ check, issuesCounter }: ChecksProps) => {
  const { status, plugin_name, started_at, finished_at } = check

  return (
    <div className={styles.check}>
      {status === 'succeeded' && (
        <CheckCircle className={styles.succeeded} size="24" />
      )}
      {status === 'errored' && <XOctagon className={styles.errored} />}
      {status === 'waiting' && <Loading width="24px" />}

      <div className={styles.content}>
        <Text className={styles.pluginName}>{plugin_name}</Text>
        <Text className={styles.statusMessage} variant="description">
          {started_at}
          {issuesCounter || 'No'} issues reported.
        </Text>
      </div>
      {status === 'errored' && <Button style="mini">Details</Button>}
    </div>
  )
}

export default Check
