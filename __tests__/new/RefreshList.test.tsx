import { fireEvent, render, screen } from '@testing-library/react'

import RefreshList from 'app/new/RefreshList'

import '@testing-library/jest-dom'

const args = {
  loading: false,
  date: new Date(new Date().setDate(new Date().getDate() - 1)).toDateString(),
  onRefresh: () => null,
}

describe('new/RefreshList', () => {
  it('renders RefreshList', () => {
    const { container } = render(<RefreshList {...args} />)

    expect(container.querySelector('.description')?.textContent).toEqual(
      'This list was last updated 2 days ago. You can refresh it in case you feel like something is missing.',
    )
  })

  it('renders RefreshList with "loading" param', () => {
    const { container } = render(<RefreshList {...args} loading={true} />)

    expect(container.querySelector('button')).toHaveAttribute('disabled')
  })

  it('triggers "onRefresh" event', () => {
    const handleEvent = jest.fn()
    render(<RefreshList {...args} onRefresh={handleEvent} />)

    fireEvent.click(screen.getByRole('button'))
    expect(handleEvent).toHaveBeenCalledTimes(1)
  })

  it('renders RefreshList snapshots', () => {
    const { container } = render(<RefreshList {...args} />)

    expect(container).toMatchSnapshot()
  })
})
