"use client"

import useOnplay from "@/hooks/useOnPlay"

import MediaItem from "./MediaItem"
import LikedButton from "./LikedButton"

import { Song } from "@/types"

type LikedContentProps = {
    songs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    const onPlay = useOnplay(songs);
    if (songs.length === 0) {
        return (
            <div className="px-6">
                <p className="mt-4 text-sm text-neutral-400">No Liked song</p>
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

export default LikedContent;
