"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Music, LogIn } from "lucide-react";
import Header from "./Header";
import { useUser } from "@/hooks/useUser";
import { useSocketContext } from "./provider/socketProvider";
import { toast } from "@/hooks/use-toast";
import useAuthModel from "@/hooks/useAuthModal";

const CreateRoom = () => {
    const [roomId, setRoomId] = useState("");
    const [open, setOpen] = useState(false);
    const { socket, isConnected, setCurrentRoom } = useSocketContext();
    const router = useRouter();
    const { user, loading } = useUser();
    const authModal = useAuthModel();

    const createRoom = () => {
        if (!isConnected && !loading) {
            toast({ description: "Error creating room", variant: "destructive" });
            return;
        }

        // Remove previous room entries
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith("harmonic-") && key.endsWith("-host")) {
                localStorage.removeItem(key);
            }
        });

        // Create a new room
        const newRoomId = uuidv4();
        localStorage.setItem(`harmonic-${newRoomId}-host`, "true");
        setCurrentRoom(newRoomId);
        socket?.emit("join-room", newRoomId, true, user?.id, user?.name, null);
        router.push(`/room/${newRoomId}`);
        setOpen(false);
    };



    const joinRoom = () => {
        if (!isConnected && !loading) {
            toast({ description: "error creating room", variant: "destructive" });
            return;
        }
        setCurrentRoom(roomId);
        socket?.emit('join-room', roomId, false, user?.id, user?.name, null);
        if (!roomId.trim()) return;
        router.push(`/room/${roomId}`);
        setOpen(false);
    };


    return (
        <div className="w-full bg-neutral-900">
            <Header user={user!} />
            <div className="flex flex-col items-center w-full h-full mt-24 space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <Music className="w-12 h-12 text-indigo-500" />
                    <h1 className="text-3xl font-bold text-white">Music Party</h1>
                    <p className="text-gray-500">Listen to music together with friends</p>
                </div>

                <Dialog open={open} onOpenChange={() => {
                    if (!user) {
                        authModal.onOpen();
                        return;
                    }
                    setOpen(!open)
                }}>
                    <DialogTrigger asChild>
                        <Button className="w-[400px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
                            <PlusCircle className="w-5 h-5" />
                            Start Listening
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 overflow-hidden border-none rounded-lg bg-neutral-900">
                        <div className="relative">
                            {/* Gradient header */}
                            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-center text-white">
                                        Start or Join a Room
                                    </DialogTitle>
                                </DialogHeader>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Create Room Button */}
                                <Button
                                    onClick={createRoom}
                                    className="w-full gap-3 py-6 text-lg text-white transition-all border bg-neutral-800 hover:bg-neutral-700 border-neutral-700 rounded-xl"
                                >
                                    <PlusCircle className="w-6 h-6 text-indigo-400" />
                                    <span className="text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
                                        Create New Room
                                    </span>
                                </Button>

                                {/* Divider */}
                                <div className="relative flex items-center">
                                    <div className="flex-grow border-t border-neutral-700"></div>
                                    <span className="flex-shrink mx-4 text-sm text-neutral-500">OR</span>
                                    <div className="flex-grow border-t border-neutral-700"></div>
                                </div>

                                {/* Join Room Section */}
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Input
                                            placeholder="Enter Room ID"
                                            value={roomId}
                                            onChange={(e) => setRoomId(e.target.value)}
                                            className="py-6 text-center text-white bg-neutral-800 border-neutral-700 placeholder-neutral-500 rounded-xl focus-visible:ring-indigo-500 focus-visible:ring-2"
                                        />
                                    </div>
                                    <Button
                                        onClick={joinRoom}
                                        disabled={!roomId.trim()}
                                        className={`w-full gap-3 py-6 text-lg rounded-xl transition-all ${!roomId.trim()
                                            ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                                            }`}
                                    >
                                        <LogIn />
                                        Join Existing Room
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <div className="text-sm text-gray-500">
                    <p>Create a room to start listening or join an existing one</p>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;