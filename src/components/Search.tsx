"use client"
import { GoogleBookApiType, googleBookToDatabaseBook } from "@/utils/googleBooksUtil";
import { imbdVideoToDatabaseVideo, IMDBSearchResultType } from "@/utils/imdbUtils";
import { useDebouncedCallback } from "use-debounce";
import Image from "next/image";
import { useCallback, useState } from "react";
import useSWR from 'swr'
import { useReWaList } from "@/utils/hooks/useReWaList";
import { useAuth } from "./AuthProvider";

async function searchBooksAndVideos(searchTerm?: string): Promise<{
  books: GoogleBookApiType[]
  videos: IMDBSearchResultType[]
}> {
  if (!searchTerm?.trim()) return { videos: [], books: [] }
  const res = await fetch(`/api/search/${encodeURIComponent(searchTerm)}`)
  const json = await res.json() as {
    books: GoogleBookApiType[]
    videos: IMDBSearchResultType[]
  } | { error: string }
  if ("error" in json) throw new Error(json.error)
  return {
    videos: json.videos || [],
    books: json.books || [],
  }
}

export default function Search(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const { data, error, isLoading } = useSWR([searchTerm], () => searchBooksAndVideos(searchTerm), {
    revalidateOnFocus: false,
  })
  const rewalistHook = useReWaList()
  const auth = useAuth()
  const userId = auth.user?.id

  const debouncedSetSearchTerm = useDebouncedCallback((term) => setSearchTerm(term), 500)

  const videoClickHandler = useCallback(async (video: IMDBSearchResultType) => {
    setFieldValue("");
    setSearchTerm("");
    if (!userId) return
    const parsedVideo = imbdVideoToDatabaseVideo(video)
    await rewalistHook.addVideoToRewalist(parsedVideo, userId)
  }, [setSearchTerm, setFieldValue, userId]);

  const bookClickHandler = useCallback(async (book: GoogleBookApiType) => {
    setFieldValue("");
    setSearchTerm("");
    if (!userId) return
    const parsedBook = googleBookToDatabaseBook(book)
    await rewalistHook.addBookToRewalist(parsedBook, userId)
  }, [setSearchTerm, setFieldValue, userId]);

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="mb-8 w-full border border-slate-200 p-4"
          type="text"
          onChange={(e) => {
            setFieldValue(e.target.value)
            debouncedSetSearchTerm(e.target.value)
          }}
          placeholder="Search a book here"
          value={fieldValue}
        />
      </form>
      {error && (
        <div className="py-4 border-b border-red-300 text-red-600">
          There was an error while searching for content:
          <code>{error}</code>
        </div>
      )}
      {isLoading && (
        <div className="py-4 border-b border-slate-100">
          Loading...
        </div>
      )}
      {data && (data?.books.length || 0 > 0 || data?.videos.length || 0 > 0) ? (
        <div className="mb-8 grid grid-cols-2 gap-6">
          <div>
            <h3 className="mb-3 text-lg font-bold">Books</h3>
            {data.books.map((result) => (
              <button
                key={result.id}
                className="border-100 grid min-h-[121px] w-full grid-cols-[72px,1fr,auto] items-center border-t text-left transition-colors hover:bg-slate-50"
                onClick={() => void bookClickHandler(result)}
              >
                <div className="relative h-full overflow-hidden bg-slate-50">
                  {result.volumeInfo.imageLinks?.smallThumbnail && (
                    <Image
                      src={result.volumeInfo.imageLinks?.smallThumbnail}
                      alt={`Book cover of "${result.volumeInfo.title}"`}
                      fill
                      sizes="72px"
                      className="absolute inset-0 object-cover"
                    />
                  )}
                </div>
                <div className="px-6 py-5">
                  <h2 className="font-bold leading-tight">
                    {result.volumeInfo.title}
                  </h2>
                  {result.volumeInfo.subtitle && (
                    <h3 className="mt-1 font-serif italic leading-tight text-slate-700">
                      {result.volumeInfo.subtitle}
                    </h3>
                  )}
                  {result.volumeInfo.authors &&
                    result.volumeInfo.authors?.length > 0 && (
                      <div className="mt-1 text-sm">
                        By {result.volumeInfo.authors.join(", ")}
                      </div>
                    )}
                </div>
                {result.volumeInfo.publishedDate && (
                  <span className="">
                    {new Date(result.volumeInfo.publishedDate).getFullYear()}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold">Movies</h3>
            {data.videos.slice(0, 10).map((result) => {
              const releaseYear = result.description.match(/(19|20)\d{2}/gi);
              const year =
                releaseYear && releaseYear.length >= 1
                  ? +releaseYear[0]
                  : undefined;

              return (
                <button
                  key={result.id}
                  className="border-100 grid min-h-[121px] w-full grid-cols-[72px,1fr,auto] items-center border-t text-left transition-colors hover:bg-slate-50"
                  onClick={() => void videoClickHandler(result)}
                >
                  <div className="relative h-full overflow-hidden bg-slate-50">
                    {result.image && (
                      <Image
                        src={result.image}
                        alt={`Film cover of "${result.title}"`}
                        fill
                        className="absolute inset-0 object-cover"
                        sizes="72px"
                      />
                    )}
                  </div>
                  <div className="px-6 py-5">
                    <h2 className="font-bold leading-tight">{result.title}</h2>
                    {result.genres && (
                      <h3 className="mt-1 inline-block max-w-sm font-serif italic leading-tight text-slate-700">
                        <span className="block truncate">{result.genres}</span>
                      </h3>
                    )}
                    {result.stars && (
                      <div className="mt-1 inline-block max-w-sm truncate text-sm">
                        <p className="truncate">{result.stars}</p>
                      </div>
                    )}
                  </div>
                  {year && <span className="">{year}</span>}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
