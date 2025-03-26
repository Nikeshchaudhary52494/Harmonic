"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Album } from "@prisma/client";
import { Calendar, Music, Trash2 } from "lucide-react";

const AlbumsTable = ({ albums }: { albums: Album[] }) => {

    const deleteAlbum = (albumId: string) => {

    }

    return (
        <Table>
            <TableHeader>
                <TableRow className='hover:bg-zinc-800/50'>
                    <TableHead className='w-[50px]'></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Release Year</TableHead>
                    <TableHead>Songs</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {albums.map((album: any) => (
                    <TableRow key={album.id} className='hover:bg-zinc-800/50'>
                        <TableCell>
                            <img src={album.imageFile} alt={album.artist} className='object-contain w-10 h-10 rounded' />
                        </TableCell>
                        <TableCell className='font-medium'>{album.artist}</TableCell>
                        <TableCell>{album.artist}</TableCell>
                        <TableCell>
                            <span className='inline-flex items-center gap-1 text-zinc-400'>
                                <Calendar className='w-4 h-4' />
                                {album.releaseYear}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className='inline-flex items-center gap-1 text-zinc-400'>
                                <Music className='w-4 h-4' />
                                {album._count.song} songs
                            </span>
                        </TableCell>
                        <TableCell className='text-right'>
                            <div className='flex justify-end gap-2'>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                                    onClick={() => deleteAlbum(album.id)}
                                >
                                    <Trash2 className='w-4 h-4' />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
export default AlbumsTable;
