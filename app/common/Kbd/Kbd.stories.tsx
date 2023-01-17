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

export const Light: Story = {
  args: { text: 'esc' },
}

export const Dark: Story = {
  args: { text: 'esc', variation: 'dark' },
}

export const LightMini: Story = {
  args: { text: 'esc', size: 'mini' },
}

export const DarkMini: Story = {
  args: { text: 'esc', variation: 'dark', size: 'mini' },
}
