import { IssueIgnoreParams, IssueProps } from 'types/Issues'
import fetcher from 'utils/fetchClient'

const Issues = {
  ignore: async ({
    repositoryName,
    commitSha,
    id,
    mode,
    reason,
  }: IssueIgnoreParams): Promise<IssueProps> => {
    return await fetcher({
      url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues/${id}/ignore`,
      args: {
        method: 'POST',
        params: {
          reason: reason,
          mode: mode,
        },
      },
    })
  },
  cancelIgnore: async ({
    repositoryName,
    commitSha,
    id,
  }: Omit<IssueIgnoreParams, 'mode' | 'reason'>): Promise<IssueProps> => {
    return await fetcher({
      url: `/api/repositories/${repositoryName}/commits/${commitSha}/issues/${id}/cancelIgnore`,
    })
  },
}

export default Issues
