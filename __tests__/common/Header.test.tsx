import { render } from '@testing-library/react'

import Header from 'app/common/Header'

import '@testing-library/jest-dom'

describe('common/Header', () => {
  const { container } = render(<Header />)
  it('renders Header', () => {
    expect(container.querySelector('header')).toBeVisible()
  })

  it('renders Header snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
