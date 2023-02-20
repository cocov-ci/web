import Link from 'next/link'

import Box from 'app/common/Box'
import Chart from 'app/common/Chart'
import Text from 'app/common/Text'
import {
  ChartResponseProps,
  ChartTypeObjectProps,
  ChartTypeProps,
} from 'types/Chart'
import fetcher from 'utils/fetchServer'

import styles from './Charts.module.scss'
import { getData, getLabels } from './Utils'

const chartSize = { width: 467, height: 146 }

const Empty = () => {
  return (
    <div className={styles.empty}>
      <Text className={styles.emptyTitle}>No Data</Text>
      <Text gutterBottom variant="description">
        We still haven't received data from your CI in order to display the
        evolution graph. Need{' '}
        <Link className={styles.settingUpLink} href="#">
          help setting up?
        </Link>
      </Text>
    </div>
  )
}

const ChartComponent = ({
  data,
  type,
  title,
}: {
  data: ChartTypeObjectProps
  type: ChartTypeProps
  title: string
}) => {
  const chartData = data ? getData(data) : []

  return (
    <>
      <Text className={styles.title} variant="title">
        {title}
      </Text>
      <Text className={styles.description} variant="description">
        Past 31 days
      </Text>
      {chartData.length === 0 && <Empty />}
      <Chart
        className={styles.chart}
        data={chartData}
        fullChart={true}
        height={chartSize.height}
        labels={getLabels(data)}
        type={type}
        width={chartSize.width}
      />
    </>
  )
}

const Charts = async ({
  repositoryName,
  branchName,
}: {
  repositoryName: string
  branchName: string
}) => {
  const data: ChartResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}/branches/graphs/${branchName}`,
  )

  if (!data || data?.code === 404) return null

  return (
    <div className={styles.charts}>
      <Box className={styles.box} gutterBottom>
        <ChartComponent
          data={data.coverage}
          title="Coverage Evolution"
          type="coverage"
        />
      </Box>
      <Box className={styles.box} gutterBottom>
        <ChartComponent
          data={data.issues}
          title="Issues Evolution"
          type="issues"
        />
      </Box>
    </div>
  )
}

export default Charts
