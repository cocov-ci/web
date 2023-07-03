import Text from '../common/Text'

import Base from './Base'
import BaseStyles from './Base/Base.module.scss'
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
  </Base>
)

export default Page
