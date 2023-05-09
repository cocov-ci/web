import type { Meta, StoryObj } from '@storybook/react'

import Pagination from './index'

const meta: Meta<typeof Pagination> = {
  title: 'Common/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    total: 10,
    currentPage: 1,
  },
}

export const Empty: Story = {
  args: {
    total: 0,
    currentPage: 1,
  },
}

export const LargeBegin: Story = {
  args: {
    total: 44,
    currentPage: 1,
  },
}

export const LargeMiddle: Story = {
  args: {
    total: 44,
    currentPage: 22,
  },
}

export const LargeEnd: Story = {
  args: {
    total: 44,
    currentPage: 44,
  },
}
