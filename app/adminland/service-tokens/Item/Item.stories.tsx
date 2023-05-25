import type { Meta, StoryObj } from '@storybook/react'

import Item from './index'

const meta: Meta<typeof Item> = {
  title: 'Adminland/ServiceTokens/Item',
  component: Item,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Item>

export const Default: Story = {
  args: {
    created_at: '2023-02-02T03:04:05Z',
    created_by: 'heyvito',
    description: 'Worker Service Token',
    last_used_at: '2023-02-02T03:04:05Z',
  },
}

export const NeverUsed: Story = {
  args: {
    created_at: '2023-02-02T03:04:05Z',
    created_by: 'heyvito',
    description: 'Worker Service Token',
  },
}
