import type { Meta, StoryObj } from '@storybook/react'

import { makeFakePoints } from './Utils'

import Stats from './index'

const meta: Meta<typeof Stats> = {
  title: 'Common/Stats',
  component: Stats,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Stats>

export const Coverage: Story = {
  args: {
    type: 'coverage',
    data: {
      data: makeFakePoints(),
      value: Math.ceil(Math.random() * 100),
    },
  },
}

export const Issues: Story = {
  args: {
    type: 'issues',
    data: {
      data: makeFakePoints(),
      value: Math.ceil(Math.random() * 10000),
    },
  },
}
