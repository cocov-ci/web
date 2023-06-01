import type { Meta, StoryObj } from '@storybook/react'

import COMPONENTNAME from './index'

const meta: Meta<typeof COMPONENTNAME> = {
  title: 'Common/COMPONENTNAME',
  component: COMPONENTNAME,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof COMPONENTNAME>

export const Default: Story = {
  args: {},
}
