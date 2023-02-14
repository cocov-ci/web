import { redirect } from 'next/navigation'

import FixedContent from 'app/common/FixedContent'
import { ChecksResponseProps } from 'types/Checks'
import fetcher from 'utils/fetchServer'

import Alert from './Alert'
import Check from './Check'
import Header from './Header'
import styles from './Page.module.scss'

interface ChecksParams {
  params: { repositoryName: string; commitSha: string; fileId: string }
}

const Coverage = async ({
  params: { repositoryName, commitSha },
}: ChecksParams) => {
  const data: ChecksResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}/commits/${commitSha}/checks`,
  )

  if (!data) redirect(`/repos/${repositoryName}`)

  const allSucceeded =
    data.checks?.filter(item => item.status !== 'succeeded').length === 0

  return (
    <FixedContent>
      <Header commit={data.commit} repositoryName={repositoryName} />
      <div className={styles.content}>
        {allSucceeded && <Alert />}
        {data.checks?.map(item => (
          <Check
            check={item}
            issuesCounter={data.issues[item.plugin_name]}
            key={item.id}
          />
        ))}
      </div>
    </FixedContent>
  )
}

export default Coverage
