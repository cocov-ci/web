import type { Meta, StoryObj } from '@storybook/react'

import Repository from './index'

const meta: Meta<typeof Repository> = {
  title: 'Repositories/Repository',
  component: Repository,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Repository>

export const Default: Story = {
  args: {
    title: 'Title here...',
    description: 'Description here...',
    stats: {
      issues: {
        data: new Array(31).fill(0).map(() => Math.ceil(Math.random() * 10000)),
        value: Math.ceil(Math.random() * 1000),
      },
      coverage: {
        data: new Array(31).fill(0).map(() => Math.ceil(Math.random() * 10000)),
        value: Math.ceil(Math.random() * 1000),
      },
    },
  },
}
