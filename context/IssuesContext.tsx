'use client'

import React, { createContext, useMemo } from 'react'

import { IssuesPropsContext, IssuesPropsProvider } from 'types/Issues'

export const IssuesContext = createContext<IssuesPropsContext>({
  repositoryName: '',
  commitSha: '',
  refetch: () => null,
})

const IssuesProvider = ({
  children,
  repositoryName,
  commitSha,
  refetch,
}: IssuesPropsProvider) => {
  const memoizedValue = useMemo(
    () => ({
      repositoryName,
      commitSha,
      refetch,
    }),
    [repositoryName, commitSha, refetch],
  )

  return (
    <IssuesContext.Provider value={memoizedValue}>
      {children}
    </IssuesContext.Provider>
  )
}

export default IssuesProvider
