import type { Meta, StoryObj } from '@storybook/react'

import StatusDisplay from './index'

const meta: Meta<typeof StatusDisplay> = {
  title: 'Common/StatusDisplay',
  component: StatusDisplay,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof StatusDisplay>

export const Default: Story = {
  args: {
    coverage: {
      status: 'processing',
      messageBold: true,
      message: 'Processing...',
    },
    checks: {
      status: 'processing',
      messageBold: true,
      message: 'Processing...',
    },
  },
}

export const CoverageWaitingChecksProcessing: Story = {
  args: {
    coverage: {
      status: 'waiting',
      message: 'Waiting Upload...',
    },
    checks: {
      status: 'processing',
      messageBold: true,
      message: 'Processing...',
    },
  },
}

export const CoverageProcessedChecksPassing: Story = {
  args: {
    coverage: {
      status: 'processed',
      message: '96.5%',
      detailsHref: '/',
    },
    checks: {
      status: 'processed',
      message: 'Passing. No issues detected.',
    },
  },
}

export const CoverageFailedChecksPassing: Story = {
  args: {
    coverage: {
      status: 'failed',
      messageBold: true,
      message: '89.4% (at least 90% is required)',
      detailsHref: '/',
    },
    checks: {
      status: 'processed',
      message: 'Passing. No issues detected.',
    },
  },
}

export const CoverageErroredChecksPassing: Story = {
  args: {
    coverage: {
      status: 'failed',
      messageBold: true,
      message: 'Error processing.',
      detailsHref: '/',
    },
    checks: {
      status: 'processed',
      message: 'Passing. No issues detected.',
    },
  },
}

export const CoveragePassingChecksFailed: Story = {
  args: {
    coverage: {
      status: 'processed',
      message: '95%',
      detailsHref: '/',
    },
    checks: {
      status: 'failed',
      message: '5 issues',
      messageBold: true,
      detailsHref: '/',
    },
  },
}

export const CoveragePassingChecksErrored: Story = {
  args: {
    coverage: {
      status: 'processed',
      message: '95%',
      detailsHref: '/',
    },
    checks: {
      status: 'failed',
      message: 'Failed running.',
      messageBold: true,
      detailsHref: '/',
    },
  },
}

export const CoveragePassingChecksNotConfigured: Story = {
  args: {
    coverage: {
      status: 'processed',
      message: '95%',
      detailsHref: '/',
    },
    checks: {
      status: 'waiting',
      message: 'Not Configured',
      messageBold: true,
      detailsKind: 'help',
      detailsHref: '/',
    },
  },
}
