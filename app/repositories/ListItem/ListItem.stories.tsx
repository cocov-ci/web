import type { Meta, StoryObj } from '@storybook/react'

import ListItem from './index'

const meta: Meta<typeof ListItem> = {
  title: 'Repositories/ListItem',
  component: ListItem,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ListItem>

export const Default: Story = {
  args: {
    id: 1,
    name: 'jps',
    description: 'Josie Platform Server',
  },
}
