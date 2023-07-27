import type { Meta, StoryObj } from '@storybook/react'

import { LoadingItem } from './index'

const meta: Meta<typeof LoadingItem> = {
  title: 'Adminland/users/Loading Item',
  component: LoadingItem,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LoadingItem>

export const Default: Story = {
  args: {},
}
