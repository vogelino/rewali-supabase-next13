"use client"
import { GoogleBookApiType } from "@/utils/googleBooksUtil";
import { IMDBSearchResultType } from "@/utils/imdbUtils";
import debounce from "lodash.debounce";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";

export default function Search(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const books = [] as GoogleBookApiType[]
  const videos = [] as IMDBSearchResultType[]

  const searchHandler = debounce(
    (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    500
  );

  const videoClickHandler = async (video: IMDBSearchResultType) => {
    setSearchTerm("");
    console.log(video)
  };

  const bookClickHandler = async (book: GoogleBookApiType) => {
    setSearchTerm("");
    console.log(book)
  };

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="mb-8 w-full border border-slate-200 p-4"
          type="text"
          onChange={searchHandler}
          placeholder="Search a book here"
          value={searchTerm}
        />
      </form>
      {books.length > 0 || videos.length > 0 ? (
        <div className="mb-8 grid grid-cols-2 gap-6">
          <div>
            <h3 className="mb-3 text-lg font-bold">Books</h3>
            {books.map((result) => (
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
            {videos.slice(0, 10).map((result) => {
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
