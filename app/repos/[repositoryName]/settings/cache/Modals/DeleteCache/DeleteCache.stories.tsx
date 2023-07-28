import type { Meta, StoryObj } from '@storybook/react'

import Modal from 'app/common/Modal'

import DeleteCache from './index'

const meta: Meta<typeof DeleteCache> = {
  title: 'Settings/Cache/Modals/DeleteCache',
  component: DeleteCache,
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

type Story = StoryObj<typeof DeleteCache>

export const Default: Story = {
  args: {
    onSuccess: () => null,
    onFailure: () => null,
    id: 1,
    name: 'go.mod+go.sum.zstd',
  },
}
