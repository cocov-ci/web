import type { Meta, StoryObj } from '@storybook/react'

import Modal from 'app/common/Modal'

import DeleteSecret from './index'

const meta: Meta<typeof DeleteSecret> = {
  title: 'Settings/Secrets/Modals/Delete',
  component: DeleteSecret,
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

type Story = StoryObj<typeof DeleteSecret>

export const Default: Story = {
  args: {
    onSuccess: () => null,
    onFailure: () => null,
    token: {
      created_at: '2023-02-26T22:57:52Z',
      id: 4,
      last_used_at: '2023-02-27T21:33:11Z',
      description: 'my token',
      created_by: 'Robson Coelho',
    },
  },
}
