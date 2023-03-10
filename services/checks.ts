import {
  CheckProps,
  ChecksReRunAndCancel,
  ChecksResponseProps,
} from 'types/Checks'
import fetcher from 'utils/fetchClient'

const Checks = {
  reRun: async ({
    repositoryName,
    commitSha,
  }: ChecksReRunAndCancel): Promise<CheckProps> => {
    return await fetcher({
      url: `/api/repositories/${repositoryName}/commits/${commitSha}/checks/re_run`,
      args: {
        method: 'DELETE',
      },
    })
  },
  cancel: async ({
    repositoryName,
    commitSha,
  }: ChecksReRunAndCancel): Promise<ChecksResponseProps> => {
    return await fetcher({
      url: `/api/repositories/${repositoryName}/commits/${commitSha}/checks/delete`,
      args: {
        method: 'POST',
      },
    })
  },
}

export default Checks
