import type { Meta, StoryObj } from '@storybook/react'

import Item from './index'

const meta: Meta<typeof Item> = {
  title: 'Adminland/Secrets/Item',
  component: Item,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Item>

export const Default: Story = {
  args: {
    secret: {
      created_at: '2023-02-26T22:57:52Z',
      id: 4,
      last_used_at: '2023-02-27T21:33:11Z',
      name: 'new_secret',
      owner: {
        login: 'robsoncoelho',
        avatar_url: 'https://avatars.githubusercontent.com/u/1746652?v=4',
      },
      scope: 'organization',
    },
    onDelete: () => null,
  },
}

export const NeverUsed: Story = {
  args: {
    secret: {
      created_at: '2023-02-26T22:57:52Z',
      id: 4,
      last_used_at: '2023-02-27T21:33:11Z',
      name: 'new_secret',
      owner: {
        login: 'robsoncoelho',
        avatar_url: 'https://avatars.githubusercontent.com/u/1746652?v=4',
      },
      scope: 'organization',
    },
    onDelete: () => null,
  },
}
