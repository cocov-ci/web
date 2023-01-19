import { render } from '@testing-library/react'

import ListItem from 'app/repositories/ListItem'

import '@testing-library/jest-dom'

describe('Repositories/ListItem', () => {
  const { container } = render(
    <ListItem
      coverage={10}
      description="repo description"
      issues={10}
      name="repo name"
    />,
  )

  it('renders ListItem component', () => {
    expect(container.querySelector('.info p.title')).toHaveTextContent(
      'repo name',
    )
    expect(container.querySelector('.info p.description')).toHaveTextContent(
      'repo description',
    )
    expect(container.querySelectorAll('.stats p.value')[0]).toHaveTextContent(
      '10',
    )
    expect(container.querySelectorAll('.stats p.value')[1]).toHaveTextContent(
      '10%',
    )
  })

  it('renders ListItem snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
