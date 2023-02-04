import { searchGoogleBooks } from '@/utils/googleBooksUtil'
import { searchIMDBItems } from '@/utils/imdbUtils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const searchTerm = typeof req.query?.searchTerm === "string" ? req.query.searchTerm : undefined
    if (!searchTerm) {
      res.status(200).json({ video: [], books: [] })
      return
    }
    const [videos, books] = await Promise.all([
      searchIMDBItems(searchTerm),
      searchGoogleBooks(searchTerm),
    ])

    res.status(200).json({ videos: videos?.results || [], books: books?.items || [] })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: (error as Error).message })
  }
}
