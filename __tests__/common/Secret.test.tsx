import { render, screen } from '@testing-library/react'

import Secret from 'app/common/Secret'

import '@testing-library/jest-dom'

const threeMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 3))
const twoHoursAgo = new Date(new Date().setHours(new Date().getHours() - 2))

describe('common/Secret', () => {
  it('renders Secret', () => {
    render(<Secret name="GIT_CONFIG" />)

    expect(screen.getByText('GIT_CONFIG')).toBeVisible()
  })

  it('renders Secret with "meta" param', () => {
    const { container } = render(
      <Secret
        metadata={{
          createdAt: threeMonthsAgo,
          createdBy: 'Cocov',
          lastUsed: twoHoursAgo,
        }}
        name="GIT_CONFIG"
      />,
    )

    expect(container.querySelector('.createdAt')?.textContent).toEqual(
      'Created 3 months ago by Cocov',
    )
    expect(container.querySelector('.lastUsed')?.textContent).toEqual(
      'Last used 2 hours ago',
    )
  })

  it('renders Secret with "meta" never used ', () => {
    render(
      <Secret
        metadata={{
          createdAt: threeMonthsAgo,
          createdBy: 'Cocov',
        }}
        name="GIT_CONFIG"
      />,
    )

    expect(screen.getByText('Never used')).toBeVisible()
  })

  it('renders Secret snapshots', () => {
    const { container } = render(<Secret name="GIT_CONFIG" />)

    expect(container).toMatchSnapshot()
  })
})
