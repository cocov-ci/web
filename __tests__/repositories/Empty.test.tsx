import { render, screen } from '@testing-library/react'

import Empty from 'app/repositories/Empty'

import '@testing-library/jest-dom'

describe('Repositories/Empty', () => {
  it('renders Empty component', () => {
    const { container } = render(<Empty />)

    expect(
      screen.getByText('How about adding a new repository to get started?'),
    ).toBeVisible()
    expect(screen.getByText("Hmm. It's empty here…")).toBeVisible()
    expect(container.querySelector('img')).toBeVisible()
  })

  it('renders Empty snapshots', () => {
    const { container } = render(<Empty />)
    expect(container).toMatchSnapshot()
  })
})
