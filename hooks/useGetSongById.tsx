import { useEffect, useState, useMemo } from "react";
import { Song } from "@prisma/client";
import { getSongById } from "@/actions/song/getSongById";

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchSong = async () => {
            setIsLoading(true);
            try {
                const data = await getSongById(id);
                setSong(data);
            } catch (error) {
                console.error("Error fetching song:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSong();
    }, [id]);

    return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};

export default useGetSongById;
