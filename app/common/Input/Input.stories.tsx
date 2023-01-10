import type { Meta, StoryObj } from '@storybook/react'
import { LucideSearch } from 'lucide-react'

import Input from './index'

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    width: '200px',
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    type: 'text',
  },
}

export const WithPlaceholder: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email:',
    type: 'text',
    placeholder: 'paul.appleseed@example.com',
  },
}

export const WithLoading: Story = {
  args: {
    label: 'Name:',
    type: 'text',
    value: 'The name',
    loading: true,
  },
}

export const WithIcon: Story = {
  args: {
    type: 'text',
    placeholder: 'Type to Search...',
    loading: true,
    icon: LucideSearch,
  },
}

export const Errored: Story = {
  args: {
    type: 'text',
    errored: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Test:',
    type: 'text',
    disabled: true,
  },
}
