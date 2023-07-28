import type { Meta, StoryObj } from '@storybook/react'

import Sidebar from './index'

const meta: Meta<typeof Sidebar> = {
  title: 'Settings/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    repositoryName: 'web',
    defaultSelectedItem: '/general',
  },
}
