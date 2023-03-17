import { fireEvent, render, screen } from '@testing-library/react'

import BranchSwitcher from 'app/common/BranchSwitcher'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('common/BranchSwitcher', () => {
  const { container } = render(
    <BranchSwitcher onClose={() => null} visible={true} />,
  )

  it('renders BranchSwitcher', () => {
    expect(screen.getByRole('textbox')).toBeVisible()
  })

  it('triggers onClose event', () => {
    const handleClick = jest.fn()

    render(<BranchSwitcher onClose={handleClick} visible={true} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('triggers onKeyUp event', () => {
    const handleOnClose = jest.fn()
    render(<BranchSwitcher onClose={handleOnClose} visible={true} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.keyUp(input, { key: 'Escape', code: 'Escape' })

    expect(handleOnClose).toHaveBeenCalledTimes(1)
  })

  it('renders BranchSwitcher snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
