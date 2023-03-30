import { fireEvent, render, screen } from '@testing-library/react'

import Sidebar from 'app/common/Sidebar'

import '@testing-library/jest-dom'

const items = [
  { id: 0, name: 'All Categories', counter: 920 },
  { id: 1, name: 'Complexity', counter: 130 },
]

describe('common/Sidebar', () => {
  it('renders Sidebar', () => {
    render(<Sidebar defaultSelectedId={0} items={items} />)

    expect(screen.getByText('All Categories')).toBeVisible()
    expect(screen.getByText('920')).toBeVisible()
    expect(screen.getByText('Complexity')).toBeVisible()
    expect(screen.getByText('130')).toBeVisible()
  })

  it('triggers onSelectItem event', () => {
    const handleEvent = jest.fn()
    const { container } = render(
      <Sidebar
        defaultSelectedId={0}
        items={items}
        onSelectItem={handleEvent}
      />,
    )

    expect(container.querySelector('.selected .label')?.textContent).toEqual(
      'All Categories',
    )

    fireEvent.click(screen.getByText('Complexity'))

    expect(container.querySelector('.selected .label')?.textContent).toEqual(
      'Complexity',
    )
    expect(handleEvent).toHaveBeenCalledTimes(1)
  })

  it('renders Sidebar snapshots', () => {
    const { container } = render(
      <Sidebar defaultSelectedId={0} items={items} />,
    )

    expect(container).toMatchSnapshot()
  })
})
