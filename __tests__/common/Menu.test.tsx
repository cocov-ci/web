import { fireEvent, render, screen } from '@testing-library/react'
import {
  LucideLogOut,
  LucideRefreshCw,
  LucideTrash2,
  LucideUserX,
} from 'lucide-react'

import { MenuContainer, MenuItem } from 'app/common/Menu'

import '@testing-library/jest-dom'

describe('common/Menu', () => {
  it('renders Menu', () => {
    const { container } = render(
      <MenuContainer>
        <MenuItem href="." icon={LucideUserX} label="Revoke Admin" />
        <MenuItem
          icon={LucideRefreshCw}
          label="Sync Permissions"
          onClick={() => jest.fn()}
        />
        <MenuItem icon={LucideLogOut} label="Force Logout" />
        <MenuItem danger icon={LucideTrash2} label="Delete..." />
      </MenuContainer>,
    )

    expect(container.querySelectorAll('.content a').length).toEqual(2)
    expect(container.querySelectorAll('.content .item').length).toEqual(4)
  })

  it('renders onClick function', () => {
    const handleEvent = jest.fn()
    render(
      <MenuContainer>
        <MenuItem
          icon={LucideRefreshCw}
          label="Sync Permissions"
          onClick={handleEvent}
        />
      </MenuContainer>,
    )

    fireEvent.click(screen.getByText('Sync Permissions'))
    expect(handleEvent).toHaveBeenCalledTimes(1)
  })

  it('renders Menu snapshots', () => {
    const { container } = render(
      <MenuContainer>
        <MenuItem href="." icon={LucideUserX} label="Revoke Admin" />
        <MenuItem
          icon={LucideRefreshCw}
          label="Sync Permissions"
          onClick={() => jest.fn()}
        />
        <MenuItem icon={LucideLogOut} label="Force Logout" />
        <MenuItem danger icon={LucideTrash2} label="Delete..." />
      </MenuContainer>,
    )

    expect(container).toMatchSnapshot()
  })
})
