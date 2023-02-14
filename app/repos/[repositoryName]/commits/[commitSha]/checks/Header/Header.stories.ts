import type { Meta, StoryObj } from '@storybook/react'

import Header, { HeaderProps } from './index'

const meta: Meta<typeof Header> = {
  title: 'Commits/[CommitSha]/Checks/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Header>

const data = {
  commit: {
    id: 231,
    author_email: 'hey@vito.io',
    author_name: 'Victor Gama',
    checks_status: 'processed',
    coverage_status: 'processed',
    sha: 'aae70b022edb4b80dfdeab0fea40f03d5e3c7350',
    coverage_percent: null,
    issues_count: 26,
    condensed_status: 'green',
    minimum_coverage: 90,
    message: 'fix(ProcessCoverageJob): Update commit coverage_percent',
    created_at: '2023-01-27T00:05:59.539Z',
    org_name: 'cocov-ci',
    user: { name: 'heyvito', avatar: 'https://github.com/heyvito.png' },
  },
  repositoryName: 'api',
} as HeaderProps

export const Default: Story = {
  args: data,
}
