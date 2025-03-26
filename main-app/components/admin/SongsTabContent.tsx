import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";
import { Album, Song } from "@prisma/client";

interface SongsTabContentProps {
    songs: Song[],
    albums: Album[]
}

const SongsTabContent = ({
    songs,
    albums
}: SongsTabContentProps) => {
    return (
        <Card className='bg-zinc-800/50 border-zinc-700/50'>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle className='flex items-center gap-2'>
                            <Music className='size-5 text-emerald-500' />
                            Songs Library
                        </CardTitle>
                        <CardDescription>Manage your music tracks</CardDescription>
                    </div>
                    <AddSongDialog albums={albums} />
                </div>
            </CardHeader>
            <CardContent>
                <SongsTable songs={songs} />
            </CardContent>
        </Card>
    );
};
export default SongsTabContent;
