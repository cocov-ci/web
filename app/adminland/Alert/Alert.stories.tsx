import type { Meta, StoryObj } from '@storybook/react'

import Alert from './index'

const meta: Meta<typeof Alert> = {
  title: 'Adminland/ServiceTokens/Alert',
  component: Alert,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {},
}
