import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import ListItems from 'app/new/ListItems'
import useAPIMock from 'hooks/useAPIMock'
import API from 'utils/api'

import '@testing-library/jest-dom'

const args = {
  data: [
    {
      name: '.github',
      description: 'Community health files for the @cocov-ci organization',
      created_at: '2023-01-03T19:43:48.000Z',
      pushed_at: '2023-01-03T20:12:13.000Z',
      status: 'absent' as const,
    },
    {
      name: 'api',
      description: "Cocov's API.",
      created_at: '2022-11-22T21:06:17.000Z',
      pushed_at: '2023-03-06T01:09:42.000Z',
      status: 'present' as const,
    },
  ],
  refetch: () => null,
  loading: false,
}

describe('new/ListItems', () => {
  it('renders ListItems', () => {
    const { container } = render(<ListItems {...args} />)

    expect(container.querySelectorAll('.item').length).toEqual(2)
  })

  it('renders ListItems with "loading" param', () => {
    const { container } = render(<ListItems {...args} loading={true} />)

    expect(container.querySelectorAll('.item.loading').length).toEqual(7)
  })

  it('triggers "Add to Cocov" button', async () => {
    const handleEvent = jest.fn()

    render(<ListItems {...args} refetch={handleEvent} />)

    useAPIMock(API.prototype.repositoryAdd, {
      id: 123,
      description: 'test',
      name: 'api',
      token: '1234',
      coverage: 1,
      issues: 3,
      default_branch: 'main',
      head: { checks_status: 'ok', coverage_status: 'ok' },
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Add to Cocov'))
    })

    expect(handleEvent).toHaveBeenCalledTimes(1)
  })

  it('renders ListItems snapshots', () => {
    const { container } = render(<ListItems {...args} />)

    expect(container).toMatchSnapshot()
  })
})
