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
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    children: <>Button Label Here</>,
    style: 'secondary',
    disabled: false,
  },
}

export const Inactive: Story = {
  args: {
    children: <>Button Label Here</>,
    style: 'inactive',
    disabled: false,
  },
}

export const Danger: Story = {
  args: {
    children: <>Button Label Here</>,
    style: 'danger',
    disabled: false,
  },
}

export const Mini: Story = {
  args: {
    children: <>Button Label Here</>,
    style: 'mini',
    disabled: false,
  },
}
