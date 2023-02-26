import type { Meta, StoryObj } from '@storybook/react'

import Items from './index'

const meta: Meta<typeof Items> = {
  title: 'Settings/Secrets/Items',
  component: Items,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Items>

export const Default: Story = {
  args: {
    loading: false,
    refetch: () => null,
    secrets: [
      {
        created_at: '2023-02-26T22:57:52Z',
        id: 4,
        last_used_at: '2023-02-27T21:33:11Z',
        name: 'new_secret',
        owner: {
          login: 'robsoncoelho',
          avatar_url: 'https://avatars.githubusercontent.com/u/1746652?v=4',
        },
        scope: 'repository',
      },
      {
        created_at: '2023-02-26T22:57:52Z',
        id: 5,
        last_used_at: '2023-02-27T21:33:11Z',
        name: 'new_secret',
        owner: {
          login: 'robsoncoelho',
          avatar_url: 'https://avatars.githubusercontent.com/u/1746652?v=4',
        },
        scope: 'organization',
      },
    ],
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    refetch: () => null,
    secrets: [
      {
        created_at: '2023-02-26T22:57:52Z',
        id: 4,
        last_used_at: '2023-02-27T21:33:11Z',
        name: 'new_secret',
        owner: {
          login: 'robsoncoelho',
          avatar_url: 'https://avatars.githubusercontent.com/u/1746652?v=4',
        },
        scope: 'repository',
      },
      {
        created_at: '2023-02-26T22:57:52Z',
        id: 5,
        last_used_at: '2023-02-27T21:33:11Z',
        name: 'new_secret',
        owner: {
          login: 'robsoncoelho',
          avatar_url: 'https://avatars.githubusercontent.com/u/1746652?v=4',
        },
        scope: 'organization',
      },
    ],
  },
}
