import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

const Library = () => {
    const onClick = () => {
        // handle upload song
    }
    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between p-5'>
                <div className='flex gap-2'>
                    <TbPlaylist size={26} className='text-neutral-400' />
                    <p className='text-neutral-400 text-md font-medium'>Your Library</p>
                </div>
                <AiOutlinePlus
                    size={20}
                    onClick={onClick}
                    className='text-neutral-400 hover:text-white cursor-pointer transition' />
            </div>
            <div className='flex flex-col gap-y-2 mt-4 px-3'>

            </div>
        </div>
    )
}

export default Library
