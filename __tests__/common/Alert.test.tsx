import { render, screen } from '@testing-library/react'
import { Ghost } from 'lucide-react'

import Alert from 'app/common/Alert'

import '@testing-library/jest-dom'

describe('common/Alert', () => {
  it('renders Alert with all params', () => {
    const { container } = render(
      <Alert
        description="description here.."
        icon={Ghost}
        title="title here.."
      />,
    )

    expect(screen.getByText('title here..')).toBeVisible()
    expect(screen.getByText('description here..')).toBeVisible()
    expect(container.querySelector('svg')).toBeVisible()
  })

  it('renders Alert only with "title" param', () => {
    const { container } = render(<Alert title="title here.." />)

    expect(container.querySelector('h2')).toBeTruthy()
    expect(container.querySelector('h3')).toBeFalsy()
    expect(container.querySelector('svg')).toBeFalsy()
  })

  it('renders Alert only with "description" param', () => {
    const { container } = render(<Alert description="description here.." />)

    expect(container.querySelector('h2')).toBeFalsy()
    expect(container.querySelector('h3')).toBeTruthy()
    expect(container.querySelector('svg')).toBeFalsy()
  })

  it('renders Alert only with "icon" param', () => {
    const { container } = render(<Alert icon={Ghost} />)

    expect(container.querySelector('h2')).toBeFalsy()
    expect(container.querySelector('h3')).toBeFalsy()
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders Alert snapshots', () => {
    const { container } = render(<Alert />)
    expect(container).toMatchSnapshot()
  })
})
