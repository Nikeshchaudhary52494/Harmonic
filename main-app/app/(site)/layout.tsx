import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";

import { db } from "@/lib/db";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const songs = await db.song.findMany();

    return (
        <>
            <div className="flex h-full p-2 flex-col overflow-hidden">
                <div className="flex h-full">
                    <div className="w-[350px] h-full">
                        <Sidebar songs={songs} />
                    </div>
                    {children}
                </div>
                <Player />
            </div>
        </>
    )
}
