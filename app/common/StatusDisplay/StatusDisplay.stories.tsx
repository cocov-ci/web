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
      statusColor: 'yellow',
      messageBold: true,
      message: 'Processing...',
    },
    checks: {
      statusColor: 'yellow',
      messageBold: true,
      message: 'Processing...',
    },
  },
}

export const CoverageWaitingChecksProcessing: Story = {
  args: {
    coverage: {
      statusColor: 'grey',
      message: 'Waiting Upload...',
    },
    checks: {
      statusColor: 'yellow',
      messageBold: true,
      message: 'Processing...',
    },
  },
}

export const CoverageProcessedChecksPassing: Story = {
  args: {
    coverage: {
      statusColor: 'green',
      message: '96.5%',
      detailsHref: '/',
    },
    checks: {
      statusColor: 'green',
      message: 'Passing. No issues detected.',
    },
  },
}

export const CoverageFailedChecksPassing: Story = {
  args: {
    coverage: {
      statusColor: 'red',
      messageBold: true,
      message: '89.4% (at least 90% is required)',
      detailsHref: '/',
    },
    checks: {
      statusColor: 'green',
      message: 'Passing. No issues detected.',
    },
  },
}

export const CoverageErroredChecksPassing: Story = {
  args: {
    coverage: {
      statusColor: 'red',
      messageBold: true,
      message: 'Error processing.',
      detailsHref: '/',
    },
    checks: {
      statusColor: 'green',
      message: 'Passing. No issues detected.',
    },
  },
}

export const CoveragePassingChecksFailed: Story = {
  args: {
    coverage: {
      statusColor: 'green',
      message: '95%',
      detailsHref: '/',
    },
    checks: {
      statusColor: 'red',
      message: '5 issues',
      messageBold: true,
      detailsHref: '/',
    },
  },
}

export const CoveragePassingChecksErrored: Story = {
  args: {
    coverage: {
      statusColor: 'green',
      message: '95%',
      detailsHref: '/',
    },
    checks: {
      statusColor: 'red',
      message: 'Failed running.',
      messageBold: true,
      detailsHref: '/',
    },
  },
}

export const CoveragePassingChecksNotConfigured: Story = {
  args: {
    coverage: {
      statusColor: 'green',
      message: '95%',
      detailsHref: '/',
    },
    checks: {
      statusColor: 'yellow',
      message: 'Not Configured',
      messageBold: true,
      detailsKind: 'help',
      detailsHref: '/',
    },
  },
}

export const CoveragePassingChecksCanceled: Story = {
  args: {
    coverage: {
      statusColor: 'green',
      message: '95%',
      detailsHref: '/',
    },
    checks: {
      statusColor: 'grey',
      message: 'Canceled',
      messageBold: false,
      detailsKind: 'details',
      detailsHref: '/',
    },
  },
}
