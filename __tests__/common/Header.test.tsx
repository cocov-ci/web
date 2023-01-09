import { render } from '@testing-library/react'

import Header from 'app/common/Header'

import '@testing-library/jest-dom'

describe('Header', () => {
  it('renders Header', () => {
    const { container } = render(<Header />)

    expect(container.querySelector('header')).toBeVisible()
  })

  it('renders Header snapshots', () => {
    const { container } = render(<Header />)
    expect(container).toMatchSnapshot()
  })
})
