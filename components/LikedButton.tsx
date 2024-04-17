import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";

import useAuthModel from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

type LikedButtonProps = {
    songId: string,
}

const LikedButton: React.FC<LikedButtonProps> = ({
    songId
}) => {

    const router = useRouter();
    const authModel = useAuthModel();
    const { user } = useUser();
    const { supabaseClient } = useSessionContext();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }
        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single()

            if (data && !error) {
                setIsLiked(true);
            }
        };
        fetchData();
    }, [songId, user?.id, supabaseClient]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user) {
            return authModel.onOpen();
        }

        if (isLiked) {
            const { error } = await supabaseClient
                .from('liked_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', songId)

            if (error)
                toast.error(error.message);
            else setIsLiked(false);
        } else {
            const { error } = await supabaseClient
                .from('liked_songs')
                .insert({
                    song_id: songId,
                    user_id: user.id
                });

            if (error)
                toast.error(error.message);
            else {
                setIsLiked(true);
                toast.success("Liked")
            }
        }
        router.refresh();
    }

    return (
        <button
            onClick={handleLike}
            className="hover:opacity-75 transition"
        >
            <Icon color={isLiked ? `#22c55e` : `white`} size={25} />
        </button>
    )
}

export default LikedButton;
