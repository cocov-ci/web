import {
  DeleteRepositoriesResponseParams,
  RegenTokenResponseProps,
} from 'types/Repositories'
import fetcher from 'utils/fetchClient'

const Repositories = {
  // add: async (data: AddSecretParams): Promise<SecretParams> => {
  //   return await fetcher({
  //     url: `/api/repositories/${data.repositoryName}/secrets/new`,
  //     args: { params: { name: data.name, data: data.data } },
  //   })
  // },
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
}

export default Repositories
