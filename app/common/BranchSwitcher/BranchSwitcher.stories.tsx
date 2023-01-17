import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { satoshi } from 'utils/fonts'

import BranchSwitcher from './index'

const BackgroundThingies = () => (
  <div
    style={{
      position: 'absolute',
      height: '100vh',
      width: '100vw',
      background:
        'url(data:image/png;base64,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)',
    }}
  />
)

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
        <BackgroundThingies />
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
    options: ['master', 'mastery', 'mastodon'],
  },
}
