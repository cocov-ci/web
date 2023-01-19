import { render, screen } from '@testing-library/react'

import Empty from 'app/repos/Empty'

import '@testing-library/jest-dom'

describe('Repositories/Empty', () => {
  const { container } = render(<Empty />)
  it('renders Empty component', () => {
    expect(
      screen.getByText('How about adding a new repository to get started?'),
    ).toBeVisible()
    expect(screen.getByText("Hmm. It's empty here…")).toBeVisible()
    expect(container.querySelector('img')).toBeVisible()
  })

  it('renders Empty snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
