import { fireEvent, render, screen } from '@testing-library/react'

import Header from 'app/common/Header'
import { AuthContext } from 'context/AuthContext'
import { AuthPropsContext } from 'types/Auth'

import '@testing-library/jest-dom'

const HeaderContext = ({
  login,
  logout,
  loading,
  isAuthenticated,
  user,
}: AuthPropsContext) => (
  <AuthContext.Provider
    value={{
      login,
      logout,
      loading,
      isAuthenticated,
      user,
    }}
  >
    <Header />
  </AuthContext.Provider>
)

const props = {
  login: () => null,
  logout: () => null,
  loading: false,
  isAuthenticated: true,
}

describe('common/Header', () => {
  const { container } = render(<HeaderContext {...props} />)

  it('renders Header', () => {
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('triggers Logout event', () => {
    const handleClick = jest.fn()

    render(
      <HeaderContext
        {...props}
        logout={handleClick}
        user={{ isAdmin: false, name: 'John Doe' }}
      />,
    )

    fireEvent.click(screen.getByText(/Sign out/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders Header snapshots', () => {
    const { container } = render(<HeaderContext {...props} />)
    expect(container).toMatchSnapshot()
  })
})
