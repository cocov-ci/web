'use client'

import Box from 'app/common/Box'
import Chart from 'app/common/Chart'
import Loading from 'app/common/Loading'
import Text from 'app/common/Text'
import useFetch from 'hooks/useFetch'
import { ChartResponseProps } from 'types/Chart'

import styles from './Charts.module.scss'
import { getData, getLabels } from './Utils'

interface BranchFetchResponse {
  data: ChartResponseProps
  loading: boolean
}

const chartSize = { width: 467, height: 146 }

const Charts = ({
  repositoryName,
  branchName,
}: {
  repositoryName: string
  branchName: string
}) => {
  const { data, loading } = useFetch({
    url: `/api/repositories/${repositoryName}/branches/${branchName}/graphs`,
    handler: [],
  }) as BranchFetchResponse

  return (
    <div className={styles.charts}>
      <Box className={styles.box} gutterBottom>
        <Text className={styles.title} variant="title">
          Coverage evolution
        </Text>
        <Text className={styles.description} variant="description">
          Past 31 days
        </Text>
        {loading ? (
          <Loading
            height={`${chartSize.height}px`}
            type="skeleton"
            width="100%"
          />
        ) : (
          <Chart
            className={styles.chart}
            data={getData(data.coverage)}
            fullChart={true}
            height={chartSize.height}
            labels={getLabels(data.coverage)}
            type="coverage"
            width={chartSize.width}
          />
        )}
      </Box>
      <Box className={styles.box} gutterBottom>
        <Text className={styles.title} variant="title">
          Issues evolution
        </Text>
        <Text className={styles.description} variant="description">
          Past 31 days
        </Text>
        {loading ? (
          <Loading
            height={`${chartSize.height}px`}
            type="skeleton"
            width="100%"
          />
        ) : (
          <Chart
            className={styles.chart}
            data={getData(data.issues)}
            fullChart={true}
            height={chartSize.height}
            labels={getLabels(data.issues)}
            type="issues"
            width={chartSize.width}
          />
        )}
      </Box>
    </div>
  )
}

export default Charts
