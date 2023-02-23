import type { Meta, StoryObj } from '@storybook/react'

import DeleteSecret from './index'

const meta: Meta<typeof DeleteSecret> = {
  title: 'Settings/Secrets/Modals/DeleteSecret',
  component: DeleteSecret,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DeleteSecret>

export const Default: Story = {
  args: {
    secretId: 1,
  },
}
