import type { Meta, StoryObj } from '@storybook/react'

import Loading from './index'

const meta: Meta<typeof Loading> = {
  title: 'Common/FileList/Loading',
  component: Loading,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Loading>

export const Default: Story = {
  args: {},
}
