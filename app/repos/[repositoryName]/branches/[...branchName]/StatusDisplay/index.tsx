import StatusDisplay from 'app/common/StatusDisplay'
import { HeadProps } from 'types/Commits'

import { getChecks, getCoverage } from './Utils'

interface StatusDisplayProps {
  repositoryName: string
  data: HeadProps
}

const StatusDisplayComponent = ({
  data,
  repositoryName,
}: StatusDisplayProps) => {
  if (!data) return null

  return (
    <StatusDisplay
      checks={{ ...getChecks({ data, repositoryName }) }}
      coverage={{ ...getCoverage({ data, repositoryName }) }}
      gutterBottom
    />
  )
}

export default StatusDisplayComponent
