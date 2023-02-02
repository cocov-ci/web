'use client'

import { useState } from 'react'

import { BadgesProps, TemplateProps } from 'types/Badges'

import Box from '../Box'
import NavMenu from '../NavMenu'

import BadgeType from './BadgeType'

const Content = (badges: BadgesProps) => {
  const { templates } = badges

  const [activeItem, setActiveItem] = useState<TemplateProps>('html')

  return (
    <>
      <NavMenu active={activeItem} onChange={item => setActiveItem(item)} />
      <Box hasContent={true}>
        <BadgeType
          badge={templates['html'].coverage}
          source={templates[activeItem].coverage}
          title="Coverage Badge"
        />
        <BadgeType
          badge={templates['html'].issues}
          source={templates[activeItem].issues}
          title="Problems Badge"
        />
      </Box>
    </>
  )
}

export default Content
