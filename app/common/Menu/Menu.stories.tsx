import type { Meta, StoryObj } from '@storybook/react'
import {
  LucideLogOut,
  LucideRefreshCw,
  LucideTrash2,
  LucideUserX,
} from 'lucide-react'
import React from 'react'

import BackgroundCats from 'stories/BackgroundCats'
import { satoshi } from 'utils/fonts'

import { MenuContainer, MenuItem } from './index'

const meta: Meta<typeof MenuContainer> = {
  title: 'Common/Menu',
  component: MenuContainer,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div
        className={satoshi.className}
        style={{ position: 'relative', margin: '0', padding: '0' }}
      >
        <BackgroundCats />
        <div style={{ margin: '0', padding: '100px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof MenuContainer>

export const Default: Story = {
  args: {
    visible: true,
    children: (
      <>
        <MenuItem href="." icon={LucideUserX} label="Revoke Admin" />
        <MenuItem
          icon={LucideRefreshCw}
          label="Sync Permissions"
          onClick={() => alert('clicked')}
        />
        <MenuItem icon={LucideLogOut} label="Force Logout" />
        <MenuItem danger icon={LucideTrash2} label="Delete..." />
      </>
    ),
  },
}
