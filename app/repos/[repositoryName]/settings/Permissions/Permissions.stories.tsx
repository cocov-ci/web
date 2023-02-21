import type { Meta, StoryObj } from '@storybook/react'

import Permissions from './index'

const meta: Meta<typeof Permissions> = {
  title: 'Settings/Permissions',
  component: Permissions,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Permissions>

export const Default: Story = {
  args: {
    loading: false,
    data: {
      secrets_count: 3,
      repository: {
        id: 1,
        name: 'api',
        description: "Cocov's API",
        token: '5fc461c799c7321ec25524d30f07b1d317f69ec289',
        default_branch: 'master',
        coverage: 96,
        issues: 26,
      },
      permissions: {
        can_delete: true,
        can_regen_token: true,
        can_sync_github: true,
      },
    },
  },
}
