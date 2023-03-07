import type { Meta, StoryObj } from '@storybook/react'

import ListItems from './index'

const meta: Meta<typeof ListItems> = {
  title: 'Repositories/New/ListItems',
  component: ListItems,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ListItems>

export const Default: Story = {
  args: {
    data: [
      {
        name: '.github',
        description: 'Community health files for the @cocov-ci organization',
        created_at: '2023-01-03T19:43:48.000Z',
        pushed_at: '2023-01-03T20:12:13.000Z',
        status: 'absent',
      },
      {
        name: 'api',
        description: "Cocov's API.",
        created_at: '2022-11-22T21:06:17.000Z',
        pushed_at: '2023-03-06T01:09:42.000Z',
        status: 'present',
      },
      {
        name: 'badger',
        description: "Cocov's Badge Generator Service",
        created_at: '2023-01-03T19:20:17.000Z',
        pushed_at: '2023-01-03T19:20:33.000Z',
        status: 'present',
      },
      {
        name: 'brakeman',
        description: 'Brakeman Plugin for Cocov',
        created_at: '2022-12-14T22:35:46.000Z',
        pushed_at: '2023-01-07T21:33:21.000Z',
        status: 'absent',
      },
    ],
  },
}
