import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import AuthProvider, { AuthContext } from 'context/AuthContext'
import useAuth from 'hooks/useAuth'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}))

const Consumer = () => {
  const { login, logout, loading } = useAuth()

  return (
    <>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
      <p title="loading">{loading && 'loading'}</p>
    </>
  )
}

describe('app/context/AuthProvider', () => {
  it('triggers "login" event', async () => {
    const { rerender } = render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    )

    await act(() => {
      fireEvent.click(screen.getByText('login'))
    })

    rerender(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    )

    expect(screen.getByTitle(/^loading/).textContent).toEqual('loading')
  })

  it('triggers "logout" event', async () => {
    const { rerender } = render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    )

    await act(() => {
      fireEvent.click(screen.getByText('logout'))
    })

    rerender(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    )

    expect(screen.getByTitle(/^loading/).textContent).toEqual('loading')
  })

  // it('renders AuthProvider snapshots', () => {
  //   const { container } = render(
  //     <AuthProvider>
  //       <Consumer />,
  //     </AuthProvider>,
  //   )

  //   expect(container).toMatchSnapshot()
  // })
})
