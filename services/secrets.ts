import {
  AddSecretParams,
  CheckNameParams,
  DeleteSecretParams,
  SecretParams,
  SecretsCheckNameParams,
} from 'types/Secrets'
import fetcher from 'utils/fetchClient'

const Secrets = {
  checkName: async (data: CheckNameParams): Promise<SecretsCheckNameParams> => {
    return await fetcher({
      url: `/api/repositories/${data.repositoryName}/secrets/check_name`,
      args: { params: { name: data.name } },
    })
      .then(res => res)
      .catch(err => {
        if (err.response?.status === 400) {
          return err.response?.data
        } else if (err?.code !== 'ERR_CANCELED') {
          throw err
        }
      })
  },
  add: async (data: AddSecretParams): Promise<SecretParams> => {
    return await fetcher({
      url: `/api/repositories/${data.repositoryName}/secrets/new`,
      args: { params: { name: data.name, data: data.data } },
    })
  },
  delete: async (data: DeleteSecretParams): Promise<SecretsCheckNameParams> => {
    return await fetcher({
      url: `/api/repositories/${data.repositoryName}/secrets/delete/${data.id}`,
    })
  },
}

export default Secrets
