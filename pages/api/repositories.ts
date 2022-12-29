import { NextApiRequest, NextApiResponse } from 'next'

import Fetcher from 'utils/fetchClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { data } = await Fetcher(`${process.env.API_URL}/v1/repositories`)

    res.status(200).json(data)
  } catch ({ err }) {
    res.status(400).json({ err })
  }
}
