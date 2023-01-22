import type { Meta, StoryObj } from '@storybook/react'

import SummarySelector from './index'

const meta: Meta<typeof SummarySelector> = {
  title: 'Common/SummarySelector',
  component: SummarySelector,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SummarySelector>

export const Default: Story = {
  args: {
    branchName: 'master',
  },
}

export const GutterBottom: Story = {
  args: {
    branchName: 'master',
    gutterBottom: true,
  },
}
