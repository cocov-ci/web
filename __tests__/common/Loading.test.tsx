import { render } from '@testing-library/react'

import Loading from 'app/common/Loading'

import '@testing-library/jest-dom'

describe('Loading', () => {
  it('renders Loading spinner', () => {
    const { container } = render(<Loading type="spinner" />)

    expect(container.querySelector('img')).toBeVisible()
  })

  it('renders Loading skeleton', () => {
    const { container } = render(<Loading type="skeleton" />)

    expect(
      container.getElementsByClassName('react-loading-skeleton').length,
    ).toEqual(1)
  })

  it('renders Loading skeleton with count param', () => {
    const { container } = render(<Loading count={3} type="skeleton" />)

    expect(
      container.getElementsByClassName('react-loading-skeleton').length,
    ).toEqual(3)
  })

  it('renders Loading snapshots', () => {
    const { container } = render(<Loading />)
    expect(container).toMatchSnapshot()
  })
})
