"use server"

import { db } from "@/lib/db"

export default async function deleteSong(songId: string) {
    db.song.delete({
        where: {
            id: songId
        }
    })
}
