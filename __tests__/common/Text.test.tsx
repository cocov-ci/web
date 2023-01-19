import { render } from '@testing-library/react'

import Text from 'app/common/Text'

import '@testing-library/jest-dom'

describe('common/Text', () => {
  const { container } = render(<Text />)
  it('renders Text', () => {
    expect(container.querySelector('p')).toBeVisible()
  })

  it('renders Text snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
