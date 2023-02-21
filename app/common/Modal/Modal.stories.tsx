import type { Meta, StoryObj } from '@storybook/react'

import Modal from './index'

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: args => (
    <div style={{ height: '300px' }}>
      <Modal {...args} />
    </div>
  ),
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    children: <p>hey...</p>,
  },
}
