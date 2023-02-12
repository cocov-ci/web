import { redirect } from 'next/navigation'

import { BadgesResponseProps } from 'types/Badges'
import fetcher from 'utils/fetchServer'

import Content from './Content'
import Disabled from './Disabled'

interface BadgeProps {
  params: { repositoryName: string }
}

const Badges = async ({ params: { repositoryName } }: BadgeProps) => {
  const dataBadges: BadgesResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}/badges`,
  )

  if (!dataBadges) redirect(`/repos/${repositoryName}`)

  return dataBadges.code === 204 ? <Disabled /> : <Content {...dataBadges} />
}

export default Badges
