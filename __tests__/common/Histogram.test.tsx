import { render, screen } from '@testing-library/react'

import Histogram from 'app/common/Histogram'

import '@testing-library/jest-dom'

const args = {
  values: [
    'Zero',
    'Ten',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
    'A Hundred',
  ].map((i, idx) => ({
    value: idx * 10,
    label: i,
    href: '/',
  })),
}

describe('common/Histogram', () => {
  it('renders Histogram', () => {
    render(<Histogram {...args} />)

    expect(screen.getByText('Zero')).toBeVisible()
    expect(screen.getByText('0')).toBeVisible()
    expect(screen.getByText('Ten')).toBeVisible()
    expect(screen.getByText('10')).toBeVisible()
  })

  it('renders Histogram without link', () => {
    const args = {
      values: ['Zero'].map((i, idx) => ({
        value: idx * 10,
        label: i,
      })),
    }

    render(<Histogram {...args} />)

    expect(screen.getByText('Zero')).toBeVisible()
    expect(screen.getByText('0')).toBeVisible()
  })

  it('renders Histogram snapshots', () => {
    const { container } = render(<Histogram {...args} />)

    expect(container).toMatchSnapshot()
  })
})
