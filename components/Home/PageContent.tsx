"use client"


import { Song } from "@prisma/client"
import SongItem from "./SongItem"

import useOnplay from "@/hooks/useOnPlay"

type PageContentProps = {
    songs: Song[]
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {

    const onPlay = useOnplay(songs);

    if (songs.length === 0) {
        return (
            <div>
                <p className="mt-4 text-sm text-neutral-400">No songs available!</p>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 ">
            {
                songs.map((item) => (
                    <SongItem
                        key={item.id}
                        onClick={onPlay}
                        data={item}
                    />
                ))
            }
        </div>
    )
}

export default PageContent
