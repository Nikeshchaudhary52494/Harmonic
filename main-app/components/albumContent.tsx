"use client"

import useOnplay from "@/hooks/useOnPlay"

import MediaItem from "./MediaItem"
import LikedButton from "./LikedButton"
import { Song } from "@prisma/client"


type AlbumContentProps = {
    songs: Song[]
}

export default function AlbumContent({
    songs
}: AlbumContentProps) {

    const onPlay = useOnplay(songs);
    if (songs.length === 0) {
        return (
            <div className="px-6">
                <p className="mt-4 text-sm text-neutral-400">No Song available</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col w-full p-6 gap-y-2">
            {
                songs.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center w-full gap-x-4"
                    >
                        <div className="flex-1">
                            <MediaItem
                                onClick={onPlay}
                                data={item}
                            />
                        </div>
                        <LikedButton songId={item.id} />
                    </div>
                ))
            }
        </div>
    )
}