import StatusDisplay from 'app/common/StatusDisplay'
import { HeadProps } from 'types/Branches'

import { getChecks, getCoverage } from './Utils'

interface StatusDisplayProps {
  repositoryName: string
  data: HeadProps
}

const StatusDisplayComponent = ({
  data,
  repositoryName,
}: StatusDisplayProps) => {
  return (
    <StatusDisplay
      checks={{ ...getChecks({ data, repositoryName }) }}
      coverage={{ ...getCoverage({ data, repositoryName }) }}
      gutterBottom
    />
  )
}

export default StatusDisplayComponent
