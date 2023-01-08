import { render, screen } from '@testing-library/react'
import { Ghost } from 'lucide-react'

import Alert from 'app/common/Alert'

import '@testing-library/jest-dom'

describe('Alert', () => {
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
})

it('renders Alert snapshots', () => {
  const { container } = render(<Alert />)
  expect(container).toMatchSnapshot()
})
