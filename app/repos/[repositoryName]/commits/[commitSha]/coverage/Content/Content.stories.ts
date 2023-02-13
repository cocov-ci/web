import type { Meta, StoryObj } from '@storybook/react'

import { CoverageResponseProps } from 'types/Coverage'

import Content from './index'

const meta: Meta<typeof Content> = {
  title: 'Commits/[CommitSha]/Coverage/Content',
  component: Content,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Content>

const data = {
  repository: {
    id: 1,
    name: 'api',
    description: "Cocov's API",
    token: '5fc461c799c7321ec25524d30f07b1d317f69ec289',
    default_branch: 'master',
    coverage: 96,
    issues: 26,
  },
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
  status: 'processed',
  files: [
    {
      id: 5393,
      file: 'app/services/manifest_service.rb',
      percent_covered: 16,
    },
    {
      id: 5360,
      file: 'app/lib/cocov/schema_validator/unsatisfied_array_length_error.rb',
      percent_covered: 50,
    },
    {
      id: 5329,
      file: 'app/helpers/v1/v1_helper.rb',
      percent_covered: 66,
    },
  ],
} as CoverageResponseProps

export const Default: Story = {
  args: {
    data: data,
    commitSha: 'aae70b022edb4b80dfdeab0fea40f03d5e3c7350',
    repositoryName: 'api',
    isFilePage: false,
  },
}
