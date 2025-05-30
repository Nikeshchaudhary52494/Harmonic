import usePlayer from "./usePlayer";
import useAuthModel from "./useAuthModal";
import { useUser } from "./useUser";

interface song {
    id: string;
    title: string;
    imageFile: string;
}

const useOnplay = (songs: song[]) => {

    const player = usePlayer();
    const authModal = useAuthModel();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        player.setId(id);
        if (songs) {
            player.setIds(songs.map((song) => song.id));
        }
    }
    return onPlay;
}

export default useOnplay;