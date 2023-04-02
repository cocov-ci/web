import { render, screen } from '@testing-library/react'

import LoadingRepositories from 'app/new/LoadingRepositories'

import '@testing-library/jest-dom'

describe('new/LoadingRepositories', () => {
  it('renders LoadingRepositories', () => {
    const { container } = render(<LoadingRepositories />)

    expect(screen.getByText('Loading Repositories…')).toBeVisible()
    expect(container.querySelector('img')).toBeVisible()
  })

  it('renders LoadingRepositories snapshots', () => {
    const { container } = render(<LoadingRepositories />)

    expect(container).toMatchSnapshot()
  })
})
