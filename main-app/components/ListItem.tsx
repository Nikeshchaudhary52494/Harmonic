"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaPlay } from "react-icons/fa"

import useAuthModel from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"

type ListItemProps = {
    image: string,
    href: string
}

export default function LikedSongButton({
    image,
    href
}: ListItemProps) {

    const router = useRouter();
    const { user } = useUser();
    const authModal = useAuthModel();

    const onClick = () => {
        if (!user)
            authModal.onOpen();
        else
            router.push(href);
    }

    return (
        <button
            onClick={onClick}
            className="flex relative bg-neutral-100/10 group overflow-hidden hover:bg-neutral-100/20 rounded-md transition items-center gap-x-4 ">
            <div className=" relative min-h-[64px] min-w-[64px]  ">
                <Image
                    className="object-cover"
                    src={image}
                    alt="Image"
                    fill
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