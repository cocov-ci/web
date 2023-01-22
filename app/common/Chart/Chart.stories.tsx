import type { Meta, StoryObj } from '@storybook/react'

import { makeFakePoints } from './Utils'

import Chart from './index'

const meta: Meta<typeof Chart> = {
  title: 'Common/Chart',
  component: args => <Chart {...args} />,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Chart>

export const Default: Story = {
  args: {
    data: makeFakePoints(),
    width: 182,
    height: 80,
  },
}

export const TypeCoverage: Story = {
  args: {
    type: 'coverage',
    data: makeFakePoints(),
    width: 400,
    height: 200,
  },
}
