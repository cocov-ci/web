import type { Meta, StoryObj } from '@storybook/react'

import Button from './index'

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: <>Button Label Here</>,
    style: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: <>Button Label Here</>,
    style: 'secondary',
  },
}

export const Inactive: Story = {
  args: {
    children: <>Button Label Here</>,
    style: 'inactive',
  },
}

export const Danger: Story = {
  args: {
    children: <>Button Label Here</>,
    style: 'danger',
  },
}

export const Mini: Story = {
  args: {
    children: <>Button Label Here</>,
    style: 'mini',
  },
}
