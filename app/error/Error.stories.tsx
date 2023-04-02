import type { Meta, StoryObj } from '@storybook/react'

import Error from './index'

const meta: Meta<typeof Error> = {
  title: 'Error/Error',
  component: Error,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Error>

export const Default: Story = {
  args: {},
}
