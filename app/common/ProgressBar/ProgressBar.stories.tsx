import type { Meta, StoryObj } from '@storybook/react'

import ProgressBar from './index'

const meta: Meta<typeof ProgressBar> = {
  title: 'Common/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    width: '400px',
    value: 50,
  },
}
