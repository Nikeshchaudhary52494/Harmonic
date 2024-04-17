"use client"

import PlayButton from "@/components/PlayButton"
import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from "next/image"

type SongItemProps = {
  data: Song,
  onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick
}) => {

  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full  h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.webp"}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col  items-start w-full gap-y-1 p-4">
        <p className="font-semibold truncate">
          {data.title}
        </p>
        <p className="text-sm truncate text-neutral-400">
          {data.author}
        </p>
      </div>
      <div className="absolute right-5 bottom-24 ">
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem
