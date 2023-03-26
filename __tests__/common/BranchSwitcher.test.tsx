import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import BranchSwitcher from 'app/common/BranchSwitcher'
import '@testing-library/jest-dom'
import useAPIMock from 'hooks/useAPIMock'
import API from 'utils/api'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('common/BranchSwitcher', () => {
  const { container } = render(
    <BranchSwitcher onClose={() => null} visible={true} />,
  )

  it('renders BranchSwitcher', () => {
    expect(screen.getByRole('textbox')).toBeVisible()
  })

  it('triggers onClose event', () => {
    const handleOnClose = jest.fn()

    render(<BranchSwitcher onClose={handleOnClose} visible={true} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleOnClose).toHaveBeenCalledTimes(1)
  })

  it('triggers onKeyUp event', () => {
    const handleOnClose = jest.fn()
    render(<BranchSwitcher onClose={handleOnClose} visible={true} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.keyUp(input, { key: 'Escape', code: 'Escape' })

    expect(handleOnClose).toHaveBeenCalledTimes(1)
  })

  it('loads data when opening', async () => {
    useAPIMock(API.prototype.branchList, ['branch1', 'main'])

    await act(async () =>
      render(<BranchSwitcher onClose={() => null} visible={true} />),
    )

    expect(screen.getByText('branch1')).toBeVisible()
  })

  it('triggers onChange search with results', async () => {
    useAPIMock(API.prototype.branchList, ['branch1', 'main'])

    await act(async () => {
      render(<BranchSwitcher onClose={() => null} visible={true} />)
    })

    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'mai' } })

    expect(screen.queryByText('main')).toBeVisible()
    expect(screen.queryByText('branch1')).toBeNull()
  })

  it('triggers onChange search without results', async () => {
    useAPIMock(API.prototype.branchList, ['branch1'])

    await act(async () => {
      render(<BranchSwitcher onClose={() => null} visible={true} />)
    })

    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'mai' } })

    await act(() => {
      fireEvent.keyUp(input, { target: { value: '' } })
    })

    expect(screen.queryByText('branch1')).toBeNull()
  })

  it('triggers onKeyUp and onKeyDown navigation', async () => {
    useAPIMock(API.prototype.branchList, ['branch1', 'branch2', 'branch3'])

    await act(async () => {
      render(<BranchSwitcher onClose={() => null} visible={true} />)
    })

    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.keyUp(input, { key: 'ArrowUp' })

    expect(screen.queryByText('branch3')).toHaveClass('active')

    fireEvent.keyUp(input, { key: 'ArrowDown' })

    expect(screen.queryByText('branch1')).toHaveClass('active')

    fireEvent.keyUp(input, { key: 'ArrowDown' })

    expect(screen.queryByText('branch2')).toHaveClass('active')

    fireEvent.keyUp(input, { key: 'ArrowUp' })

    expect(screen.queryByText('branch1')).toHaveClass('active')
  })

  it('triggers onSelect by Enter key', async () => {
    const handleOnClose = jest.fn()
    useAPIMock(API.prototype.branchList, ['branch1'])

    await act(async () => {
      render(<BranchSwitcher onClose={handleOnClose} visible={true} />)
    })

    const input = screen.getByRole('textbox') as HTMLInputElement

    await act(() => {
      fireEvent.keyUp(input, { key: 'Enter' })
    })

    expect(handleOnClose).toHaveBeenCalledTimes(1)
  })

  it('triggers onSelect event clicking on item', async () => {
    const handleOnClose = jest.fn()
    useAPIMock(API.prototype.branchList, ['branch1'])

    await act(async () => {
      render(<BranchSwitcher onClose={handleOnClose} visible={true} />)
    })

    const branch = screen.getByText('branch1')

    await act(() => {
      fireEvent.click(branch)
    })

    expect(handleOnClose).toHaveBeenCalledTimes(1)
  })

  it('renders BranchSwitcher snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
