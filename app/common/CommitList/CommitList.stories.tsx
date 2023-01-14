import type { Meta, StoryObj } from '@storybook/react'

import CommitList from './index'

const meta: Meta<typeof CommitList> = {
  title: 'Common/CommitList',
  component: CommitList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CommitList>

export const Default: Story = {
  args: {
    paginationData: {
      total: 10,
      currentPage: 2,
    },
    commits: [
      {
        commitInfo: {
          headURL: 'https://github.com/cocov-ci/web',
          avatarURL:
            'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
          headSHA: '62bad0cbadbeefc0c0f',
          commitMessage:
            'fix(rollout-restart): Ensure to keep watching rollout status',
          username: 'cocov-ci',
          timestamp: new Date(Date.parse('2022-11-22T21:25:31Z')),
          readonly: true,
        },
        coverage: 100,
        issues: 9999,
      },
      {
        commitInfo: {
          headURL: 'https://github.com/cocov-ci/web',
          avatarURL:
            'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
          headSHA: '62bad0cbadbeefc0c0f1',
          commitMessage:
            'fix(rollout-restart): Ensure to keep watching rollout status',
          username: 'cocov-ci',
          timestamp: new Date(Date.parse('2022-11-22T21:25:31Z')),
          readonly: true,
        },
        coverage: 100,
        issues: 9999,
      },
      {
        commitInfo: {
          headURL: 'https://github.com/cocov-ci/web',
          avatarURL:
            'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
          headSHA: '62bad0cbadbeefc0c0f2',
          commitMessage:
            'fix(rollout-restart): Ensure to keep watching rollout status',
          username: 'cocov-ci',
          timestamp: new Date(Date.parse('2022-11-22T21:25:31Z')),
          readonly: true,
        },
        coverage: 100,
        issues: 9999,
      },
    ],
  },
}
