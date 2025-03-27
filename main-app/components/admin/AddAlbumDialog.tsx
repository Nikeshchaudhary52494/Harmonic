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
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";

const AddAlbumDialog = () => {
    const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [newAlbum, setNewAlbum] = useState({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            if (!imageFile) {
                return toast({
                    description: "Please upload an image",
                    variant: "destructive",
                })
            }

            const formData = new FormData();
            formData.append("title", newAlbum.title);
            formData.append("artist", newAlbum.artist);
            formData.append("releaseYear", newAlbum.releaseYear.toString());
            formData.append("imageFile", imageFile!);

            await axios.post("/api/add-album", formData)

            setNewAlbum({
                title: "",
                artist: "",
                releaseYear: new Date().getFullYear(),
            });
            setImageFile(null);
            setAlbumDialogOpen(false);
            toast({ description: "Album created successfully" })
        } catch (error: any) {
            toast({
                description: "Failed to create album",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
            <DialogTrigger asChild>
                <Button className='text-white bg-violet-500 hover:bg-violet-600'>
                    <Plus className='w-4 h-4 mr-2' />
                    Add Album
                </Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col h-full pt-40 md:p-4 md:h-fit bg-zinc-900 border-zinc-700'>
                <DialogHeader className="text-start">
                    <DialogTitle className="text-2xl">Add New Album</DialogTitle>
                    <DialogDescription>Add a new album to your collection</DialogDescription>
                </DialogHeader>
                <div className='py-4 space-y-4'>
                    <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        accept='image/*'
                        className='hidden'
                    />
                    <div
                        className='flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer border-zinc-700'
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className='text-center'>
                            <div className='inline-block p-3 mb-2 rounded-full bg-zinc-800'>
                                <Upload className='w-6 h-6 text-zinc-400' />
                            </div>
                            <div className='mb-2 text-sm text-zinc-400'>
                                {imageFile ? imageFile.name : "Upload album artwork"}
                            </div>
                            <Button variant='outline' size='sm' className='text-xs'>
                                Choose File
                            </Button>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Album Title</label>
                        <Input
                            value={newAlbum.title}
                            onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                            placeholder='Enter album title'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Artist</label>
                        <Input
                            value={newAlbum.artist}
                            onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                            placeholder='Enter artist name'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Release Year</label>
                        <Input
                            type='number'
                            value={newAlbum.releaseYear}
                            onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })}
                            className='bg-zinc-800 border-zinc-700'
                            placeholder='Enter release year'
                            min={1900}
                            max={new Date().getFullYear()}
                        />
                    </div>
                </div>
                <DialogFooter className="flex flex-row">
                    <Button onClick={() => setAlbumDialogOpen(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className='bg-violet-500 hover:bg-violet-600'
                        disabled={isLoading || !imageFile || !newAlbum.title || !newAlbum.artist}
                    >
                        {isLoading ? "Creating..." : "Add Album"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default AddAlbumDialog;
