import { NextApiRequest, NextApiResponse } from 'next'

import { fetchClient } from 'pages/api/fetch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = await fetchClient(`${process.env.API_URL}/auth/begin`, {
      method: 'POST',
      body: JSON.stringify(req.body),
    })

    res.status(200).json({ data })
  } catch ({ err }) {
    res.status(400).json({ err })
  }
}
