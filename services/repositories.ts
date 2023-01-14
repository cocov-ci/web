import { RepositoriesResponseProps } from 'types/Repositories'
import fetcher from 'utils/fetchClient'

const Repositories = {
  get: async (): Promise<RepositoriesResponseProps> => {
    return await fetcher('/api/repositories')
  },
}

export default Repositories
