import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";

import { db } from "@/lib/db";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const albums = await db.album.findMany();

    return (
        <>
            <div className="flex flex-col h-full p-2 overflow-hidden">
                <div className="flex h-full">
                    <div className="w-[350px] hidden md:block h-full">
                        <Sidebar albums={albums} />
                    </div>
                    {children}
                </div>
                <Player />
            </div>
        </>
    )
}
