import { UserProps } from 'types/User'

import { fetchAPI } from './fetch'

export const fetchUser = async (): Promise<UserProps> =>
  await fetchAPI('https://run.mocky.io/v3/d6ac91ac-6dab-4ff0-a08e-9348d7deed51')
