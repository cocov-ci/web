import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Modal from 'app/common/Modal'

import NewTokenSuccess from './index'

const meta: Meta<typeof NewTokenSuccess> = {
  title: 'Adminland/ServiceTokens/Modals/NewTokenSuccess',
  component: NewTokenSuccess,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ height: '400px' }}>
        <Modal visible={true}>
          <Story />
        </Modal>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof NewTokenSuccess>

export const Default: Story = {
  args: {
    token: '7316253765127365712',
  },
}
