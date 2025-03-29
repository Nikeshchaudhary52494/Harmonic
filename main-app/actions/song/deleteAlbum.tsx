"use server"

import { db } from "@/lib/db"

export default async function deleteAlbum(albumId: string) {
    db.album.delete({
        where: {
            id: albumId
        }
    })
}
