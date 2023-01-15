import type { Meta, StoryObj } from '@storybook/react'

import Histogram from './index'

const meta: Meta<typeof Histogram> = {
  title: 'Common/Histogram',
  component: Histogram,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Histogram>

export const Default: Story = {
  args: {
    values: [
      'Zero',
      'Ten',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
      'A Hundred',
    ].map((i, idx) => ({
      value: idx * 10,
      label: i,
      href: '/',
    })),
  },
}
