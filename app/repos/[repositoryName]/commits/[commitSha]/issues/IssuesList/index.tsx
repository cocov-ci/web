'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { IssueProps } from 'types/Issues'

import Sidebar from '../Sidebar'

const states = ['active', 'ignored', 'all']

const IssuesList = ({
  issues,
  onItemChanged,
  loading,
}: {
  issues: IssueProps[]
  onItemChanged: (arg: string) => void
  loading: boolean
}) => {
  const searchParams = useSearchParams()
  const state = searchParams.get('state')

  const data = useMemo(
    () => ({
      'Active issues': issues?.filter(item => !item.ignored)?.length,
      'Ignored issues': issues?.filter(item => item.ignored)?.length,
    }),
    [issues],
  )

  const getStateByName = useMemo(
    () => (name: string) => {
      if (name === Object.keys(data)[0]) {
        return states[0]
      } else if (name === Object.keys(data)[1]) {
        return states[1]
      } else {
        return states[2]
      }
    },
    [data, states],
  )

  const getNameByState = useMemo(
    () => (state: string | null) => {
      if (state === states[0]) {
        return Object.keys(data)[0]
      } else if (state === states[1]) {
        return Object.keys(data)[1]
      } else {
        return 'All issues'
      }
    },
    [],
  )

  return (
    <Sidebar
      allItemsText="All issues"
      data={data}
      defaultSelectedItem={getNameByState(state)}
      loading={loading}
      onSelectItem={item => onItemChanged(getStateByName(item.name))}
    />
  )
}

export default IssuesList
