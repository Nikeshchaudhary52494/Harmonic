"use client"

import { useRouter } from "next/navigation"
import { FaPlay } from "react-icons/fa"
import { MdFavorite } from "react-icons/md"

type ListItemProps = {
    image: string,
    name: string,
    href: string
}

const ListItem: React.FC<ListItemProps> = ({
    name,
    image,
    href
}) => {

    const router = useRouter();

    const onClick = () => {
        // add authentication before push
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            className="flex relative bg-neutral-100/10 group hover:bg-neutral-100/20 rounded-md transition items-center gap-x-4 ">
            <div className="min-h-[64px] min-w-[64px]  ">
                <MdFavorite
                    className="text-white bg-gradient-to-br h-full w-full p-4 from-blue-700 to-blue-300 rounded-lg aspect-square"
                />

            </div>
            <p className="text-neutral-400 group-hover:text-white transition font-medium">
                Liked songs
            </p>
            <div className="rounded-full opacity-0 absolute group-hover:opacity-100 transition hover:scale-110 bg-green-500 p-4 right-5">
                <FaPlay />
            </div>
        </button>
    )
}

export default ListItem
