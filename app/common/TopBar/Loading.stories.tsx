import type { Meta, StoryObj } from '@storybook/react'

import TopBarLoading from './Loading'

const meta: Meta<typeof TopBarLoading> = {
  title: 'Common/TopBar/Loading',
  component: TopBarLoading,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TopBarLoading>

export const Loading: Story = {}
