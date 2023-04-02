import { render, screen } from '@testing-library/react'

import NoResults from 'app/new/NoResults'

import '@testing-library/jest-dom'

describe('new/NoResults', () => {
  it('renders NoResults', () => {
    const { container } = render(<NoResults />)

    expect(screen.getByText('No results')).toBeVisible()
    expect(container.querySelector('svg')).toBeVisible()
  })

  it('renders NoResults snapshots', () => {
    const { container } = render(<NoResults />)

    expect(container).toMatchSnapshot()
  })
})
