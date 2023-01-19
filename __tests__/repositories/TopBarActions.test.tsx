import { render, screen } from '@testing-library/react'

import TopBarActions from 'app/repos/TopBarActions'

import '@testing-library/jest-dom'

describe('Repositories/TopBarActions', () => {
  const { container } = render(<TopBarActions onSearchChange={() => null} />)

  it('renders TopBarActions component', () => {
    expect(screen.getByPlaceholderText('Type to Search')).toBeVisible()
    expect(screen.getByRole('button')).toHaveTextContent('Add Repository')
    expect(container.querySelector('svg')).toBeVisible()
  })

  it('renders TopBarActions component with searchFieldLoading props', () => {
    const { container } = render(
      <TopBarActions onSearchChange={() => null} searchFieldLoading={true} />,
    )

    expect(screen.getByPlaceholderText('Type to Search')).toBeVisible()
    expect(screen.getByRole('button')).toHaveTextContent('Add Repository')
    expect(container.querySelector('svg')).toBeVisible()
    expect(container.querySelector('img')).toBeVisible()
  })

  it('renders TopBarActions component with searchFieldDisabled props', () => {
    const { container } = render(
      <TopBarActions onSearchChange={() => null} searchFieldDisabled={true} />,
    )

    expect(screen.getByPlaceholderText('Type to Search')).toBeVisible()
    expect(screen.getByRole('button')).toHaveTextContent('Add Repository')
    expect(container.querySelector('svg')).toBeVisible()
    expect(container.querySelector('input')).toHaveAttribute('disabled')
  })

  it('renders TopBarActions snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
