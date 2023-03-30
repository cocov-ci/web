import { fireEvent, render, screen } from '@testing-library/react'

import AuthContext from '__tests__/__mocks__/AuthContext'
import Header from 'app/common/Header'

import '@testing-library/jest-dom'

const props = {
  login: () => null,
  logout: () => null,
  loading: false,
  isAuthenticated: true,
}

describe('common/Header', () => {
  const { container } = render(
    <AuthContext {...props}>
      <Header />
    </AuthContext>,
  )

  it('renders Header', () => {
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('triggers Logout event', () => {
    const handleClick = jest.fn()

    render(
      <AuthContext
        {...props}
        logout={handleClick}
        user={{ isAdmin: false, name: 'John Doe' }}
      >
        <Header />
      </AuthContext>,
    )

    fireEvent.click(screen.getByText(/Sign out/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders Header snapshots', () => {
    const { container } = render(
      <AuthContext {...props}>
        <Header />
      </AuthContext>,
    )
    expect(container).toMatchSnapshot()
  })
})
