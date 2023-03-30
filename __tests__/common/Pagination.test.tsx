import { fireEvent, render, screen } from '@testing-library/react'

import Pagination from 'app/common/Pagination'

import '@testing-library/jest-dom'

const args = {
  total: 10,
  currentPage: 2,
  onPageClick: () => null,
}

describe('common/Pagination', () => {
  it('renders Pagination', () => {
    const { container } = render(<Pagination {...args} />)

    expect(container.querySelectorAll('.pages li').length).toEqual(10)
    expect(container.querySelectorAll('svg').length).toEqual(2)
  })

  it('triggers onPageClick event', () => {
    const onPageClick = jest.fn()
    render(<Pagination {...args} onPageClick={onPageClick} />)

    fireEvent.click(screen.getByText('3'))
    expect(onPageClick).toHaveBeenCalledTimes(1)
  })

  it('triggers onPageClick event on Previous arrow', () => {
    const onPageClick = jest.fn()
    const { container } = render(
      <Pagination {...args} onPageClick={onPageClick} />,
    )

    fireEvent.click(container.querySelectorAll('svg')[0] as Element)
    expect(onPageClick).toHaveBeenCalledTimes(1)
  })

  it('triggers onPageClick event on Next arrow', () => {
    const onPageClick = jest.fn()
    const { container } = render(
      <Pagination {...args} onPageClick={onPageClick} />,
    )

    fireEvent.click(container.querySelectorAll('svg')[1] as Element)
    expect(onPageClick).toHaveBeenCalledTimes(1)
  })

  it('renders Pagination snapshots', () => {
    const { container } = render(<Pagination {...args} />)

    expect(container).toMatchSnapshot()
  })
})
