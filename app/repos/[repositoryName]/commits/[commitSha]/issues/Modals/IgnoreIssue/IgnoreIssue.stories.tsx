import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Modal from 'app/common/Modal'

import IgnoreIssue from './index'

const meta: Meta<typeof IgnoreIssue> = {
  title: 'Commits/[CommitSha]/Issues/Modals/IgnoreIssue',
  component: IgnoreIssue,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ height: '400px' }}>
        <Modal visible={true}>
          <Story />
        </Modal>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof IgnoreIssue>

export const Default: Story = {
  args: {
    onSuccess: () => null,
    mode: 'ephemeral',
    repositoryName: 'repo',
    commitSha: '123',
    id: 1,
  },
}

export const Permanent: Story = {
  args: {
    onSuccess: () => null,
    mode: 'permanent',
    repositoryName: 'repo',
    commitSha: '123',
    id: 1,
  },
}
