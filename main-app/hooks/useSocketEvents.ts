import { Messages } from "@/components/provider/socketProvider";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Socket } from "socket.io-client";
import usePlayer from "./usePlayer";
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";

export const useSocketEvents = (
    socket: Socket | null,
    isConnected: boolean,
    setMessages: Dispatch<SetStateAction<Messages[]>>,

) => {

    const player = usePlayer();
    const router = useRouter();

    useEffect(() => {
        if (!socket || !isConnected) return;

        const onNewMessage = (message: Messages) => {
            console.log("New message received:", message);
            setMessages((prev) => [...prev, message]);
        };

        const onPlayerStateUpdate = (data: any) => {
            player.setId(data.songId!)
        };

        const onRoomNotFound = () => {
            toast({
                description: "Room not found",
                variant: "destructive"
            });
            router.push("/room");
        }

        socket.on("new-message", onNewMessage);
        socket.on("sync-state", onPlayerStateUpdate);
        socket.on("room-not-found", onRoomNotFound);

        return () => {
            socket.off("new-message", onNewMessage);
            socket.off("sync-state", onPlayerStateUpdate);

        };
    }, [socket, isConnected, setMessages]);
};