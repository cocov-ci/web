import { AlertTriangle, CheckCircle2, XSquare } from 'lucide-react'
import { ReactElement } from 'react'

import { SecretsCheckNameParams } from '.'

interface secretNameMapProps {
  response: SecretsCheckNameParams
  secretName: string
}

interface secretNameMapResponse {
  status: string
  message: string
  icon: ReactElement
}

export const secretNameMap = ({
  response,
  secretName,
}: secretNameMapProps): secretNameMapResponse | undefined => {
  if (!response) return undefined

  if (response?.code === 'secrets.invalid_name') {
    return {
      status: 'error',
      message: `Secret names must contain only alphanumeric characters (A-Z, a-z, 0-9) and underscores (_). Spaces are not allowed. They must begin with a letter (A-Z, a-z) or an underscore (_).`,
      icon: <XSquare />,
    }
  }

  switch (response.status) {
    case 'ok':
      return {
        status: 'success',
        message: 'Looks good!',
        icon: <CheckCircle2 />,
      }

    case 'conflict':
      return {
        status: 'error',
        message: `This repository already have a secret named ${secretName}.`,
        icon: <XSquare />,
      }
    case 'override':
      return {
        status: 'warning',
        message:
          'This repository will use this secret instead of the one shared by the organization.',
        icon: <AlertTriangle />,
      }
  }
}
