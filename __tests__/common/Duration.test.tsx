import { render, screen } from '@testing-library/react'

import Duration from 'app/common/Duration'

import '@testing-library/jest-dom'

const args = {
  fromDate: '01 Jan 1970 00:00:00 GMT',
  toDate: '01 Jan 1970 00:00:03 GMT',
}

describe('common/Duration', () => {
  it('renders Duration', () => {
    render(<Duration {...args} />)

    expect(screen.getByText('3 seconds')).toBeVisible()
  })

  it('renders Duration passing only FromDate', () => {
    render(
      <Duration
        fromDate={(() => {
          const d = Date.now() - 3 * 60 * 1000

          return new Date(d).toISOString()
        })()}
      />,
    )

    expect(screen.getByText('3 minutes')).toBeVisible()
  })

  it('renders Duration higher than 1 hour', () => {
    const args = {
      fromDate: '01 Jan 1970 00:00:00 GMT',
      toDate: '01 Jan 1970 01:10:00 GMT',
    }

    render(<Duration {...args} />)

    expect(screen.getByText('1 hour and 10 minutes')).toBeVisible()
  })

  it('renders Duration less than a second', () => {
    const args = {
      fromDate: '01 Jan 1970 00:00:00 GMT',
      toDate: '01 Jan 1970 00:00:00 GMT',
    }

    render(<Duration {...args} />)

    expect(screen.getByText('less than a second')).toBeVisible()
  })

  it('renders Duration snapshots', () => {
    const { container } = render(<Duration {...args} />)

    expect(container).toMatchSnapshot()
  })
})
