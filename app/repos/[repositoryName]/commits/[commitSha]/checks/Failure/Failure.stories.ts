import type { Meta, StoryObj } from '@storybook/react'

import Failure, { FailureProps } from './index'

const meta: Meta<typeof Failure> = {
  title: 'Commits/[CommitSha]/Checks/Failure',
  component: Failure,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Failure>

const data = {
  reason: 'commit_fetch_failed',
} as FailureProps

export const Default: Story = {
  args: data,
}

export const WithExtra: Story = {
  args: {
    reason: 'manifest_invalid_mount_source',
    details:
      'Invalid mount source `file:bla` for plugin `cocov/rubocop:v0.1`. Only secrets are mountable.',
  },
}
