import type { Meta, StoryObj } from '@storybook/react'

import NewSecret from './index'

const meta: Meta<typeof NewSecret> = {
  title: 'Settings/Secrets/Modals/NewSecret',
  component: NewSecret,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NewSecret>

export const Default: Story = {
  args: {},
}
