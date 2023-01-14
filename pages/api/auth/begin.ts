import { NextApiRequest, NextApiResponse } from 'next'

import { ApiErrorHandler } from 'utils/errorHandler'
import Fetcher from 'utils/fetchAPI'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { data } = await Fetcher(`${process.env.COCOV_API_URL}/auth/begin`, {
      method: 'POST',
      data: {
        redirect: `${process.env.COCOV_UI_URL}/auth/signin`,
      },
    })

    res.status(200).json(data)
  } catch (err) {
    if (err instanceof Error) {
      ApiErrorHandler({ res, err })
    }
  }
}
