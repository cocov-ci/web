import type { Meta, StoryObj } from '@storybook/react'

import Kbd from './index'

const meta: Meta<typeof Kbd> = {
  title: 'Common/Kbd',
  component: Kbd,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  args: { text: 'esc' },
}
