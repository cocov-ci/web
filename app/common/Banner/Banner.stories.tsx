import type { Meta, StoryObj } from '@storybook/react'
import {
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
  Cherry,
  Info,
} from 'lucide-react'

import Banner, { BannerProps } from './index'

const meta: Meta<typeof Banner> = {
  title: 'Common/Banner',
  component: Banner,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Banner>

const defaultArgs: BannerProps = {
  icon: Info,
  variation: 'info',
  children: (
    <>
      <strong>Notice:</strong> At solmen va esser necessi far uniform
      grammatica, pronunciation e plu commun paroles.
    </>
  ),
}

export const Default: Story = {
  args: { ...defaultArgs },
}

export const Success: Story = {
  args: { ...defaultArgs, variation: 'success', icon: CheckCircle },
}

export const Warning: Story = {
  args: { ...defaultArgs, variation: 'warning', icon: AlertTriangle },
}

export const Neutral: Story = {
  args: { ...defaultArgs, variation: 'neutral', icon: Cherry },
}
