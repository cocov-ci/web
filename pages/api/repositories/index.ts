import { NextApiRequest, NextApiResponse } from 'next'

import { ApiErrorHandler } from 'utils/errorHandler'
import Fetcher from 'utils/fetchAPI'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { data } = await Fetcher(
      `${process.env.COCOV_API_URL}/v1/repositories`,
      { headers: req.headers, params: { search_term: req.query.search_term } },
    )

    res.status(200).json(data)
  } catch (err) {
    if (err instanceof Error) {
      ApiErrorHandler({ res, err })
    }
  }
}
