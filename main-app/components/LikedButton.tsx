import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

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

    const [isLiked, setIsLiked] = useState(false);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
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
