import type { Meta, StoryObj } from '@storybook/react'

import RemoteRepository from './index'

const meta: Meta<typeof RemoteRepository> = {
  title: 'Common/RemoteRepository',
  component: RemoteRepository,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RemoteRepository>

export const Default: Story = {
  args: {
    name: 'api',
    createdAt: new Date('2023-02-20T20:21:22Z'),
    updatedAt: new Date('2023-02-20T21:21:22Z'),
    status: 'absent',
  },
}

export const Pending: Story = {
  args: {
    name: 'api',
    createdAt: new Date('2023-02-20T20:21:22Z'),
    updatedAt: new Date('2023-02-20T21:21:22Z'),
    status: 'pending',
  },
}

export const Present: Story = {
  args: {
    name: 'api',
    createdAt: new Date('2023-02-20T20:21:22Z'),
    updatedAt: new Date('2023-02-20T21:21:22Z'),
    status: 'present',
  },
}
