import { NextApiRequest, NextApiResponse } from 'next'

import Fetcher from 'utils/fetchClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { data } = await Fetcher(
      `${process.env.COCOV_API_URL}/auth/exchange`,
      {
        method: 'POST',
        data: {
          ...req.body,
          redirect: `${process.env.COCOV_UI_URL}/auth/signin`,
        },
      },
    )

    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err)
  }
}
