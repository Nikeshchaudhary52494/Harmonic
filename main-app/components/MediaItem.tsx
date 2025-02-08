import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@prisma/client";
import Image from "next/image"

type MediaItemProps = {
    data: Song,
    onClick?: (id: string) => void,
}

const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {

    const imagepath = useLoadImage(data);

    const handleClick = () => {
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
                    src={imagepath || '/images/liked.webp'}
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
