import type { Meta, StoryObj } from '@storybook/react'

import RelativeTime from './index'

const meta: Meta<typeof RelativeTime> = {
  title: 'Common/RelativeTime',
  component: RelativeTime,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RelativeTime>

export const Default: Story = {
  args: {
    timestamp: new Date(Date.parse('2022-11-22T21:25:31Z')),
  },
}
