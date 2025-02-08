"use client"

import useGetSongById from '@/hooks/useGetSongById';
import usePlayer from '@/hooks/usePlayer'
import PlayerContent from './PlayerContent';

const Player = () => {

    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    if (!song || !player.activeId) {
        return null;
    }

    return (
        <div className='fixed bottom-0 bg-black w-full py-2 h-[8-px] px-4'>
            <PlayerContent
                key={song.id}
                song={song}
            />
        </div>
    )
}

export default Player
