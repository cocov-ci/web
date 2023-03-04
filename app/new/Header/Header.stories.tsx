import type { Meta, StoryObj } from '@storybook/react'

import Header from './index'

const meta: Meta<typeof Header> = {
  title: 'Repositories/New/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {},
}
