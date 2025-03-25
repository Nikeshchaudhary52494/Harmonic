"use client"

import useGetSongById from '@/hooks/useGetSongById';
import usePlayer from '@/hooks/usePlayer'
import PlayerContent from './PlayerContent';
import { usePathname } from 'next/navigation';

const Player = () => {

    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const pathname = usePathname();

    if (pathname?.includes('/room/') || !song || !player.activeId) {
        return null;
    }

    return (
        <div className='h-20 mt-2 rounded-lg bg-[#171717]'>
            <PlayerContent
                key={song.id}
                song={song}
            />
        </div>
    )
}

export default Player
