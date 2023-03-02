import type { Meta, StoryObj } from '@storybook/react'

import Modal from 'app/common/Modal'

import DeleteRepository from './index'

const meta: Meta<typeof DeleteRepository> = {
  title: 'Settings/Modals/DeleteRepository',
  component: args => (
    <div style={{ height: '500px' }}>
      <Modal visible={true}>
        <DeleteRepository {...args} />
      </Modal>
    </div>
  ),
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DeleteRepository>

export const Default: Story = {
  args: {},
}
