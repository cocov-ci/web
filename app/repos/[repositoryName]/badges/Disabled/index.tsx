import { HeartCrack } from 'lucide-react'

import Alert from 'app/common/Alert'

import Box from '../Box'

const Disabled = () => (
  <Box hasContent={false}>
    <Alert
      description="This instance does not have a badge server configured. It must be configured to enable this feature."
      icon={HeartCrack}
      title="Badges are disabled"
    />
  </Box>
)

export default Disabled
