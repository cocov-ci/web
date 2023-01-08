import type { Meta, StoryObj } from '@storybook/react'
import { Ghost } from 'lucide-react'

import Alert from './index'

const meta: Meta<typeof Alert> = {
  title: 'Common/Alert',
  component: Alert,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    title: 'Title here...',
    description: 'Description here...',
    icon: Ghost,
  },
}

export const Title: Story = {
  args: {
    title: 'Title here...',
  },
}

export const Description: Story = {
  args: {
    description: 'Description here...',
  },
}

export const Icon: Story = {
  args: {
    icon: Ghost,
  },
}
