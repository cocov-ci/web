import Button from 'app/common/Button'
import PillNav from 'app/common/PillNav'
import { NavMenuProps } from 'types/Badges'

import styles from './NavMenu.module.scss'

const menuItems = [
  { title: 'HTML', value: 'html' as NavMenuProps },
  { title: 'Markdown', value: 'markdown' as NavMenuProps },
  { title: 'Textile', value: 'textile' as NavMenuProps },
  { title: 'RDOC', value: 'rdoc' as NavMenuProps },
  { title: 'reStructured Text', value: 'restructured' as NavMenuProps },
]

const NavMenu = ({
  onChange,
  active,
}: {
  onChange: (arg: NavMenuProps) => void
  active: NavMenuProps
}) => {
  const isActive = (item: NavMenuProps) => active === item

  return (
    <PillNav className={styles.navMenu}>
      {menuItems.map(item => (
        <Button
          key={item.value}
          onClick={() =>
            !isActive(item.value) && onChange(item.value as NavMenuProps)
          }
          style={isActive(item.value) ? 'secondary' : 'inactive'}
        >
          {item.title}
        </Button>
      ))}
    </PillNav>
  )
}

export default NavMenu
