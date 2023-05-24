import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Modal from 'app/common/Modal'

import AddNewToken from './index'

const meta: Meta<typeof AddNewToken> = {
  title: 'Adminland/ServiceTokens/Modals/AddNewToken',
  component: AddNewToken,
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

type Story = StoryObj<typeof AddNewToken>

export const Default: Story = {
  args: {
    onSuccess: () => null,
  },
}
