import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import BackgroundCats from 'stories/BackgroundCats'
import { satoshi } from 'utils/fonts'

import Modal from './index'

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div
        className={satoshi.className}
        style={{
          position: 'relative',
          margin: '0',
          padding: '0',
          height: '100vh',
          width: '100vw',
        }}
      >
        <BackgroundCats />
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    visible: true,
    children: <p>hey...</p>,
  },
}
