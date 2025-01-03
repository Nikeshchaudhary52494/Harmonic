"use client"

import LikedButton from "@/components/LikedButton"
import MediaItem from "@/components/MediaItem"

import useOnplay from "@/hooks/useOnPlay"
import { Song } from "@prisma/client"


type SearchContentProps = {
    songs: Song[]
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {

    const onPlay = useOnplay(songs);

    if (songs.length === 0) {
        return (
            <div className="flex flex-col w-full px-6 gap-y-2 text-neutral-600 ">
                No songs found
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-y-2 w-fu;; px-6">
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
                        <LikedButton key={item.id} songId={item.id} />
                    </div>
                ))}
        </div>
    )
}

export default SearchContent;
