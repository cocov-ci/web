import type { Meta, StoryObj } from '@storybook/react'
import { Trash } from 'lucide-react'

import AccessoryButton from '../AccessoryButton'

import Secret from './index'

const meta: Meta<typeof Secret> = {
  title: 'Common/Secret',
  component: Secret,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Secret>

export const Simple: Story = {
  args: {
    name: 'GIT_CONFIG',
  },
}

const threeMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 3))
const twoHoursAgo = new Date(new Date().setHours(new Date().getHours() - 2))

export const WithMeta: Story = {
  args: {
    name: 'GIT_CONFIG',
    metadata: {
      createdAt: threeMonthsAgo,
      createdBy: 'Cocov',
      lastUsed: twoHoursAgo,
    },
  },
}

export const WithMetaNeverUsed: Story = {
  args: {
    name: 'GIT_CONFIG',
    metadata: {
      createdAt: threeMonthsAgo,
      createdBy: 'Cocov',
    },
  },
}

export const WithAccessory: Story = {
  args: {
    name: 'GIT_CONFIG',
    children: (
      <AccessoryButton kind="squared">
        <Trash width="18px" />
      </AccessoryButton>
    ),
    metadata: {
      createdAt: threeMonthsAgo,
      createdBy: 'Cocov',
      lastUsed: twoHoursAgo,
    },
  },
}

export const WithDivider: Story = {
  args: {
    name: 'GIT_CONFIG',
    children: (
      <AccessoryButton kind="squared">
        <Trash width="18px" />
      </AccessoryButton>
    ),
    metadata: {
      createdAt: threeMonthsAgo,
      createdBy: 'Cocov',
      lastUsed: twoHoursAgo,
    },
    showDivider: true,
  },
}
