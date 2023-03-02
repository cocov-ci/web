import { useContext } from 'react'

import { IssuesContext } from 'context/IssuesContext'

const useIssues = () => useContext(IssuesContext)

export default useIssues
