import ListItem from 'app/common/ListItem'
import Pagination from 'app/common/Pagination'
import TopBar from 'app/common/TopBar'
// import Empty from 'app/repositories/Empty'
// import NoResults from 'app/repositories/NoResults'
import TopBarActions from 'app/repositories/TopBarActions'
import Repositories from 'services/repositories'

const repositories = [
  {
    id: 1,
    title: 'jps',
    description: 'Josie Platform Server',
    stats: {
      issues: {
        data: [1, 100, 90, 110, 90],
        value: 5694,
      },
      coverage: {
        data: [90, 100, 90, 80, 100],
        value: 100,
      },
    },
  },
  {
    id: 2,
    title: 'josie',
    description: 'Josie CLI for Bootstrapping Microservices Projects',
    stats: {
      issues: {
        data: [1, 100, 90, 110, 90],
        value: 5694,
      },
      coverage: undefined,
    },
  },
  {
    id: 3,
    title: 'tagus',
    description: undefined,
    stats: {
      issues: undefined,
      coverage: undefined,
    },
  },
  {
    id: 4,
    title: 'account-mfe-commons-monorepo',
    description: undefined,
    stats: {
      issues: undefined,
      coverage: {
        data: [90, 100, 90, 80, 100],
        value: 100,
      },
    },
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
      {/* {data.repositories?.length === 0 && <NoResults />} */}
      {repositories.map(item => (
        <ListItem
          description={item.description}
          key={item.id}
          stats={item.stats}
          title={item.title}
        />
      ))}

      <Pagination currentPage={1} total={5} />
    </div>
  )
}

export default Page
