import type { Meta, StoryObj } from '@storybook/react'

import Item from './index'

const meta: Meta<typeof Item> = {
  title: 'Adminland/users/Item',
  component: Item,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Item>

export const Default: Story = {
  args: {
    item: {
      user: {
        admin: false,
        id: 1,
        avatar_url: 'https://github.com/heyvito.png',
        login: 'heyvito',
      },
      permissions: {
        user: 10,
        admin: 20,
        maintainer: 30,
      },
    },
  },
}
