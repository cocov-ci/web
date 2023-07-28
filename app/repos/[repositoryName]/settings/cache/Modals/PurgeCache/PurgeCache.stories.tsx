import type { Meta, StoryObj } from '@storybook/react'

import Modal from 'app/common/Modal'

import PurgeCache from './index'

const meta: Meta<typeof PurgeCache> = {
  title: 'Settings/Cache/Modals/PurgeCache',
  component: PurgeCache,
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

type Story = StoryObj<typeof PurgeCache>

export const Default: Story = {
  args: {
    onSuccess: () => null,
    onFailure: () => null,
  },
}
