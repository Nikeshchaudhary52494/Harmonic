"use client"

import { Song } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useUser } from "@/hooks/useUser"
import MediaItem from "./MediaItem"
import LikedButton from "./LikedButton"

type LikedContentProps = {
    songs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {

    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user && !isLoading) {
            router.replace("/");
        }
    }, [isLoading, user, router])

    if (songs.length === 0) {
        return (
            <div className="px-6">
                <p className="text-sm text-neutral-400 mt-4">No Liked song</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {
                songs.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-x-4 w-full"
                    >
                        <div className="flex-1">
                            <MediaItem
                                onClick={() => { }}
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