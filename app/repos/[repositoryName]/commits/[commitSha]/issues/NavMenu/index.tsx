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
  onChange: (arg: NavMenuProps) => void
  active: NavMenuProps
  counter?: number
  loading: boolean
}

const NavMenu = ({
  onChange,
  active,
  counter,
  loading = false,
}: NavMenuComponentProps) => {
  const isActive = (item: NavMenuProps) => active === item

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
          onClick={() => !isActive(item.value) && onChange(item.value)}
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
