import type { Meta, StoryObj } from '@storybook/react'

import Empty from './index'

const meta: Meta<typeof Empty> = {
  title: 'Branches/[BranchName]/TopIssues/Empty',
  component: Empty,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Empty>

export const Default: Story = {
  args: {},
}
