import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

import MediaItem from './MediaItem';

import useAuthModel from '@/hooks/useAuthModal'
import useUploadModel from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import useOnplay from '@/hooks/useOnPlay';
import { Song } from '@prisma/client';


type LibraryProps = {
    songs: Song[]
}

const Library: React.FC<LibraryProps> = ({
    songs
}) => {

    const { onOpen } = useAuthModel();
    const uploadModel = useUploadModel()
    const { user } = useUser()
    const onplay = useOnplay(songs);

    const onClick = () => {
        if (!user) {
            onOpen();
        }
        return uploadModel.onOpen();
    }
    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between p-5'>
                <div className='flex gap-2'>
                    <TbPlaylist size={26} className='text-neutral-400' />
                    <p className='font-medium text-neutral-400 text-md'>Your Library</p>
                </div>
                <AiOutlinePlus
                    size={20}
                    onClick={onClick}
                    className='transition cursor-pointer text-neutral-400 hover:text-white' />
            </div>
            <div className='flex flex-col px-3 mt-4 gap-y-2'>
                {
                    songs.length === 0 ? (
                        <div className='px-2'>
                            <p className='text-neutral-400'>
                                No song added
                            </p>
                        </div>
                    ) : (
                        songs.map((item) => (
                            <MediaItem
                                key={item.title}
                                onClick={onplay}
                                data={item}
                            />
                        ))
                    )
                }

            </div>
        </div>
    )
}

export default Library
