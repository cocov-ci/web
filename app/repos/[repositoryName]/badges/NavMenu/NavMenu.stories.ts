import type { Meta, StoryObj } from '@storybook/react'

import NavMenu from './index'

const meta: Meta<typeof NavMenu> = {
  title: 'Badges/NavMenu',
  component: NavMenu,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NavMenu>

export const Default: Story = {
  args: {},
}
