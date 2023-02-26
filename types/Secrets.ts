export interface SecretParams {
  created_at: string
  id: number
  last_used_at?: string
  name: string
  owner: {
    avatar_url: string
    login: string
  }
  scope: 'repository' | 'organization'
}

export interface SecretsCheckNameParams {
  code?: string
  message?: string
  status?: string
}

export interface SecretsFetchParams {
  paging: {
    page: number
    total_pages: number
  }
  secrets: SecretParams[]
}

export interface CheckNameParams {
  repositoryName: string
  name: string
}

export interface AddSecretParams {
  data: string
  name: string
  repositoryName: string
}

export interface DeleteSecretParams {
  id: number
  repositoryName: string
}
