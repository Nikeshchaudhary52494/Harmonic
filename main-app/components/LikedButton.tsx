import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useUser } from "@/hooks/useUser";
import likeSong from "@/actions/song/likeSong";
import unlikeSong from "@/actions/song/unLikeSong";

type LikedButtonProps = {
    songId: string,
}

const LikedButton: React.FC<LikedButtonProps> = ({
    songId
}) => {

    const { user, refreshUser } = useUser();

    const [isLiked, setIsLiked] = useState(false);


    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (isLiked)
            await unlikeSong(songId, user?.id!);
        else
            await likeSong(songId, user?.id!);
        setIsLiked(!isLiked);
        refreshUser();
    }

    useEffect(() => {
        setIsLiked(user?.likedSongs.some(song => song.id === songId) ?? false);
        console.log("updating songs");
    }, [user, songId]);

    return (
        <button
            onClick={handleLike}
            className="hover:opacity-75 p-2 transition"
        >
            <Icon color={isLiked ? `#B87FF1` : `white`} size={25} />
        </button>
    )
}

export default LikedButton;
