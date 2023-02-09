'use client'

import { useRouter } from 'next/navigation'

import Button from 'app/common/Button'
import Loading from 'app/common/Loading'
import PillNav from 'app/common/PillNav'
import { NavMenuProps } from 'types/Commits'

import styles from './NavMenu.module.scss'

const menuItems = [
  { title: 'Issues', value: 'issues' as NavMenuProps },
  { title: 'Coverage', value: 'coverage' as NavMenuProps },
]

interface NavMenuComponentProps {
  active: NavMenuProps
  counter?: number
  loading: boolean
  commitSha: string
  repositoryName: string
}

const NavMenu = ({
  active,
  commitSha,
  repositoryName,
  counter,
  loading = false,
}: NavMenuComponentProps) => {
  const isActive = (item: NavMenuProps) => active === item
  const router = useRouter()

  const onClick = (page: NavMenuProps) => {
    router.push(`/repos/${repositoryName}/commits/${commitSha}/${page}`)
  }

  if (loading)
    return (
      <Loading
        className={styles.loading}
        height="50px"
        type="skeleton"
        width="216px"
      />
    )

  return (
    <PillNav className={styles.navMenu}>
      {menuItems.map(item => (
        <Button
          key={item.value}
          onClick={() => !isActive(item.value) && onClick(item.value)}
          style={isActive(item.value) ? 'secondary' : 'inactive'}
        >
          {counter && isActive(item.value)
            ? `${item.title} (${counter})`
            : item.title}
        </Button>
      ))}
    </PillNav>
  )
}

export default NavMenu
