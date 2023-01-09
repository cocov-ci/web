import { render } from '@testing-library/react'

import Text from 'app/common/Text'

import '@testing-library/jest-dom'

describe('Text', () => {
  it('renders Text', () => {
    const { container } = render(<Text />)

    expect(container.querySelector('p')).toBeVisible()
  })

  it('renders Text snapshots', () => {
    const { container } = render(<Text />)
    expect(container).toMatchSnapshot()
  })
})
