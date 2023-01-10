import type { Meta, StoryObj } from '@storybook/react'

import ListItem from './index'

const meta: Meta<typeof ListItem> = {
  title: 'Common/ListItem',
  component: ListItem,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ListItem>

export const Default: Story = {
  args: {
    title:
      'Titlefsdkjfjksdfljskdlkfjlsdjflksjdlfkjsldkfjlskdjflkjsdlkfjsldkfjlkdshere',
    description: 'Description here...',
    stats: {
      issues: {
        data: new Array(31).fill(0).map(() => Math.ceil(Math.random() * 10000)),
        value: Math.ceil(Math.random() * 1000),
      },
      coverage: {
        data: new Array(31).fill(0).map(() => Math.ceil(Math.random() * 10000)),
        value: Math.ceil(Math.random() * 1000),
      },
    },
  },
}
