import { SecretsCheckNameParams } from 'types/Secrets'
import fetcher from 'utils/fetchClient'

interface CheckNameParams {
  query: {
    repositoryName: string
  }
  name: string
}

interface AddSecretParams {
  data: string
  name: string
  query: {
    repositoryName: string
  }
}

const Secrets = {
  checkName: async (data: CheckNameParams): Promise<SecretsCheckNameParams> => {
    const {
      query: { repositoryName },
    } = data

    return await fetcher({
      url: `/api/repositories/${repositoryName}/secrets/check_name`,
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
  addNew: async (data: AddSecretParams): Promise<SecretsCheckNameParams> => {
    const {
      query: { repositoryName },
    } = data

    return await fetcher({
      url: `/api/repositories/${repositoryName}/secrets`,
      args: { params: { name: data.name, data: data.data } },
    })
  },
}

export default Secrets
