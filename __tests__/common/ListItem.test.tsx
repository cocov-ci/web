import { render } from '@testing-library/react'

import ListItem from 'app/common/ListItem'

import '@testing-library/jest-dom'

describe('common/ListItem', () => {
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

  const { container } = render(<ListItemComponent />)

  it('renders ListItem without stats info', () => {
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
    expect(container).toMatchSnapshot()
  })
})
