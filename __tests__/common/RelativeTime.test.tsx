import { render, screen } from '@testing-library/react'

import RelativeTime from 'app/common/RelativeTime'

import '@testing-library/jest-dom'

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

describe('common/RelativeTime', () => {
  it('renders RelativeTime', () => {
    render(<RelativeTime timestamp={yesterday} />)

    expect(screen.getByText('yesterday')).toBeVisible()
  })

  it('renders RelativeTime snapshots', () => {
    const { container } = render(<RelativeTime timestamp={yesterday} />)

    expect(container).toMatchSnapshot()
  })
})
