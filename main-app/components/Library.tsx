import { Library as LibraryIcon } from "lucide-react";

import { Album } from '@prisma/client';
import Image from "next/image";
import { useRouter } from "next/navigation";


type LibraryProps = {
    albums: Album[]
}

const Library: React.FC<LibraryProps> = ({
    albums
}) => {

    const router = useRouter();

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between p-5'>
                <div className='flex gap-2'>
                    <LibraryIcon size={26} className='text-neutral-400' />
                    <p className='font-medium text-neutral-400 text-md'>Albums</p>
                </div>
            </div>
            <div className='flex flex-col px-3 mt-4 gap-y-2'>
                {
                    albums.length === 0 ? (
                        <div className='px-2'>
                            <p className='text-neutral-400'>
                                No album added
                            </p>
                        </div>
                    ) : (
                        albums.map((item) => (
                            <div
                                onClick={() => router.push(`/album/${item.id}`)}
                                className="flex w-full p-2 rounded-md cursor-pointer gap-x-3 hover:bg-neutral-800/50 ">
                                <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                                    <Image
                                        src={item.imageFile || '/images/liked.webp'}
                                        alt="Image"
                                        className="object-cover"
                                        fill
                                    />
                                </div>
                                <div className="flex flex-col overflow-hidden gap-y-1">
                                    <p className="truncate">
                                        {item.title}
                                    </p>
                                    <p className="text-sm truncate text-neutral-400">
                                        {item.artist}
                                    </p>
                                </div>
                            </div>
                        ))
                    )
                }

            </div>
        </div>
    )
}

export default Library
