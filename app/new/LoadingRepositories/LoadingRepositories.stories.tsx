import type { Meta, StoryObj } from '@storybook/react'

import LoadingRepositories from './index'

const meta: Meta<typeof LoadingRepositories> = {
  title: 'Repositories/New/LoadingRepositories',
  component: LoadingRepositories,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LoadingRepositories>

export const Default: Story = {
  args: {},
}
