import type { Meta, StoryObj } from '@storybook/react'

import CommitHeader from './index'

const meta: Meta<typeof CommitHeader> = {
  title: 'Common/CommitHeader',
  component: CommitHeader,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CommitHeader>

export const Default: Story = {
  args: {
    headURL: 'https://github.com/cocov-ci/web',
    avatarURL: 'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
    headSHA: '62bad0cbadbeefc0c0f',
    commitMessage:
      'fix(rollout-restart): Ensure to keep watching rollout status',
    username: 'cocov-ci',
    timestamp: new Date(Date.parse('2022-11-22T21:25:31Z')),
  },
}

export const Readonly: Story = {
  args: {
    headURL: 'https://github.com/cocov-ci/web',
    avatarURL: 'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
    headSHA: '62bad0cbadbeefc0c0f',
    commitMessage:
      'fix(rollout-restart): Ensure to keep watching rollout status',
    username: 'cocov-ci',
    timestamp: new Date(Date.parse('2022-11-22T21:25:31Z')),
  },
}
