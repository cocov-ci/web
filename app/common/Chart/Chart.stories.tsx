import type { Meta, StoryObj } from '@storybook/react'

import { makeFakePoints } from './Utils'

import Chart from './index'

const meta: Meta<typeof Chart> = {
  title: 'Common/Chart',
  component: args => (
    <div style={{ marginTop: '30px' }}>
      <Chart {...args} />
    </div>
  ),
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Chart>

export const Default: Story = {
  args: {
    data: makeFakePoints(),
    width: 400,
    height: 150,
  },
}

export const type: Story = {
  args: {
    data: makeFakePoints(),
    type: 'coverage',
    width: 400,
    height: 150,
  },
}

export const FullChart: Story = {
  args: {
    data: makeFakePoints(),
    fullChart: true,
    width: 400,
    height: 150,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    fullChart: true,
    width: 400,
    height: 150,
  },
}
