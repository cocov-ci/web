import type { Meta, StoryObj } from '@storybook/react'

import Check, { CheckComponentProps } from './index'

const meta: Meta<typeof Check> = {
  title: 'Commits/[CommitSha]/Checks/Check',
  component: Check,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Check>

const data = {
  check: {
    id: 321,
    plugin_name: 'cocov/brakeman',
    status: 'succeeded',
    started_at: '2023-01-27T00:06:07Z',
    finished_at: '2023-01-27T00:06:44Z',
  },
  issuesCounter: 18,
} as CheckComponentProps

export const Default: Story = {
  args: data,
}