import type { Meta, StoryObj } from '@storybook/react'

import TopBar from './index'

const meta: Meta<typeof TopBar> = {
  title: 'Common/TopBar',
  component: TopBar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TopBar>

export const Default: Story = {
  args: {
    title: 'Title here...',
    description: 'Description here...',
  },
}
