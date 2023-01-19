import { fireEvent, render, screen } from '@testing-library/react'
import { Search } from 'lucide-react'

import Input from 'app/common/Input'

import '@testing-library/jest-dom'

describe('common/Input', () => {
  it('renders Input', () => {
    const { container } = render(<Input type="text" />)

    expect(container.querySelector('input')).toBeVisible()
  })

  it('renders Input with "width" props', () => {
    const { container } = render(<Input type="text" width="200px" />)

    expect(container.querySelector('div')).toHaveAttribute(
      'style',
      'width: 200px;',
    )
  })

  it('renders Input with "icon" props', () => {
    const { container } = render(<Input icon={Search} type="text" />)

    expect(container.querySelector('svg')).toBeVisible()
  })

  it('renders Input with "value" props', () => {
    const { container } = render(
      <Input onChange={() => null} type="text" value="value here..." />,
    )

    expect(container.querySelector('input')).toHaveValue('value here...')
  })

  it('renders Input with "disabled" props', () => {
    const { container } = render(<Input disabled type="text" />)

    expect(container.querySelector('input')).toHaveAttribute('disabled')
  })

  it('renders Input with "placeholder" props', () => {
    render(<Input placeholder="placeholder here..." type="text" />)

    expect(screen.getByPlaceholderText('placeholder here...')).toBeVisible()
  })

  it('renders Input with "errored" props', () => {
    const { container } = render(<Input errored type="text" />)

    expect(container.querySelector('.errored')).toBeVisible()
  })

  it('renders Input with "label" props', () => {
    const { container } = render(<Input label="label here..." type="text" />)

    expect(container.querySelector('label')).toHaveTextContent('label here...')
  })

  it('renders Input with "loading" props', () => {
    const { container } = render(<Input loading type="text" />)

    expect(container.querySelector('.loadingVisible img')).toBeVisible()
  })

  it('renders Input with "variation" props', () => {
    const { container } = render(<Input type="text" variation="dark" />)

    expect(container.querySelector('div.dark')).toBeVisible()
  })

  it('renders Input with "onChange" props', () => {
    const handleOnChange = jest.fn()
    render(<Input onChange={handleOnChange} type="text" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'text here...' } })

    expect(handleOnChange).toHaveBeenCalledTimes(1)
    expect(input.value).toBe('text here...')
  })

  it('renders Input with "autoFocus" props', () => {
    render(<Input autoFocus type="text" />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input).toHaveFocus()
  })

  it('tests onBlur event', () => {
    render(<Input type="text" />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.blur(input)
    expect(input).not.toHaveFocus()
  })

  it('tests capture input focus', () => {
    render(<Input label="label here..." type="text" />)

    const label = screen.getByText('label here...')
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.click(label)
    expect(input).toHaveFocus()
  })

  it('renders Input with "onKeyDown" props', () => {
    const handleKeyDown = jest.fn()
    render(<Input onKeyDown={handleKeyDown} type="text" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.keyDown(input, { key: 'A', code: 'KeyA' })

    expect(handleKeyDown).toHaveBeenCalledTimes(1)
  })

  it('renders Input with "onKeyUp" props', () => {
    const handleKeyUp = jest.fn()
    render(<Input onKeyUp={handleKeyUp} type="text" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.keyUp(input, { key: 'A', code: 'KeyA' })

    expect(handleKeyUp).toHaveBeenCalledTimes(1)
  })

  it('renders Input snapshots', () => {
    const { container } = render(<Input type="text" />)
    expect(container).toMatchSnapshot()
  })
})
