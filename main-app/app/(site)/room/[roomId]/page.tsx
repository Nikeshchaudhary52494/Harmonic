"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music, SendHorizonal, Link, Check } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { Song } from "@prisma/client";
import SearchContent from "../../search/components/SearchContent";
import SearchInput from "@/components/SearchInput";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "@/components/PlayerContent";
import useGetSongById from "@/hooks/useGetSongById";
import { useSocketContext } from "@/components/provider/socketProvider";
import { toast } from "@/hooks/use-toast";

export default function Room() {
    const { roomId } = useParams();
    const { socket, setCurrentRoom } = useSocketContext();

    const [message, setMessage] = useState<string>("");
    const [isInviteCopied, setIsInviteCopied] = useState(false);
    const { user } = useUser();
    const { messages } = useSocketContext();

    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const [searchResults, setSearchResults] = useState<Song[]>([]);

    const sendMessage = () => {
        if (message.trim()) {
            socket?.emit("send-message", roomId, message, user?.id, user?.name);
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };



    const copyInviteLink = () => {
        const link = typeof window !== "undefined" ? window.location.href : "";
        navigator.clipboard.writeText(link);
        setIsInviteCopied(true);
        setTimeout(() => setIsInviteCopied(false), 2000);
    };

    useEffect(() => {
        if (!roomId || !socket || !user) return;

        const rejoin = () => {
            const storedValue = localStorage.getItem(`harmonic-${roomId}-host`);
            const isHost = storedValue === "true";
            socket.emit("join-room", roomId, isHost, user.id, user.name, null);
            setCurrentRoom(roomId.toString());
            toast({
                description: "Room joined succesfully"
            })
        };

        rejoin();
    }, [roomId, socket, user]);

    return (
        <div className="flex flex-col w-full overflow-hidden text-white rounded-lg bg-gradient-to-b from-neutral-900 to-neutral-950">
            {/* Header */}
            <header className="p-4 border-b bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-neutral-800">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="flex items-center space-x-3">
                        <Music className="text-indigo-400" size={24} />
                        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
                            Music Room
                        </h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button
                            onClick={copyInviteLink}
                            className="w-8 h-8 text-white duration-200 bg-indigo-400 border rounded-full hover:bg-purple-400 border-neutral-700">
                            {isInviteCopied ?
                                <Check size={16} />
                                :
                                <Link size={16} />
                            }
                        </Button>
                        {user && (
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center justify-center w-8 h-8 font-bold text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col w-full max-w-6xl h-[calc(100vh-64px)] p-6 mx-auto space-y-4">
                {/* Player Section */}
                <section className="flex flex-col p-6 border bg-neutral-800/50 rounded-xl border-neutral-700 backdrop-blur-sm">
                    {
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="flex items-center text-xs font-medium tracking-wider uppercase text-neutral-400">
                                    <Music className="w-4 h-4 mr-2 text-indigo-400" />
                                    {song ? "Now Playing" : "No song selected"}
                                </h2>
                                <p className="mt-2 text-2xl font-bold">
                                    {song?.title || "Search for a song to play"}
                                </p>
                            </div>
                        </div>
                    }

                    {/* Player Controls */}
                    {
                        player.activeId && song && <PlayerContent song={song} key={song?.id} />
                    }
                </section>

                {/* Chat Section */}
                <section className="flex flex-1 overflow-hidden border bg-neutral-800/50 rounded-xl border-neutral-700 backdrop-blur-sm">
                    <div className="flex flex-col w-1/2 border-r border-neutral-700 shrink-0">
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.length > 0 ? (
                                    messages.slice(-10).map(({ message, username, userId }, index) => {
                                        const isCurrentUser = userId === user?.id;
                                        return (
                                            <div
                                                key={index}
                                                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-xs p-3 rounded-lg ${isCurrentUser
                                                        ? 'bg-purple-500 text-white rounded-br-none'
                                                        : 'bg-indigo-500 text-white rounded-bl-none'
                                                        }`}
                                                >
                                                    {!isCurrentUser && (
                                                        <p className="text-xs text-black/50 font-semibold">{username}</p>
                                                    )}
                                                    <p>{message}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex items-center justify-center h-full text-neutral-500">
                                        <p>No messages yet. Say hello!</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        <div className="p-4 border-t border-neutral-700 bg-neutral-800/50">
                            <div className="flex gap-3">
                                <Input
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    className="flex-1 text-white rounded-full bg-neutral-700 border-neutral-700 placeholder-neutral-500 focus:ring-2 focus:ring-indigo-500"
                                />
                                <Button
                                    onClick={sendMessage}
                                    disabled={!message.trim()}
                                    className={`w-10 h-10 ${!message.trim()
                                        ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                                        }`}
                                >
                                    <SendHorizonal size={20} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Search Section */}
                    <section className="flex flex-col w-full p-2 space-y-4">
                        <SearchInput setSearchResults={setSearchResults} />
                        <SearchContent songs={searchResults} />
                    </section>
                </section>
            </main>
        </div>
    );
}