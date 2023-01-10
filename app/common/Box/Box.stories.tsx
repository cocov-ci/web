import type { Meta, StoryObj } from '@storybook/react'

import Box from './index'

const meta: Meta<typeof Box> = {
  title: 'Common/Box',
  component: Box,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Box>

export const Default: Story = {
  args: {
    children: <p>hey</p>,
  },
}
