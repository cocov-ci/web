import type { Meta, StoryObj } from '@storybook/react'

import SizeFormatter from './index'

const meta: Meta<typeof SizeFormatter> = {
  title: 'Adminland/repositories/Item',
  component: SizeFormatter,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SizeFormatter>

export const Default: Story = {
  args: {
    size: 1024 * 1024 * 1024, // 1MB
  },
}
