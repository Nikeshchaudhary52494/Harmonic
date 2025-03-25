"use client"

import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import { Howl } from 'howler';

import MediaItem from "./MediaItem"
import LikedButton from "./LikedButton"
import { Slider } from "./ui/slider";

import usePlayer from "@/hooks/usePlayer"
import { useEffect, useRef, useState } from "react"
import { Song } from "@prisma/client";
import { useSocketContext } from "./provider/socketProvider";

interface PlayerContentProps {
    song: Song;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song }) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const { socket, isConnected, currentRoom } = useSocketContext();
    const soundRef = useRef<Howl | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
    const PlayIcon = isPlaying ? BsPauseFill : BsPlayFill;

    const onPlayNext = () => {
        if (!player.ids?.length) return;

        const currentIndex = player.ids.findIndex(id => id === song.id);
        const nextSong = player.ids[currentIndex + 1];

        player.setId(nextSong || player.ids[0]);
    };

    const onPlayPrevious = () => {
        if (!player.ids?.length) return;

        const currentIndex = player.ids.findIndex(id => id === song.id);
        const previousSong = player.ids[currentIndex - 1];

        player.setId(previousSong || player.ids[player.ids.length - 1]);
    };

    const handlePlay = () => {
        if (!soundRef.current) return;
        if (isConnected)
            if (isPlaying) {
                soundRef.current.pause();
                socket?.emit("control-playback", currentRoom, {
                    isPlaying: false,
                })
            } else {
                soundRef.current.play();
                socket?.emit("control-playback", currentRoom, {
                    isPlaying: true,
                })
                startProgressTracking();
            }
    };

    const toggleMute = () => {
        setVolume(volume === 0 ? 1 : 0);
    };

    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0];
        setVolume(newVolume);
        soundRef.current?.volume(newVolume);
    };

    const handleSeek = (value: number[]) => {
        const seekPosition = value[0];
        setProgress(seekPosition);
        soundRef.current?.seek(seekPosition);
    };

    const startProgressTracking = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        progressIntervalRef.current = setInterval(() => {
            if (soundRef.current && soundRef.current.playing()) {
                setProgress(soundRef.current.seek());
            }
        }, 1000);
    };

    useEffect(() => {
        soundRef.current = new Howl({
            src: [song.audioFile],
            volume: volume,
            html5: true,
            onplay: () => {
                setIsPlaying(true);
                startProgressTracking();
            },
            onpause: () => setIsPlaying(false),
            onend: () => {
                setIsPlaying(false);
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current);
                }
                onPlayNext();
            },
            onstop: () => setIsPlaying(false),
        });

        soundRef.current.play();

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            soundRef.current?.unload();
        };
    }, [song.audioFile]);

    useEffect(() => {
        if (!isConnected || !socket) return;

        const handleSyncState = (data: { isPlaying: boolean }) => {
            setIsPlaying(data.isPlaying);
            data.isPlaying ?
                soundRef.current?.play() :
                soundRef.current?.pause();
        };

        socket.on("sync-state", handleSyncState);

        return () => {
            socket.off("sync-state", handleSyncState);
        };
    }, [isConnected, socket, soundRef.current]);


    useEffect(() => {
        soundRef.current?.volume(volume);
    }, [volume]);

    return (
        <div className="grid h-full grid-cols-2 md:grid-cols-3">
            <div className="flex justify-start items-center w-full">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikedButton songId={song.id} />
                </div>
            </div>

            <div className="flex items-center justify-end w-full col-auto md:hidden">
                <div
                    onClick={handlePlay}
                    className="flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer"
                >
                    <PlayIcon size={30} className="text-black" />
                </div>
            </div>

            <div className="flex p-2 flex-col justify-center">
                <Slider
                    value={[progress]}
                    max={soundRef.current?.duration() || parseInt(song.duration) || 100}
                    onValueChange={handleSeek}
                    step={0.1}
                />
                <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                    <AiFillStepBackward
                        onClick={onPlayPrevious}
                        size={30}
                        className="transition cursor-pointer text-neutral-400 hover:text-white"
                    />
                    <div
                        onClick={handlePlay}
                        className="flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer"
                    >
                        <PlayIcon size={30} className="text-black" />
                    </div>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={30}
                        className="transition cursor-pointer text-neutral-400 hover:text-white"
                    />
                </div>
            </div>

            <div className="justify-end hidden w-full pr-2 md:flex">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        size={34}
                        className="cursor-pointer text-neutral-400 hover:text-white"
                    />
                    <Slider
                        value={[volume]}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerContent;