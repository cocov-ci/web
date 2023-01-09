import type { Meta, StoryObj } from '@storybook/react'
import { LucideLoader } from 'lucide-react'

import Loading from './index'

const meta: Meta<typeof Loading> = {
  title: 'Common/Loading',
  component: Loading,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Loading>

export const Default: Story = {
  args: {
    className: '',
    width: '100px',
    height: '100px',
    count: 1,
    type: 'spinner',
    alignment: 'left',
    size: 18,
    spinnerIcon: LucideLoader,
  },
}

export const Skeleton: Story = {
  args: {
    className: '',
    width: '100px',
    height: '100px',
    count: 1,
    type: 'skeleton',
    alignment: 'left',
    size: 18,
    spinnerIcon: LucideLoader,
  },
}
