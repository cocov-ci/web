import { fireEvent, render, screen } from '@testing-library/react'

import SnippetBox from 'app/common/SnippetBox'

import '@testing-library/jest-dom'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
})

describe('common/SnippetBox', () => {
  it('renders SnippetBox', () => {
    render(
      <SnippetBox source="crt_d3e4ad8b6735a2fa04f546f68b51df73039463df16" />,
    )

    expect(screen.getByRole('textbox')).toHaveValue(
      'crt_d3e4ad8b6735a2fa04f546f68b51df73039463df16',
    )
  })

  it('triggers autoSelect event', () => {
    const handleEvent = jest.fn()

    render(
      <SnippetBox source="crt_d3e4ad8b6735a2fa04f546f68b51df73039463df16" />,
    )

    fireEvent.focus(screen.getByRole('textbox'), {
      target: { select: handleEvent },
    })

    expect(handleEvent).toHaveBeenCalledTimes(1)
  })

  it('renders SnippetBox snapshots', () => {
    const { container } = render(
      <SnippetBox source="crt_d3e4ad8b6735a2fa04f546f68b51df73039463df16" />,
    )

    expect(container).toMatchSnapshot()
  })
})
