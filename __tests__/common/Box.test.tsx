import { render, screen } from '@testing-library/react'

import Box from 'app/common/Box'

import '@testing-library/jest-dom'

describe('common/Box', () => {
  const { container } = render(
    <Box>
      <p>children</p>
    </Box>,
  )

  it('renders Box', () => {
    expect(screen.getByText('children')).toBeVisible()
  })

  it('renders Box snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
