import { Song } from "@prisma/client";

const useLoadSong = (song: Song) => {

    if (!song) {
        return '';
    }

};

export default useLoadSong;