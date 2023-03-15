'use client'

import {
  RepositoryListInput,
  RepositoryListOutput,
} from './request_response_types'

export default interface APIProvider {
  repositoryList(params: RepositoryListInput): Promise<RepositoryListOutput>
}
