import { render, screen } from '@testing-library/react'

import Header from 'app/new/Header'

import '@testing-library/jest-dom'

const args = {
  searchFieldDisabled: false,
  searchFieldLoading: false,
  onSearchChange: jest.fn(),
  loading: false,
}
describe('new/Header', () => {
  it('renders Header', () => {
    const { container } = render(<Header {...args} />)

    expect(
      screen.getByText(
        'Below is a list of repositories from your GitHub Organization. Use the button at the side of the repository you wish to add to Cocov to add it to this instance. As the list may be quite large, the field on the right can be used to filter through repositories.',
      ),
    ).toBeVisible()
    expect(container.querySelector('.searchField')).toBeVisible()
  })

  it('renders Header with "loading" param', () => {
    const { container } = render(<Header {...args} loading={true} />)

    expect(
      container.getElementsByClassName('react-loading-skeleton').length,
    ).toEqual(2)
  })

  it('renders Header snapshots', () => {
    const { container } = render(<Header {...args} />)

    expect(container).toMatchSnapshot()
  })
})
