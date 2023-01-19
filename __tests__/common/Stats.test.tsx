import { render } from '@testing-library/react'

import Stats from 'app/common/Stats'

import '@testing-library/jest-dom'

describe('common/Stats', () => {
  it('renders Stats component without data', () => {
    const { container } = render(<Stats data={undefined} type="coverage" />)

    expect(container.querySelectorAll('p')[0]).toHaveTextContent('Coverage')
    expect(container.querySelectorAll('p')[1]).toHaveTextContent('—')
  })

  it('renders Stats component with coverage type', () => {
    const { container } = render(<Stats data={{ value: 20 }} type="coverage" />)

    expect(container.querySelectorAll('p')[0]).toHaveTextContent('Coverage')
    expect(container.querySelectorAll('p')[1]).toHaveTextContent('20%')
  })

  it('renders Stats component with issues type', () => {
    const { container } = render(<Stats data={{ value: 20 }} type="issues" />)

    expect(container.querySelectorAll('p')[0]).toHaveTextContent('Issues')
    expect(container.querySelectorAll('p')[1]).toHaveTextContent('20')
  })

  it('renders Stats snapshots', () => {
    const { container } = render(<Stats data={undefined} type="coverage" />)
    expect(container).toMatchSnapshot()
  })
})
