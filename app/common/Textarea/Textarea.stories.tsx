import type { Meta, StoryObj } from '@storybook/react'
import { LucideSearch } from 'lucide-react'

import Textarea from './index'

const meta: Meta<typeof Textarea> = {
  title: 'Common/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    width: '200px',
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

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

export const DefaultDark: Story = {
  args: {
    variation: 'dark',
    type: 'text',
  },
}

export const WithPlaceholderDark: Story = {
  args: {
    variation: 'dark',
    type: 'text',
    placeholder: 'Placeholder',
  },
}

export const WithLabelDark: Story = {
  args: {
    variation: 'dark',
    label: 'Email:',
    type: 'text',
    placeholder: 'paul.appleseed@example.com',
  },
}

export const WithLoadingDark: Story = {
  args: {
    variation: 'dark',
    label: 'Name:',
    type: 'text',
    value: 'The name',
    loading: true,
  },
}

export const WithIconDark: Story = {
  args: {
    variation: 'dark',
    type: 'text',
    placeholder: 'Type to Search...',
    loading: true,
    icon: LucideSearch,
  },
}

export const ErroredDark: Story = {
  args: {
    variation: 'dark',
    type: 'text',
    errored: true,
  },
}

export const DisabledDark: Story = {
  args: {
    variation: 'dark',
    label: 'Test:',
    type: 'text',
    disabled: true,
  },
}
