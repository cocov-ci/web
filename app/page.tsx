import Repositories from 'services/repositories'

const Page = async () => {
  const data = await Repositories.get()

  return <p>{data.repositories.length}</p>
}

export default Page
