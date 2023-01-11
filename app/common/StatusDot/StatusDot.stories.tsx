import type { Meta, StoryObj } from '@storybook/react'

import StatusDot from './index'

const meta: Meta<typeof StatusDot> = {
  title: 'Common/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof StatusDot>

export const Default: Story = {
  args: {
    color: 'green',
  },
}
