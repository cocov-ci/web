import { render, screen } from '@testing-library/react'

import ListItem from 'app/common/ListItem'

import '@testing-library/jest-dom'

describe('ListItem', () => {
  const ListItemComponent = () => (
    <ListItem
      description="description here..."
      stats={{
        issues: undefined,
        coverage: undefined,
      }}
      title="title here..."
    />
  )

  it('renders ListItem without stats info', () => {
    const { container } = render(<ListItemComponent />)

    expect(container.querySelector('span.backgroundText')).toHaveTextContent(
      'title here...',
    )
    expect(container.querySelector('.info p.title')).toHaveTextContent(
      'title here...',
    )
    expect(container.querySelector('.info p.description')).toHaveTextContent(
      'description here...',
    )
    expect(container.querySelectorAll('.stats p.value')[0]).toHaveTextContent(
      '—',
    )
    expect(container.querySelectorAll('.stats p.value')[1]).toHaveTextContent(
      '—',
    )
  })

  it('renders ListItem snapshots', () => {
    const { container } = render(<ListItemComponent />)
    expect(container).toMatchSnapshot()
  })
})
