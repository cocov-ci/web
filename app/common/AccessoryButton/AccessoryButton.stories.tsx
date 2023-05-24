import type { Meta, StoryObj } from '@storybook/react'
import { MoreVertical } from 'lucide-react'

import AccessoryButton, { CopyIcon, HelpIcon } from './index'

const meta: Meta<typeof AccessoryButton> = {
  title: 'Common/AccessoryButton',
  component: AccessoryButton,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AccessoryButton>

export const EllipsisButtonMuted: Story = {
  args: {
    kind: 'squared-muted',
    children: <MoreVertical />,
  },
}

export const DisabledButton: Story = {
  args: {
    kind: 'squared',
    children: <MoreVertical disabled />,
  },
}

export const CopyButton: Story = {
  args: {
    kind: 'squared',
    children: <CopyIcon />,
  },
}

export const HelpButton: Story = {
  args: {
    kind: 'round',
    children: <HelpIcon />,
  },
}

export const HelpButtonLink: Story = {
  args: {
    kind: 'round',
    href: '/',
    hrefTarget: '_blank',
    children: <HelpIcon />,
  },
}
