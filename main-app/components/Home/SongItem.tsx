"use client"

import PlayButton from "@/components/PlayButton"
import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@prisma/client"
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
      className="relative flex flex-col items-center justify-center p-3 overflow-hidden transition rounded-md cursor-pointer group gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10"
    >
      <div className="relative w-full h-full overflow-hidden rounded-md aspect-square">
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.webp"}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full p-4 gap-y-1">
        <p className="font-semibold truncate">
          {data.title}
        </p>
        <p className="text-sm truncate text-neutral-400">
          {data.artist}
        </p>
      </div>
      <div className="absolute right-5 bottom-24 ">
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem
