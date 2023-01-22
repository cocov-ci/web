'use client'

// import useSWR from 'swr'

import Box from 'app/common/Box'
import Chart from 'app/common/Chart'
import { makeFakePoints } from 'app/common/Chart/Utils'
import Text from 'app/common/Text'
// import useFetch from 'hooks/useFetch'

import styles from './Charts.module.scss'

const Charts = ({ repositoryName }: { repositoryName: string }) => {
  // const { data } = useFetch({
  //   url: `/api/repositories/${repositoryName}`,
  //   handler: [],
  // })

  return (
    <div className={styles.charts}>
      <Box className={styles.chart} gutterBottom>
        <Text className={styles.title} variant="title">
          Coverage evolution
        </Text>
        <Text className={styles.description} variant="description">
          Past 31 days
        </Text>
        <Chart data={makeFakePoints()} height={160} type="issues" width={425} />
      </Box>
      <Box className={styles.chart} gutterBottom>
        <Text className={styles.title} variant="title">
          Issues evolution
        </Text>
        <Text className={styles.description} variant="description">
          Past 31 days
        </Text>
      </Box>
    </div>
  )
}

export default Charts
