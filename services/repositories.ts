import { RepositoriesResponseProps } from 'types/Repositories'
import Fetcher from 'utils/fetchServer'

const Repositories = {
  get: (): Promise<RepositoriesResponseProps> => {
    return Fetcher('/v1/repositories')
  },
}

export default Repositories
