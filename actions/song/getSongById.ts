"use server";

import { db } from "@/lib/db";
import { Song } from "@prisma/client";

export const getSongById = async (id: string): Promise<Song | null> => {
    if (!id) return null;

    try {
        const song = await db.song.findUnique({
            where: { id },
        });

        return song;
    } catch (error) {
        console.error("Error fetching song:", error);
        return null;
    }
};
