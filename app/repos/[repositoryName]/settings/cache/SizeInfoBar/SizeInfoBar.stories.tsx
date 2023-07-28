import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import SizeInfoBar from './index'

const meta: Meta<typeof SizeInfoBar> = {
  title: 'Settings/Cache/SizeInfoBar',
  component: SizeInfoBar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SizeInfoBar>

export const Default: Story = {
  args: {
    loading: false,
    limit: 0,
    used: 1024 * 1024,
  },
}
