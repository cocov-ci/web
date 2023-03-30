import { fireEvent, render, screen } from '@testing-library/react'

import CommitList from 'app/common/CommitList'

import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}))

const args = {
  paginationData: {
    total: 10,
    currentPage: 2,
    onPageClick: () => null,
  },
  commits: [
    {
      commitInfo: {
        headURL: 'https://github.com/cocov-ci/web',
        avatarURL:
          'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
        headSHA: '62bad0cbadbeefc0c0f',
        commitMessage:
          'fix(rollout-restart): Ensure to keep watching rollout status',
        username: 'cocov-ci',
        timestamp: new Date(Date.parse('2022-11-22T21:25:31Z')),
      },
      coverage: 100,
      issues: 9999,
    },
    {
      commitInfo: {
        headURL: 'https://github.com/cocov-ci/web',
        avatarURL:
          'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
        headSHA: '62bad0cbadbeefc0c0f1',
        commitMessage:
          'fix(rollout-restart): Ensure to keep watching rollout status',
        username: 'cocov-ci',
        timestamp: new Date(Date.parse('2022-11-22T21:25:31Z')),
      },
      coverage: 100,
      issues: 9999,
    },
  ],
}

describe('common/CommitList', () => {
  it('renders CommitList', () => {
    const { container } = render(<CommitList {...args} />)

    expect(container.querySelectorAll('.rows > a').length).toEqual(2)
  })

  it('renders CommitList with "loading" param', () => {
    const { container } = render(<CommitList {...args} loading={true} />)

    expect(container.querySelectorAll('.rows > a').length).toEqual(0)
    expect(container.querySelectorAll('.loading.row').length).toEqual(5)
  })

  it('triggers onChangePage event', () => {
    const handleEvent = jest.fn()

    const { container } = render(
      <CommitList {...args} onChangePage={handleEvent} />,
    )
    fireEvent.click(container.querySelectorAll('li.page')[0])
    expect(handleEvent).toHaveBeenCalledTimes(1)
  })

  it('renders CommitList snapshots', () => {
    const { container } = render(<CommitList {...args} />)

    expect(container).toMatchSnapshot()
  })
})
