import type { Meta, StoryObj } from '@storybook/react'

import RepositoryItem from './index'

const meta: Meta<typeof RepositoryItem> = {
  title: 'Repositories/New/RepositoryItem',
  component: RepositoryItem,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RepositoryItem>

export const Default: Story = {
  args: {},
}
