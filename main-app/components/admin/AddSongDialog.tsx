"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Album } from "@prisma/client";
import axios from "axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";

interface NewSong {
    title: string;
    artist: string;
    album: string;
    duration: string;
}

const AddSongDialog = ({ albums }: { albums: Album[] }) => {
    const [songDialogOpen, setSongDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [newSong, setNewSong] = useState<NewSong>({
        title: "",
        artist: "",
        album: "",
        duration: "",
    });

    const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
        audio: null,
        image: null,
    });

    const audioInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            if (!files.audio || !files.image) {
                return toast({
                    description: "Please upload both audio and image files",
                    variant: "destructive",
                })
            }

            const formData = new FormData();

            formData.append("title", newSong.title);
            formData.append("artist", newSong.artist);
            formData.append("duration", newSong.duration);
            if (newSong.album && newSong.album !== "none") {
                formData.append("albumId", newSong.album);
            }

            formData.append("audioFile", files.audio!);
            formData.append("imageFile", files.image!);

            await axios.post("/api/add-song", formData)

            setNewSong({
                title: "",
                artist: "",
                album: "",
                duration: "0",
            });

            setSongDialogOpen(false);

            setFiles({
                audio: null,
                image: null,
            });
            toast({ description: "Song added successfully" })
        } catch (error: any) {
            toast({
                description: "Failed to add song",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
            <DialogTrigger asChild>
                <Button className='text-black bg-emerald-500 hover:bg-emerald-600'>
                    <Plus className='w-4 h-4 mr-2' />
                    Add Song
                </Button>
            </DialogTrigger>

            <DialogContent className='bg-zinc-900 border-zinc-700 md:max-h-[85vh] md:h-fit md:p-4 h-full flex flex-col pt-40 overflow-auto md:pt-0'>
                <DialogHeader className="text-start">
                    <DialogTitle className="text-2xl">Add New Song</DialogTitle>
                    <DialogDescription>Add a new song to your music library</DialogDescription>
                </DialogHeader>

                <div className='py-4 space-y-4'>
                    <input
                        type='file'
                        accept='audio/*'
                        ref={audioInputRef}
                        hidden
                        onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))}
                    />

                    <input
                        type='file'
                        ref={imageInputRef}
                        className='hidden'
                        accept='image/*'
                        onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))}
                    />

                    {/* image upload area */}
                    <div
                        className='flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer border-zinc-700'
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <div className='text-center'>
                            {files.image ? (
                                <div className='space-y-2'>
                                    <div className='text-sm text-emerald-500'>Image selected:</div>
                                    <div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
                                </div>
                            ) : (
                                <>
                                    <div className='inline-block p-3 mb-2 rounded-full bg-zinc-800'>
                                        <Upload className='w-6 h-6 text-zinc-400' />
                                    </div>
                                    <div className='mb-2 text-sm text-zinc-400'>Upload artwork</div>
                                    <Button variant='outline' size='sm' className='text-xs bg-zinc-800 border-zinc-700'>
                                        Choose File
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Audio upload */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Audio File</label>
                        <div className='flex items-center gap-2'>
                            <Button variant='outline' onClick={() => audioInputRef.current?.click()} className='w-full bg-zinc-800 border-zinc-700'>
                                {files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
                            </Button>
                        </div>
                    </div>

                    {/* other fields */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Title</label>
                        <Input
                            placeholder="Interworld"
                            value={newSong.title}
                            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Artist</label>
                        <Input
                            placeholder="Ivan Belozerov"
                            value={newSong.artist}
                            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Duration (seconds)</label>
                        <Input
                            placeholder="120"
                            value={newSong.duration}
                            onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "0" })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Album (Optional)</label>
                        <Select
                            value={newSong.album}
                            onValueChange={(value) => setNewSong({ ...newSong, album: value })}
                        >
                            <SelectTrigger className='bg-zinc-800 border-zinc-700'>
                                <SelectValue placeholder='Select album' />
                            </SelectTrigger>
                            <SelectContent className='bg-zinc-800 border-zinc-700'>
                                <SelectItem value='none'>No Album (Single)</SelectItem>
                                {albums.map((album) => (
                                    <SelectItem key={album.id} value={album.id}>
                                        {album.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="flex flex-row justify-end gap-2">
                    <Button onClick={() => setSongDialogOpen(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || !newSong.album || !newSong.artist || !newSong.duration || !newSong.title}
                        className="bg-purple-500"
                    >
                        {isLoading ? "Uploading..." : "Add Song"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default AddSongDialog;
