"use server";

import { db } from "@/lib/db";
import { Song } from "@prisma/client";

export const searchSongs = async (query: string): Promise<Song[]> => {
    try {
        const songs = await db.song.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        artist: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            },
            include: {
                Album: true,
            },
            take: 5,
        });

        return songs;
    } catch (error) {
        console.error("Error searching songs:", error);
        return [];
    }
};