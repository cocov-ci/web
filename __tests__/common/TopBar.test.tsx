import { render, screen } from '@testing-library/react'

import TopBar from 'app/common/TopBar'

import '@testing-library/jest-dom'

describe('TopBar', () => {
  it('renders TopBar', () => {
    render(
      <TopBar description="description" title="title">
        <p>children</p>
      </TopBar>,
    )

    expect(screen.getByText('description')).toBeVisible()
    expect(screen.getByText('title')).toBeVisible()
    expect(screen.getByText('children')).toBeVisible()
  })

  it('renders TopBar snapshots', () => {
    const { container } = render(<TopBar />)
    expect(container).toMatchSnapshot()
  })
})
