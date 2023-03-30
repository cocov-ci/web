import { fireEvent, render, screen } from '@testing-library/react'

import AuthContext from '__tests__/__mocks__/AuthContext'
import GitHubButton from 'app/auth/signin/GitHubButton'

import '@testing-library/jest-dom'

const props = {
  login: jest.fn(),
  logout: jest.fn(),
  loading: false,
  isAuthenticated: false,
}

describe('app/auth/signin/GitHubButton', () => {
  it('renders GitHubButton', () => {
    render(
      <AuthContext {...props}>
        <GitHubButton />
      </AuthContext>,
    )

    expect(screen.getByRole('button')).toBeVisible()
  })

  it('triggers onClick event', () => {
    render(
      <AuthContext {...props}>
        <GitHubButton />
      </AuthContext>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(props.login).toHaveBeenCalledTimes(1)
  })

  it('renders GitHub button with "loading" param', () => {
    const { container } = render(
      <AuthContext {...props} loading={true}>
        <GitHubButton />
      </AuthContext>,
    )

    expect(screen.queryByRole('button')).toBeNull()
    expect(container.querySelector('img')).toBeVisible()
  })

  it('renders GitHubButton snapshots', () => {
    const { container } = render(
      <AuthContext {...props}>
        <GitHubButton />
      </AuthContext>,
    )

    expect(container).toMatchSnapshot()
  })
})
