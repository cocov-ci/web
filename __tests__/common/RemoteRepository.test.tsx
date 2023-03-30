import { render, screen } from '@testing-library/react'

import RemoteRepository from 'app/common/RemoteRepository'

import '@testing-library/jest-dom'

const args = {
  name: 'api',
  createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
  updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  status: 'absent' as const,
}

describe('common/RemoteRepository', () => {
  it('renders RemoteRepository', () => {
    render(<RemoteRepository {...args} />)

    expect(screen.getByText('api')).toBeVisible()
    expect(screen.getByText('yesterday')).toBeVisible()
    expect(screen.getByText('2 days ago')).toBeVisible()
    expect(screen.getByRole('button')).toHaveTextContent('Add to Cocov')
  })

  it('renders RemoteRepository', () => {
    render(<RemoteRepository {...args} status="pending" />)

    expect(screen.getByRole('button')).toHaveTextContent('Adding...')
  })

  it('renders RemoteRepository', () => {
    render(<RemoteRepository {...args} status="present" />)

    expect(screen.getByRole('button')).toHaveTextContent('Already Added')
  })

  it('renders RemoteRepository snapshots', () => {
    const { container } = render(<RemoteRepository {...args} />)

    expect(container).toMatchSnapshot()
  })
})
