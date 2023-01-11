import type { Meta, StoryObj } from '@storybook/react'

import Avatar from './index'

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    avatarURL: 'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
    size: '64px',
  },
}
