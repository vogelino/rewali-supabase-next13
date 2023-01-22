import { supabaseServer } from '@/utils/supabaseServer'

async function getBooks() {
  const serverClient = supabaseServer()
  const result = await serverClient.from('Book').select('*')
  return result
}

type BooksResponse = Awaited<ReturnType<typeof getBooks>>
export type BooksResponseSuccess = BooksResponse['data']
export type BooksResponseError = BooksResponse['error']

export default async function Home() {
  const { data: books } = await getBooks() as BooksResponse
  return (
    <>
      <pre>{JSON.stringify(books, null, 2)}</pre>
    </>
  )
}

