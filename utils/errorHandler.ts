import axios from 'axios'
import { NextApiResponse } from 'next'

export const ApiErrorHandler = ({
  err,
  res,
}: {
  err: Error
  res: NextApiResponse
}) => {
  if (axios.isAxiosError(err) && err.response) {
    return res.status(err.response.status).json(err.response.data)
  } else {
    return res.status(400).json(err)
  }
}

export const ErrorHandler = (code: string): string | null => {
  if (!code) return null

  switch (code) {
    case 'auth.invalid_token':
      return '/auth/signin?invalid_token=true'
    default:
      return null
  }
}
