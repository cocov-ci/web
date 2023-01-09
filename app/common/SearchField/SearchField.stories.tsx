import type { Meta, StoryObj } from '@storybook/react'

import SearchField from './index'

const meta: Meta<typeof SearchField> = {
  title: 'Common/SearchField',
  component: SearchField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SearchField>

export const Default: Story = {
  args: {
    className: '',
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
