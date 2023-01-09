import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'

import Button from 'app/common/Button'

import '@testing-library/jest-dom'

describe('Button', () => {
  const ButtonComponent = ({
    onClick,
    children,
  }: {
    onClick?: () => void
    children: ReactNode
  }) => <Button onClick={onClick}>{children}</Button>

  it('renders Button', () => {
    render(<ButtonComponent>button</ButtonComponent>)

    expect(screen.getByRole('button')).toBeVisible()
  })

  it('triggers onClick event', () => {
    const handleClick = jest.fn()
    render(<ButtonComponent onClick={handleClick}>button</ButtonComponent>)
    fireEvent.click(screen.getByText(/button/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders Button snapshots', () => {
    const { container } = render(<ButtonComponent>button</ButtonComponent>)
    expect(container).toMatchSnapshot()
  })
})
