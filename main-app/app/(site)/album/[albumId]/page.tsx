import { getUser } from "@/actions/user/getUser";
import AlbumContent from "@/components/albumContent";
import Header from "@/components/Header";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function Album({ params }:
    {
        params: { albumId: string }
    }) {

    const { user } = await getUser();
    const album = await db.album.findUnique({
        where: {
            id: params.albumId
        },
        include: {
            songs: true,
        }
    });

    return (
        <div
            className="w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
            <Header user={user!}>
                <div className="mt-20">
                    <div
                        className="flex flex-col items-center md:flex-row gap-x-5">
                        <div className="relative w-32 h-32 lg:h-44 lg:w-44">
                            <Image
                                fill
                                className="object-cover rounded-lg"
                                alt="Playlist"
                                src={album?.imageFile || '/images/liked.webp'}
                            />
                        </div>
                        <div className="flex flex-col mt-4 gap-y-1 md:mt-0">
                            <p className="hidden text-sm font-semibold md:block">Album</p>
                            <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl">{album?.title}</h1>
                        </div>
                    </div>
                </div>
            </Header>
            <div>
                <AlbumContent songs={album?.songs!} />
            </div>
        </div>
    )
}