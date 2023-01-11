import type { Meta, StoryObj } from '@storybook/react'

import AccessoryButton, { CopyIcon, HelpIcon } from './index'

const meta: Meta<typeof AccessoryButton> = {
  title: 'Common/AccessoryButton',
  component: AccessoryButton,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AccessoryButton>

export const CopyButton: Story = {
  args: {
    kind: 'squared',
    children: CopyIcon,
  },
}

export const HelpButton: Story = {
  args: {
    kind: 'round',
    children: HelpIcon,
  },
}
