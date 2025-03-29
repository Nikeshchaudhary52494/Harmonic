"use server";

import { db } from "@/lib/db";

export default async function likeSong(songId: string, userId: string) {
    try {
        const updatedUser = await db.user.update({
            where: {
                id: userId
            },
            data: {
                likedSongs: {
                    connect: {
                        id: songId
                    }
                }
            }
        });

        return { success: true, user: updatedUser };
    } catch (error) {
        return { success: false, message: "Error liking the song", error };
    }
}