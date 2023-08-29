import Alert from 'app/adminland/Alert'

import Text from '../common/Text'

import Base from './Base'
import BaseStyles from './Base/Base.module.scss'
import ResyncAllPermissionsButton from './ResyncAllPermissionsButton'
import SidekiqButton from './SidekiqButton'

const Page = () => (
  <Base currentPage="">
    <Text className={BaseStyles.title} variant="title">
      Sidekiq Dashboard
    </Text>
    <Text className={BaseStyles.bottomMargin}>
      Sidekiq is responsible for running Cocov’s background tasks. Clicking the
      button below will redirect you to its dashboard, which shows Sidekiq’s
      statistics, along with pending, running, scheduled and failed jobs.
    </Text>

    <div>
      <SidekiqButton />
    </div>

    <div className={BaseStyles.divisor} />

    <Text className={BaseStyles.title} variant="title">
      Resync Global Permissions
    </Text>
    <Text className={BaseStyles.bottomMargin}>
      As GitHub is unable to emit events when organizations have their base
      repository policy change, for example, a resync may be required depending
      on settings changed on your organization.
    </Text>
    <div className={BaseStyles.bottomMargin}>
      <Alert>
        <strong>Warning:</strong> This is an intensive operation that may cause
        Cocov’s to be rate-limited, depending on the amount of repositories
        present on your instance. Make sure to only execute this during
        afterhours in order to not impact commit processing and your users.
      </Alert>
    </div>
    <div>
      <ResyncAllPermissionsButton />
    </div>
  </Base>
)

export default Page
