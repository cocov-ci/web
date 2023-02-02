import type { Meta, StoryObj } from '@storybook/react'

import BadgeType from './index'

const meta: Meta<typeof BadgeType> = {
  title: 'Badges/Content/BadgeType',
  component: BadgeType,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof BadgeType>

export const Default: Story = {
  args: {
    title: 'Coverage Badge',
    source:
      '<a href="http://localhost:3000/repos/api"><img src="http://localhost:5000/api/coverage" /></a>\n',
    badge:
      '<a href="http://localhost:3000/repos/api"><img src="http://localhost:5000/api/coverage" /></a>\n',
  },
}
