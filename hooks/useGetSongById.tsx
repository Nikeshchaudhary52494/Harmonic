import { Song } from "@/types";
import { useEffect, useMemo, useState } from "react"

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined>(undefined);


    return useMemo(() => ({
        isLoading,
        song
    }), [isLoading, song]);
};

export default useGetSongById;