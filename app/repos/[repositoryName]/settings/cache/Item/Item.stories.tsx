import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Item from './index'

const meta: Meta<typeof Item> = {
  title: 'Settings/Cache/Item',
  component: Item,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Item>

export const Default: Story = {
  args: {
    id: 1,
    name: 'go.mod+go.sum.zstd',
    size: 1024 * 1024 * 27,
    created_at: '2023-03-02T00:03:13Z',
    last_used_at: '2023-05-02T00:03:13Z',
  },
}
