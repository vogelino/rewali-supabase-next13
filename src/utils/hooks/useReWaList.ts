import { ReWaListItemType } from "@/components/ReWaList";
import {
  addBookToRewalist,
  addVideoToRewalist,
  BookWithoutAutogeneratedType,
  DatabaseBookType,
  DatabaseVideoType,
  getRewalist,
  VideoWithoutAutogeneratedType,
} from "../rewalistUtil";
import useSWR, { KeyedMutator } from "swr";
import { supabaseClient as supabase } from "@/utils/supabaseClient";
import { useCallback, useRef } from "react";
import { rawVideoToReWaLiItem } from "../imdbUtils";
import { rawBookToReWaLiItem } from "../googleBooksUtil";

interface UseReWaListReturnType {
  rewalist: ReWaListItemType[];
  error: Error | null;
  addBookToRewalist: (
    book: BookWithoutAutogeneratedType,
  ) => void;
  addVideoToRewalist: (
    video: VideoWithoutAutogeneratedType,
  ) => void;
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function addBookMutation(
  book: BookWithoutAutogeneratedType,
  userId: string | undefined,
  rewalist: ReWaListItemType[],
): Promise<ReWaListItemType[]> {
  if (!userId) throw new Error("Not logged in");
  await delay(1000)
  const newBook = await addBookToRewalist(userId, book, supabase);
  const rewalistItem = rawBookToReWaLiItem(newBook);
  return [...rewalist, rewalistItem];
}

async function addVideoMutation(
  video: VideoWithoutAutogeneratedType,
  userId: string | undefined,
  rewalist: ReWaListItemType[],
): Promise<ReWaListItemType[]> {
  if (!userId) throw new Error("Not logged in");
  await delay(1000)
  const newVideo = await addVideoToRewalist(userId, video, supabase);
  const rewalistItem = rawVideoToReWaLiItem(newVideo);
  return [...rewalist, rewalistItem];
}

type ItemWithoutAutoProps<ItemType> = Omit<ItemType, 'id' | 'created_at' | 'updated_at'>

interface ItemAdderFactoryInputType<ItemType> {
  userId: string | undefined;
  rewalist: ReWaListItemType[];
  mapperFunction: (rawItem: ItemType) => ReWaListItemType;
  adderFunction: (
    rawItem: ItemWithoutAutoProps<ItemType>,
    userId: string | undefined,
    data: ReWaListItemType[]
  ) => Promise<ReWaListItemType[]>;
  optimisticId: number;
  mutate: KeyedMutator<ReWaListItemType[]>
}

function createItemAdder<ItemType>({
  userId,
  rewalist,
  mapperFunction,
  adderFunction,
  optimisticId,
  mutate,
}: ItemAdderFactoryInputType<ItemType>) {
  return (item: ItemWithoutAutoProps<ItemType>) => {
    if (!userId || !rewalist) return;
    const optimisticItem = mapperFunction({
      ...item,
      id: optimisticId += 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as ItemType);
    mutate(adderFunction(item, userId, rewalist), {
      optimisticData: [optimisticItem, ...rewalist]
        .sort((a, b) => a.title.localeCompare(b.title, 'en')),
      populateCache: true,
      rollbackOnError: true,
    });
  }
}

async function swrFetcher(userId: string | undefined): Promise<ReWaListItemType[]> {
  if (!userId) return [] as ReWaListItemType[];
  return getRewalist(userId, supabase);
}

export function useReWaList(
  userId: string | undefined,
  initialReWaList?: ReWaListItemType[],
): UseReWaListReturnType {
  const lastId = useRef(999999);

  const { mutate, data, error } = useSWR<ReWaListItemType[]>(
    userId,
    swrFetcher,
    { fallbackData: initialReWaList }
  );

  const addBookToRewalist = useCallback(
    createItemAdder<DatabaseBookType>({
      userId,
      rewalist: data || [],
      mapperFunction: rawBookToReWaLiItem,
      adderFunction: addBookMutation,
      optimisticId: lastId.current,
      mutate,
    }),
    [userId, data]
  )

  const addVideoToRewalist = useCallback(
    createItemAdder<DatabaseVideoType>({
      userId,
      rewalist: data || [],
      mapperFunction: rawVideoToReWaLiItem,
      adderFunction: addVideoMutation,
      optimisticId: lastId.current,
      mutate,
    }),
    [userId, data]
  )

  return {
    rewalist: (data || [])
      .sort((a, b) => a.title.localeCompare(b.title, 'en')),
    error: error || null,
    addBookToRewalist,
    addVideoToRewalist,
  };
}
