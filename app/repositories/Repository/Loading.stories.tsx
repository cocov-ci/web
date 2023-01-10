import type { Meta, StoryObj } from '@storybook/react'

import LoadingRepository from './Loading'

const meta: Meta<typeof LoadingRepository> = {
  title: 'Repositories/LoadingRepository',
  component: LoadingRepository,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LoadingRepository>

export const Default: Story = {}
