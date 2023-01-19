import { render, screen } from '@testing-library/react'

import NoResults from 'app/repos/NoResults'

import '@testing-library/jest-dom'

describe('Repositories/NoResults', () => {
  const { container } = render(<NoResults />)

  it('renders NoResults component', () => {
    expect(
      screen.getByText(
        'Your search did not yield results. Check if your spelling is correct, or try using other terms.',
      ),
    ).toBeVisible()
    expect(screen.getByText('No results')).toBeVisible()
    expect(container.querySelector('svg')).toBeVisible()
  })

  it('renders NoResults snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
