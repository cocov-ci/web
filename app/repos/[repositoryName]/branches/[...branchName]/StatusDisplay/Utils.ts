import { StatusDotColor } from 'app/common/StatusDot'
import { HeadProps } from 'types/Commits'

interface StatusDisplayProps {
  message?: string
  statusColor: StatusDotColor
  messageBold: boolean
  detailsHref?: string
}

interface DataProps {
  repositoryName: string
  data: HeadProps
}

export const getCoverage = ({ data, repositoryName }: DataProps) => {
  const { coverage_status, minimum_coverage, coverage_percent, sha } = data

  const coverageObject: StatusDisplayProps = {
    messageBold: false,
  } as StatusDisplayProps

  switch (coverage_status) {
    case 'waiting':
      coverageObject.message = 'Waiting Upload...'
      coverageObject.statusColor = 'grey'
      break
    case 'queued':
    case 'in_progress':
      coverageObject.message = 'Processing...'
      coverageObject.messageBold = true
      coverageObject.statusColor = 'yellow'
      break
    case 'errored':
      coverageObject.message = 'Error processing'
      coverageObject.messageBold = true
      coverageObject.statusColor = 'red'
      break
    case 'completed':
      if (
        minimum_coverage &&
        coverage_percent &&
        coverage_percent < minimum_coverage
      ) {
        coverageObject.message = `${coverage_percent}% (at least ${minimum_coverage} is required)`
        coverageObject.messageBold = true
        coverageObject.detailsHref = `/repos/${repositoryName}/commits/${sha}/coverage`
        coverageObject.statusColor = 'red'
      } else if (
        !minimum_coverage ||
        (coverage_percent && coverage_percent >= minimum_coverage)
      ) {
        coverageObject.message = `${coverage_percent}%`
        coverageObject.detailsHref = `/repos/${repositoryName}/commits/${sha}/coverage`
        coverageObject.statusColor = 'green'
      }

      break
    default:
  }

  return coverageObject
}

export const getChecks = ({ data, repositoryName }: DataProps) => {
  const { checks_status, issues_count, sha } = data

  const checkObject: StatusDisplayProps = {
    messageBold: false,
  } as StatusDisplayProps

  switch (checks_status) {
    case 'waiting':
    case 'queued':
    case 'in_progress':
      checkObject.message = 'Processing...'
      checkObject.messageBold = true
      checkObject.detailsHref = `/repos/${repositoryName}/commits/${sha}/checks`
      checkObject.statusColor = 'yellow'
      break

    case 'errored':
      checkObject.message = 'Failed running'
      checkObject.messageBold = true
      checkObject.statusColor = 'red'
      checkObject.detailsHref = `/repos/${repositoryName}/commits/${sha}/checks`
      break

    case 'failure':
      checkObject.message = 'Errored'
      checkObject.messageBold = true
      checkObject.statusColor = 'red'
      checkObject.detailsHref = `/repos/${repositoryName}/commits/${sha}/checks`
      break

    case 'completed':
      if (issues_count === 0) {
        checkObject.message = 'Passing. No issues detected.'
        checkObject.statusColor = 'green'
      } else {
        checkObject.message = `${issues_count} issues`
        checkObject.detailsHref = `/repos/${repositoryName}/commits/${sha}/issues`
        checkObject.statusColor = 'red'
        checkObject.messageBold = true
      }

      break
    case 'not_configured':
      checkObject.message = 'Not configured.'
      checkObject.messageBold = true
      checkObject.statusColor = 'grey'
      break

    case 'canceled':
      checkObject.message = 'Canceled'
      checkObject.statusColor = 'grey'
      checkObject.detailsHref = `/repos/${repositoryName}/commits/${sha}/checks`
      break

    default:
  }

  return checkObject
}
