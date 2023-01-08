import { Ghost } from 'lucide-react'

import Alert from 'app/common/Alert'

const Empty = () => {
  return (
    <Alert
      description="Your search did not yield results. Check if your spelling is correct, or try using other terms."
      icon={Ghost}
      title="No results"
    />
  )
}

export default Empty
