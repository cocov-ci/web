import { HeartCrack } from 'lucide-react'
import { redirect } from 'next/navigation'

import Alert from 'app/common/Alert'
import { BadgesResponseProps } from 'types/Badges'
import fetcher from 'utils/fetchServer'

import Box from './Box'

interface BadgeProps {
  params: { repositoryName: string }
}

const Badges = async ({ params: { repositoryName } }: BadgeProps) => {
  const dataBadges: BadgesResponseProps = await fetcher(
    `/v1/repositories/${repositoryName}`,
  )

  if (!dataBadges) redirect(`/v1/repositories/${repositoryName}`)

  return (
    <>
      {/* {dataBadges.code === 204 && ( */}
      <Box>
        <Alert
          description="This instance does not have a badge server configured. It must be configured to enable this feature."
          icon={HeartCrack}
          title="Badges are disabled"
        />
      </Box>
      {/* )} */}
    </>
  )
}

export default Badges
