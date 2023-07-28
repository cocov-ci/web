import type { Meta, StoryObj } from '@storybook/react'

import UsagePopover from './index'

const meta: Meta<typeof UsagePopover> = {
  title: 'Settings/Cache/UsagePopover',
  component: UsagePopover,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof UsagePopover>

export const Default: Story = {
  args: {},
}
