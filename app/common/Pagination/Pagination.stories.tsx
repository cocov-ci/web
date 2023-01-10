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
