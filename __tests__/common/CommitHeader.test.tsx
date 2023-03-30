import { render, screen } from '@testing-library/react'

import CommitHeader from 'app/common/CommitHeader'

import '@testing-library/jest-dom'

const args = {
  headURL: 'https://github.com/cocov-ci/web',
  avatarURL: 'https://avatars.githubusercontent.com/u/118852412?s=200&v=4',
  headSHA: '62bad0cbadbeefc0c0f',
  commitMessage: 'fix(rollout-restart): Ensure to keep watching rollout status',
  username: 'cocov-ci',
  timestamp: new Date(Date.parse('2022-11-22T21:25:31Z')),
}

describe('common/CommitHeader', () => {
  it('renders CommitHeader', () => {
    render(<CommitHeader {...args} />)

    expect(screen.getByText(args.username)).toBeVisible()
    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', args.headURL)
    expect(screen.getByText(args.headSHA?.substring(0, 6))).toBeVisible()
    expect(screen.getByText(args.commitMessage)).toBeVisible()
  })

  it('renders CommitHeader with "loading" param', () => {
    const { container } = render(<CommitHeader loading={true} />)

    expect(
      container.getElementsByClassName('react-loading-skeleton').length,
    ).toEqual(3)
  })

  it('renders CommitHeader wth "isRegisteredUser" param', () => {
    const { container } = render(
      <CommitHeader {...args} isRegisteredUser={true} />,
    )

    expect(
      container.querySelector(`[href="https://github.com/${args.username}"]`),
    ).toBeVisible()
  })

  it('renders CommitHeader snapshots', () => {
    const { container } = render(<CommitHeader {...args} />)

    expect(container).toMatchSnapshot()
  })
})
