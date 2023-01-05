import Pagination from 'app/common/Pagination'
import TopBar from 'app/common/TopBar'
// import Empty from 'app/repositories/Empty'
import Repository from 'app/repositories/Repository'
import TopBarActions from 'app/repositories/TopBarActions'
import Repositories from 'services/repositories'

const repositories = [
  {
    id: 1,
    title: 'jps',
    description: 'Josie Platform Server',
  },
  {
    id: 2,
    title: 'josie',
    description: 'Josie CLI for Bootstrapping Microservices Projects',
  },
  {
    id: 3,
    title: 'tagus',
    description: undefined,
  },
  {
    id: 4,
    title: 'account-mfe-commons-monorepo',
    description: undefined,
  },
]

const Page = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = await Repositories.get()

  return (
    <div>
      <TopBar title="Repositories">
        <TopBarActions />
      </TopBar>

      {/* {data.repositories?.length === 0 && <Empty />} */}
      {repositories.map(item => (
        <Repository
          description={item.description}
          key={item.id}
          title={item.title}
        />
      ))}

      <Pagination total={5} />
    </div>
  )
}

export default Page
