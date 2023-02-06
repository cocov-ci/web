import type { Meta, StoryObj } from '@storybook/react'

import Sidebar from './index'

const meta: Meta<typeof Sidebar> = {
  title: 'Common/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    items: [
      { id: 0, name: 'All Categories', counter: 920 },
      { id: 1, name: 'Complexity', counter: 0 },
      { id: 2, name: 'Convention', counter: 822 },
      { id: 3, name: 'Duplication', counter: 98 },
      { id: 4, name: 'Performance', counter: 0 },
      { id: 5, name: 'Potential Bug', counter: 98 },
      { id: 6, name: 'Security', counter: 0 },
      { id: 7, name: 'Style', counter: 98 },
      { id: 8, name: 'No counter' },
    ],
    defaultSelectedId: 0,
    width: '225px',
  },
}
