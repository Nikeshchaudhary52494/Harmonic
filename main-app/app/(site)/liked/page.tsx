import { getUser } from "@/actions/user/getUser";
import Header from "@/components/Header";
import LikedContent from "@/components/LikedContent";
import Image from "next/image";

const Liked = async () => {

    const { user } = await getUser();

    return (
        <div
            className="h-full w-full rounded-lg bg-neutral-900">
            <Header user={user!}>
                <div className="mt-20">
                    <div
                        className="flex flex-col items-center md:flex-row gap-x-5">
                        <div className="relative w-32 h-32 lg:h-44 lg:w-44">
                            <Image
                                fill
                                className="object-cover rounded-lg"
                                alt="Playlist"
                                src='/images/liked.webp'
                            />
                        </div>
                        <div className="flex flex-col mt-4 gap-y-1 md:mt-0">
                            <p className="hidden text-sm font-semibold md:block">PlayList</p>
                            <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl">Liked songs</h1>
                        </div>
                    </div>
                </div>
            </Header>
            <div>
                <LikedContent />
            </div>
        </div>
    )
}
export default Liked;