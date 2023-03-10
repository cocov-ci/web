import { fireEvent, render, screen } from '@testing-library/react'

import AccessoryButton, {
  CheckIcon,
  CopyIcon,
  HelpIcon,
} from 'app/common/AccessoryButton'

import '@testing-library/jest-dom'

describe('common/AccessoryButton', () => {
  const { container } = render(
    <AccessoryButton kind="round">
      <HelpIcon />
    </AccessoryButton>,
  )

  it('renders AccessoryButton', () => {
    expect(screen.getByRole('button')).toBeVisible()
  })

  it('renders AccessoryButton with <a>', () => {
    const { container } = render(
      <AccessoryButton href="/" kind="squared">
        <CopyIcon />
      </AccessoryButton>,
    )

    expect(container.querySelector('a')).toBeVisible()
  })

  it('triggers onClick event', () => {
    const handleClick = jest.fn()
    render(
      <AccessoryButton kind="squared" onClick={handleClick}>
        <CheckIcon />
      </AccessoryButton>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders AccessoryButton snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
