import { fireEvent, render, screen } from '@testing-library/react'
import { LucideUserX } from 'lucide-react'

import AccessoryMenu from 'app/common/AccessoryMenu'
import { MenuItem } from 'app/common/Menu'

import '@testing-library/jest-dom'

describe('common/AccessoryMenu', () => {
  const { container } = render(
    <AccessoryMenu>
      <MenuItem href="." icon={LucideUserX} label="Revoke Admin" />
    </AccessoryMenu>,
  )

  it('renders AccessoryMenu', () => {
    expect(screen.getByRole('button')).toBeVisible()
  })

  it('triggers onClick event', () => {
    render(
      <AccessoryMenu>
        <MenuItem href="." icon={LucideUserX} label="Revoke Admin" />
      </AccessoryMenu>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Revoke Admin')).toBeVisible()
  })

  it('renderAccessoryMenu with "muted" param', () => {
    render(
      <AccessoryMenu muted>
        <MenuItem href="." icon={LucideUserX} label="Revoke Admin" />
      </AccessoryMenu>,
    )
    expect(screen.getByRole('button')).toBeVisible()
  })

  it('renders AccessoryMenu snapshots', () => {
    expect(container).toMatchSnapshot()
  })
})
