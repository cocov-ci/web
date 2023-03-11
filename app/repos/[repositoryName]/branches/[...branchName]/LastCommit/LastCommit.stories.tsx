import type { Meta, StoryObj } from '@storybook/react'

import LastCommit from './index'

const meta: Meta<typeof LastCommit> = {
  title: 'Branches/[BranchName]/LastCommit',
  component: LastCommit,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LastCommit>

export const Default: Story = {
  args: {
    repositoryName: 'api',
    head: {
      id: 1,
      author_email: 'john@email.com',
      author_name: 'John Doe',
      checks_status: 'in_progress',
      coverage_status: 'in_progress',
      sha: '62bad0cbadbeefc0c0f',
      coverage_percent: null,
      issues_count: 10,
      condensed_status: '',
      minimum_coverage: null,
      message: 'fix(rollout-restart): Ensure to keep watching rollout status',
      created_at: '2022-11-22T21:25:31Z',
      org_name: 'cocov',
    },
  },
}
