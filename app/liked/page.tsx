import Header from "@/components/Header";
import LikedContent from "@/components/LikedContent";
import Image from "next/image";

import getLikedSongs from "@/actions/getLikedSongs"

const Liked = async () => {
    const songs = await getLikedSongs();

    return (
        <div
            className="bg-neutral-900 rounded-lg h-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div
                        className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative h-32 w-32  lg:h-44 lg:w-44">
                            <Image
                                fill
                                className="object-cover rounded-lg"
                                alt="Playlist"
                                src='/images/liked.webp'
                            />
                        </div>
                        <div className="flex flex-col gap-y-1 mt-4 md:mt-0">
                            <p className="hidden md:block font-semibold text-sm">PlayList</p>
                            <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl">Liked songs</h1>
                        </div>
                    </div>
                </div>
            </Header>
            <div>
                <LikedContent songs={songs} />
            </div>
        </div>
    )
}
export default Liked;