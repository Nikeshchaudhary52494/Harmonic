import { Song } from "@prisma/client";
import Image from "next/image"
import { useSocketContext } from "./provider/socketProvider";

type MediaItemProps = {
    data: Song,
    onClick?: (id: string) => void,
}

const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {

    const { socket, isConnected, currentRoom } = useSocketContext();

    const handleClick = () => {
        if (isConnected) {
            socket?.emit("control-playback", currentRoom, {
                songId: data.id,
                isPlaying: true,
                progress: 0,
            })
        }
        if (onClick) {
            return onClick(data.id)
        }
    }

    return (
        <div
            onClick={handleClick}
            className="flex w-full p-2 rounded-md cursor-pointer gap-x-3 hover:bg-neutral-800/50 ">
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image
                    src={data.imageFile || '/images/liked.webp'}
                    alt="Image"
                    className="object-cover"
                    fill
                />
            </div>
            <div className="flex flex-col overflow-hidden gap-y-1">
                <p className="truncate">
                    {data.title}
                </p>
                <p className="text-sm truncate text-neutral-400">
                    {data.artist}
                </p>
            </div>
        </div>
    )
}

export default MediaItem
