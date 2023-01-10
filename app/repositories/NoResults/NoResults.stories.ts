import type { Meta, StoryObj } from '@storybook/react'

import NoResults from './index'

const meta: Meta<typeof NoResults> = {
  title: 'Repositories/NoResults',
  component: NoResults,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NoResults>

export const Default: Story = {
  args: {},
}
