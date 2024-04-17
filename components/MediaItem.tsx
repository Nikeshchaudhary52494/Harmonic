import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from "next/image"

type MediaItemProps = {
    data: Song,
    onClick: (id: string) => void,
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
            className="flex gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md ">
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image
                    src={imagepath || '/images/liked.webp'}
                    alt="Image"
                    className="object-cover"
                    fill
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="truncate">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {data.author}
                </p>
            </div>
        </div>
    )
}

export default MediaItem
