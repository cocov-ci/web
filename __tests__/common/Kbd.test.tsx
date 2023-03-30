import { render, screen } from '@testing-library/react'

import Kbd from 'app/common/Kbd'

import '@testing-library/jest-dom'

describe('common/Kbd', () => {
  const KbdComponent = () => <Kbd text="esc" />

  it('renders Kbd without stats info', () => {
    render(<KbdComponent />)

    expect(screen.getByText('esc')).toBeVisible()
  })

  it('renders Kbd snapshots', () => {
    const { container } = render(<KbdComponent />)

    expect(container).toMatchSnapshot()
  })
})
