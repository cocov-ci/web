'use client'

import { Trash } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import Pagination from 'app/common/Pagination'
import TopBar from 'app/common/TopBar'
import Empty from 'app/repos/Empty'
import ListItem from 'app/repos/ListItem'
import NoResults from 'app/repos/NoResults'
import TopBarActions from 'app/repos/TopBarActions'
import useBanner from 'hooks/useBanner'
import API, { useAPI } from 'utils/api'

const Adminland = () => {
  return (
    <div>
      Henlo
    </div>
  )
}

export default Adminland
