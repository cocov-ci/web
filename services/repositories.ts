import {
  DeleteRepositoriesResponseParams,
  RegenTokenResponseProps,
  RepositoryProps,
  UpdateOrgReposResponseProps,
} from 'types/Repositories'
import fetcher from 'utils/fetchClient'

const Repositories = {
  add: async (name: string): Promise<RepositoryProps> => {
    return await fetcher({
      url: `/api/repositories/add`,
      args: { method: 'POST', params: { name: name } },
    })
  },
  delete: async ({
    repositoryName,
  }: {
    repositoryName: string
  }): Promise<DeleteRepositoriesResponseParams> => {
    return await fetcher({
      url: `/api/repositories/${repositoryName}/settings/delete`,
    })
  },
  regenerateToken: async ({
    repositoryName,
  }: {
    repositoryName: string
  }): Promise<RegenTokenResponseProps> => {
    return await fetcher({
      url: `/api/repositories/${repositoryName}/settings/regen-token`,
    })
  },
  forceResync: async ({
    repositoryName,
  }: {
    repositoryName: string
  }): Promise<RegenTokenResponseProps> => {
    return await fetcher({
      url: `/api/repositories/${repositoryName}/settings/sync-github`,
    })
  },
  refreshList: async (): Promise<UpdateOrgReposResponseProps> => {
    return await fetcher({
      url: `/api/repositories/$org_repos/update`,
    })
  },
}

export default Repositories
