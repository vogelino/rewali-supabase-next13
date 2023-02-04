
import { getGravatarProfile } from '@/utils/gravatarUtil'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const email = typeof req.query?.email === "string" ? req.query.email : undefined
  if (!email) {
    res.status(404).json({ status: 404, message: `Gravatar profile information for email "${email}" not found` })
    return
  }
  const gravatarProfile = await getGravatarProfile(email)
  if (!gravatarProfile) {
    res.status(404).json({ status: 404, message: `Gravatar profile information for email "${email}" not found` })
  }
  res.status(200).json(gravatarProfile)
}
