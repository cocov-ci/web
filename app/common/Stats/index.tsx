import Chart from 'app/common/Chart'
import Text from 'app/common/Text'
import { StatsComponentProps } from 'types/Stats'

import styles from './Stats.module.scss'

const Stats = ({ data: dataChart, type }: StatsComponentProps) => {
  const { data, value } = dataChart || {}

  const coverage = type === 'coverage'

  return (
    <div className={styles.stats}>
      {typeof value === 'number' && data && (
        <div className={styles.chart}>
          <Chart data={data} height={80} type={type} width={182} />
        </div>
      )}
      <Text className={styles.description} variant="description">
        {coverage ? 'Coverage' : 'Issues'}
      </Text>

      <Text className={styles.value}>
        {typeof value !== 'number' ? (
          <>&#8212;</>
        ) : coverage ? (
          `${value}%`
        ) : (
          value
        )}
      </Text>
    </div>
  )
}

export default Stats
