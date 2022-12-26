import { fetchClient } from 'pages/api/fetch'
import { RepositoriesResponseProps } from 'types/Repositories'

const Repositories = {
  get: (): Promise<RepositoriesResponseProps> =>
    fetchClient('/api/repositories'),
}

export default Repositories
