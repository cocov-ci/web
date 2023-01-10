import type { Meta, StoryObj } from '@storybook/react'

import Header from './index'

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,
  tags: ['autodocs'],
}

// TODO: MISSING EXAMPLE WITH USER MENU
// IT'S NOT POSSIBLE FOR NOW BECAUSE I STILL NEED TO FIGURE OUT HOW TO MOCK THE REACT.CONTEXT

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {},
}
