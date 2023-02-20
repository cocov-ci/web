import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import BackgroundCats from 'stories/BackgroundCats'
import { satoshi } from 'utils/fonts'

import BranchSwitcher from './index'

const meta: Meta<typeof BranchSwitcher> = {
  title: 'Common/BranchSwitcher',
  component: BranchSwitcher,
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

type Story = StoryObj<typeof BranchSwitcher>

export const Default: Story = {
  args: {
    visible: true,
  },
}
