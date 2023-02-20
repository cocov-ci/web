import type { Meta, StoryObj } from '@storybook/react'

import Sidebar from './index'

const meta: Meta<typeof Sidebar> = {
  title: 'Settings/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    loading: false,
    data: {
      token: 'crt_d3e4ad8b6735a2fa04f546f68b51df73039463df16',
      permissions: {
        can_delete: true,
        can_regen_token: true,
        can_sync_github: true,
      },
    },
  },
}
