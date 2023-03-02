'use client'

import { useRouter } from 'next/navigation'

import Button from 'app/common/Button'
import PillNav from 'app/common/PillNav'
import useIssues from 'hooks/useIssues'
import { NavMenuProps } from 'types/Commits'

import Loading from './Loading'
import styles from './NavMenu.module.scss'

const menuItems = [
  { title: 'Issues', value: 'issues' as NavMenuProps },
  { title: 'Coverage', value: 'coverage' as NavMenuProps },
]

interface NavMenuComponentProps {
  active: NavMenuProps
  counter?: number
  loading?: boolean
  commitSha: string
  repositoryName: string
}

const NavMenu = ({
  active,
  counter,
  loading = false,
  repositoryName,
  commitSha,
}: NavMenuComponentProps) => {
  const isActive = (item: NavMenuProps) => active === item
  const router = useRouter()

  const onClick = (page: NavMenuProps) => {
    router.push(`/repos/${repositoryName}/commits/${commitSha}/${page}`)
  }

  if (loading) return <Loading />

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
