import type { Meta, StoryObj } from '@storybook/react'

import RefreshList from './index'

const meta: Meta<typeof RefreshList> = {
  title: 'Repositories/New/RefreshList',
  component: RefreshList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RefreshList>

export const Default: Story = {
  args: {
    loading: false,
    date: '2022-11-22T21:06:17.000Z',
    onRefresh: () => null,
  },
}
