import type { Meta, StoryObj } from '@storybook/react'

import TopBarActions from './index'

const meta: Meta<typeof TopBarActions> = {
  title: 'Repositories/TopBarActions',
  component: TopBarActions,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TopBarActions>

export const Default: Story = {
  args: {
    searchFieldLoading: false,
    searchFieldDisabled: false,
    onSearchChange: () => null,
  },
}

export const SearchFieldLoading: Story = {
  args: {
    searchFieldLoading: true,
    searchFieldDisabled: false,
    onSearchChange: () => null,
  },
}

export const SearchFieldDisabled: Story = {
  args: {
    searchFieldLoading: false,
    searchFieldDisabled: true,
    onSearchChange: () => null,
  },
}
