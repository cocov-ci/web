'use client'

import Link from 'next/link'
import { useMemo } from 'react'

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

const Empty = () => {
  return (
    <div className={styles.empty}>
      <Text className={styles.emptyTitle}>No Data</Text>
      <Text variant="description">
        We still haven't received data from your CI in order to display the
        evolution graph. Need{' '}
        <Link className={styles.settingUpLink} href="#">
          help setting up?
        </Link>
      </Text>
    </div>
  )
}

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

  const coverageData = useMemo(() => data && getData(data?.coverage), [data])
  const issuesData = useMemo(() => data && getData(data?.issues), [data])

  return (
    <div className={styles.charts}>
      <Box className={styles.box} gutterBottom>
        <Text className={styles.title} variant="title">
          Coverage Evolution
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
          <>
            {coverageData?.length === 0 && <Empty />}
            <Chart
              className={styles.chart}
              data={getData(data.coverage)}
              fullChart={true}
              height={chartSize.height}
              labels={getLabels(data.coverage)}
              type="coverage"
              width={chartSize.width}
            />
          </>
        )}
      </Box>
      <Box className={styles.box} gutterBottom>
        <Text className={styles.title} variant="title">
          Issues Evolution
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
          <>
            {issuesData?.length === 0 && <Empty />}
            <Chart
              className={styles.chart}
              data={getData(data.issues)}
              fullChart={true}
              height={chartSize.height}
              labels={getLabels(data.issues)}
              type="issues"
              width={chartSize.width}
            />
          </>
        )}
      </Box>
    </div>
  )
}

export default Charts
