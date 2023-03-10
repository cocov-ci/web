import type { Meta, StoryObj } from '@storybook/react'

import { AuthContext } from 'context/AuthContext'

import Header from './index'

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {},
}

export const Authenticated: Story = {
  args: {},
}

Authenticated.decorators = [
  Story => (
    <AuthContext.Provider
      value={{
        login: () => null,
        logout: () => null,
        loading: false,
        isAuthenticated: true,
        user: {
          isAdmin: true,
          name: 'John Doe',
        },
      }}
    >
      <Story />
    </AuthContext.Provider>
  ),
]
