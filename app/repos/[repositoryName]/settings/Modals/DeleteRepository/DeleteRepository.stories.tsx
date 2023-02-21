import type { Meta, StoryObj } from '@storybook/react'

import DeleteRepository from './index'

const meta: Meta<typeof DeleteRepository> = {
  title: 'Settings/Modals/DeleteRepository',
  component: DeleteRepository,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DeleteRepository>

export const Default: Story = {
  args: {},
}
