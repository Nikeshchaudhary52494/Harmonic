import usePlayer from "./usePlayer";
import useAuthModel from "./useAuthModal";
import { useUser } from "./useUser";
import { Song } from "@prisma/client";

const useOnplay = (songs: Song[]) => {

    const player = usePlayer();
    const authModal = useAuthModel();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    }
    return onPlay;
}

export default useOnplay;