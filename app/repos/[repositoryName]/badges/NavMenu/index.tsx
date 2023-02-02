import Button from 'app/common/Button'
import PillNav from 'app/common/PillNav'
import { TemplateProps } from 'types/Badges'

import styles from './NavMenu.module.scss'

const menuItems = [
  { title: 'HTML', value: 'html' },
  { title: 'Markdown', value: 'markdown' },
  { title: 'Textile', value: 'textile' },
  { title: 'RDOC', value: 'rdoc' },
  { title: 'reStructured Text', value: 'restructured' },
]

const NavMenu = ({
  onChange,
  active,
}: {
  onChange: (arg: TemplateProps) => void
  active: TemplateProps
}) => {
  return (
    <PillNav className={styles.navMenu} lightMode={false}>
      {menuItems.map(item => (
        <Button
          key={item.value}
          onClick={() => onChange(item.value as TemplateProps)}
          style={active === item.value ? 'secondary' : 'inactive'}
        >
          {item.title}
        </Button>
      ))}
    </PillNav>
  )
}

export default NavMenu
