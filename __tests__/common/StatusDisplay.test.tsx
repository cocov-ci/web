import { render, screen } from '@testing-library/react'

import StatusDisplay from 'app/common/StatusDisplay'

import '@testing-library/jest-dom'

const args = {
  coverage: {
    statusColor: 'yellow' as const,
    messageBold: true,
    message: 'Processing...',
  },
  checks: {
    statusColor: 'yellow' as const,
    messageBold: true,
    message: 'Processing...',
  },
}

describe('common/StatusDisplay', () => {
  it('renders StatusDisplay', () => {
    render(<StatusDisplay {...args} />)

    expect(screen.getAllByText('Processing...').length).toEqual(2)
  })

  it('renders StatusDisplay processed', () => {
    const args = {
      coverage: {
        statusColor: 'green' as const,
        message: '96.5%',
        detailsHref: '/',
      },
      checks: {
        statusColor: 'green' as const,
        message: 'Passing. No issues detected.',
      },
    }

    render(<StatusDisplay {...args} />)

    expect(screen.getByText('96.5%')).toBeVisible()
    expect(screen.getByText('Details')).toBeVisible()
    expect(screen.getByText('Passing. No issues detected.')).toBeVisible()
  })

  it('renders StatusDisplay snapshots', () => {
    const { container } = render(<StatusDisplay {...args} />)

    expect(container).toMatchSnapshot()
  })
})
