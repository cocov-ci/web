import { fireEvent, render, screen } from '@testing-library/react'
import { Search } from 'lucide-react'

import Textarea from 'app/common/Textarea'

import '@testing-library/jest-dom'

describe('common/Textarea', () => {
  it('renders Textarea', () => {
    const { container } = render(<Textarea type="text" />)

    expect(container.querySelector('textarea')).toBeVisible()
  })

  it('renders Textarea with "width" props', () => {
    const { container } = render(<Textarea type="text" width="200px" />)

    expect(container.querySelector('div')).toHaveAttribute(
      'style',
      'width: 200px;',
    )
  })

  it('renders Textarea with "icon" props', () => {
    const { container } = render(<Textarea icon={Search} type="text" />)

    expect(container.querySelector('svg')).toBeVisible()
  })

  it('renders Textarea with "value" props', () => {
    const { container } = render(
      <Textarea onChange={() => null} type="text" value="value here..." />,
    )

    expect(container.querySelector('textarea')).toHaveValue('value here...')
  })

  it('renders Textarea with "disabled" props', () => {
    const { container } = render(<Textarea disabled type="text" />)

    expect(container.querySelector('textarea')).toHaveAttribute('disabled')
  })

  it('renders Textarea with "placeholder" props', () => {
    render(<Textarea placeholder="placeholder here..." type="text" />)

    expect(screen.getByPlaceholderText('placeholder here...')).toBeVisible()
  })

  it('renders Textarea with "errored" props', () => {
    const { container } = render(<Textarea errored type="text" />)

    expect(container.querySelector('.errored')).toBeVisible()
  })

  it('renders Textarea with "label" props', () => {
    const { container } = render(<Textarea label="label here..." type="text" />)

    expect(container.querySelector('label')).toHaveTextContent('label here...')
  })

  it('renders Textarea with "loading" props', () => {
    const { container } = render(<Textarea loading type="text" />)

    expect(container.querySelector('.loadingVisible img')).toBeVisible()
  })

  it('renders Textarea with "variation" props', () => {
    const { container } = render(<Textarea type="text" variation="dark" />)

    expect(container.querySelector('div.dark')).toBeVisible()
  })

  it('renders Textarea with "onChange" props', () => {
    const handleOnChange = jest.fn()
    render(<Textarea onChange={handleOnChange} type="text" />)
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

    fireEvent.change(textarea, { target: { value: 'text here...' } })

    expect(handleOnChange).toHaveBeenCalledTimes(1)
    expect(textarea.value).toBe('text here...')
  })

  it('renders Textarea with "autoFocus" props', () => {
    render(<Textarea autoFocus type="text" />)

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(textarea).toHaveFocus()
  })

  it('tests onBlur event', () => {
    render(<Textarea type="text" />)

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    fireEvent.blur(textarea)
    expect(textarea).not.toHaveFocus()
  })

  it('tests capture textarea focus', () => {
    render(<Textarea label="label here..." type="text" />)

    const label = screen.getByText('label here...')
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

    fireEvent.click(label)
    expect(textarea).toHaveFocus()
  })

  it('renders Textarea with "onKeyDown" props', () => {
    const handleKeyDown = jest.fn()
    render(<Textarea onKeyDown={handleKeyDown} type="text" />)
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

    fireEvent.keyDown(textarea, { key: 'A', code: 'KeyA' })

    expect(handleKeyDown).toHaveBeenCalledTimes(1)
  })

  it('renders Textarea with "onKeyUp" props', () => {
    const handleKeyUp = jest.fn()
    render(<Textarea onKeyUp={handleKeyUp} type="text" />)
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

    fireEvent.keyUp(textarea, { key: 'A', code: 'KeyA' })

    expect(handleKeyUp).toHaveBeenCalledTimes(1)
  })

  it('renders Textarea snapshots', () => {
    const { container } = render(<Textarea type="text" />)
    expect(container).toMatchSnapshot()
  })
})
