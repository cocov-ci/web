import type { Meta, StoryObj } from '@storybook/react'

import Item from './index'

const meta: Meta<typeof Item> = {
  title: 'Adminland/repositories/Item',
  component: Item,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Item>

export const Default: Story = {
  args: {
    accessible_by_count: 2,
    commits_size: 123849,
    cache_size: 91892791,
    name: 'repo',
    created_at: '2023-04-05T12:34:56Z',
    description: 'a fancy repo',
  },
}
