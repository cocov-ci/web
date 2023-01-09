import { render, screen } from '@testing-library/react'

import Box from 'app/common/Box'

import '@testing-library/jest-dom'

describe('Box', () => {
  const BoxComponent = () => (
    <Box>
      <p>children</p>
    </Box>
  )

  it('renders Box', () => {
    render(<BoxComponent />)

    expect(screen.getByText('children')).toBeVisible()
  })

  it('renders Box snapshots', () => {
    const { container } = render(<BoxComponent />)
    expect(container).toMatchSnapshot()
  })
})
