import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Modal from 'app/common/Modal'

import NewSecret from './index'

const meta: Meta<typeof NewSecret> = {
  title: 'Settings/Secrets/Modals/New',
  component: NewSecret,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <Modal visible={true}>
        <Story />
      </Modal>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof NewSecret>

export const Default: Story = {
  args: {
    onSuccess: () => null,
  },
}
