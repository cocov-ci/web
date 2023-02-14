import type { Meta, StoryObj } from '@storybook/react'

import { CheckProps } from 'types/Checks'

import Check from './index'

const meta: Meta<typeof Check> = {
  title: 'Commits/[CommitSha]/Checks/Check',
  component: Check,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Check>

const data = {
  id: 321,
  plugin_name: 'cocov/brakeman',
  status: 'succeeded',
  started_at: '2023-01-27T00:06:07Z',
  finished_at: '2023-01-27T00:06:44Z',
} as CheckProps

export const Default: Story = {
  args: data,
}
