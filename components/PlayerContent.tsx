"use client"

import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
// @ts-ignore
import useSound from "use-sound";


import MediaItem from "./MediaItem"
import LikedButton from "./LikedButton"
import Slider from "./Slider"

import usePlayer from "@/hooks/usePlayer"
import { useEffect, useState } from "react"
import { Song } from "@prisma/client";

type PlayerContentProps = {
    song: Song,
    songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {

    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);



    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;

    const onPlayNext = () => {
        if (!player || !player.ids) {
            return;
        }
        if (player.ids.length === 0) {
            return;
        }
        const currentIndex = player.ids.findIndex(id => id === song.id);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        } else {
            player.setId(nextSong);
        }
    };

    const onPlayPrevious = () => {
        if (!player || !player.ids) {
            return;
        }
        if (player.ids.length === 0) {
            return;
        }
        const currentIndex = player.ids.findIndex(id => id === song.id);
        const previousSong = player.ids[currentIndex - 1];
        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        } else {
            player.setId(previousSong);
        }
    };

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        });

    useEffect(() => {
        sound?.play();
        return () => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
            setIsPlaying(true);
        } else {
            pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    return (
        <div className="grid h-full grid-cols-2 md:grid-cols-3">
            <div className="flex justify-start w-full">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikedButton songId={song.id} />
                </div>
            </div>
            <div className="flex items-center justify-end w-full col-auto md:hidden">
                <div
                    onClick={handlePlay}
                    className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer o-1"
                >
                    <Icon
                        size={30}
                        className="text-black"
                    />
                </div>
            </div>
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
                    <Icon
                        size={30}
                        className="text-black"
                    />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className="transition cursor-pointer text-neutral-400 hover:text-white"
                />
            </div>
            <div className="justify-end hidden w-full pr-2 md:flex">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        size={34}
                        className="cursor-pointer"
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PlayerContent
