import TopBar from 'app/common/TopBar'
import Empty from 'app/repositories/Empty'
import TopBarActions from 'app/repositories/TopBarActions'
import Repositories from 'services/repositories'

const Page = async () => {
  const data = await Repositories.get()

  return (
    <div>
      <TopBar title="Repositories">
        <TopBarActions />
      </TopBar>
      {data.repositories.length === 0 && <Empty />}
    </div>
  )
}

export default Page
