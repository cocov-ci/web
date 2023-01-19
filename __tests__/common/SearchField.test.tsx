import { render, screen } from '@testing-library/react'

import SearchField from 'app/common/SearchField'

import '@testing-library/jest-dom'

describe('common/SearchField', () => {
  const { container } = render(<SearchField onSearch={() => null} />)

  it('renders SearchField component', () => {
    expect(screen.getByPlaceholderText('Type to Search')).toBeVisible()
    expect(container.querySelector('svg')).toBeVisible()
  })

  it('renders SearchField component with loading props', () => {
    const { container } = render(
      <SearchField loading={true} onSearch={() => null} />,
    )

    expect(screen.getByPlaceholderText('Type to Search')).toBeVisible()
    expect(container.querySelector('svg')).toBeVisible()
    expect(container.querySelector('img')).toBeVisible()
  })

  it('renders SearchField component with disabled props', () => {
    const { container } = render(
      <SearchField disabled={true} onSearch={() => null} />,
    )

    expect(screen.getByPlaceholderText('Type to Search')).toBeVisible()
    expect(container.querySelector('svg')).toBeVisible()
    expect(container.querySelector('input')).toHaveAttribute('disabled')
  })

  it('renders SearchField snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
