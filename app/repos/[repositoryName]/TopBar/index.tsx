'use client'

import Button from 'app/common/Button'
import PillNav from 'app/common/PillNav'
import TopBar from 'app/common/TopBar'
import { useSegments } from 'context/SegmentsContext'
import { RepositoryProps } from 'types/Repositories'

type index = 'summary' | 'badges' | 'settings' | undefined

interface NavButtonProps {
  index: index
  activeItem: index
  href: string
  text: string
}

const NavButton = ({ activeItem, index, text, href }: NavButtonProps) => {
  const isActive = activeItem === index

  return (
    <Button
      href={isActive ? undefined : href}
      style={isActive ? 'secondary' : 'inactive'}
    >
      {text}
    </Button>
  )
}

const TopBarComponent = ({
  name,
  default_branch,
  description,
}: RepositoryProps) => {
  const segments = useSegments()

  let activeItem: index

  if (segments.length >= 3 && segments[2] === 'branches') {
    activeItem = 'summary'
  } else if (segments.length === 3 && segments[2] === 'badges') {
    activeItem = 'badges'
  } else if (segments.length >= 3 && segments[2] === 'settings') {
    activeItem = 'settings'
  }

  return (
    <TopBar description={description} id="topBar" title={name}>
      <PillNav>
        <NavButton
          activeItem={activeItem}
          href={
            default_branch
              ? `/repos/${name}/branches/${default_branch}`
              : `/repos/${name}`
          }
          index="summary"
          text="Summary"
        />
        <NavButton
          activeItem={activeItem}
          href={`/repos/${name}/badges`}
          index="badges"
          text="Badges"
        />
        <NavButton
          activeItem={activeItem}
          href={`/repos/${name}/settings`}
          index="settings"
          text="Settings"
        />
      </PillNav>
    </TopBar>
  )
}

export default TopBarComponent
