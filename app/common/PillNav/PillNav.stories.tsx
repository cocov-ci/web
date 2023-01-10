import type { Meta, StoryObj } from '@storybook/react'

import Button from '../Button'

import PillNav from './index'

const meta: Meta<typeof PillNav> = {
  title: 'Common/PillNav',
  component: PillNav,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PillNav>

export const Default: Story = {
  args: {
    children: (
      <>
        <Button style="secondary">Branches</Button>
        <Button style="inactive">Commits</Button>
        <Button style="inactive">Badges</Button>
        <Button style="inactive">Settings</Button>
      </>
    ),
  },
}
