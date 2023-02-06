import type { Meta, StoryObj } from '@storybook/react'

import Sidebar from './index'

const meta: Meta<typeof Sidebar> = {
  title: 'Commits/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    data: {
      'cocov/brakeman': 381,
      'cocov/bundler-audit': 482,
      'cocov/rubocop': 189,
    },
    allItemsText: 'All items',
    loading: false,
    onSelectItem: () => null,
    defaultSelectedItem: '0',
  },
}
