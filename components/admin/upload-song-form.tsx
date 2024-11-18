"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import axios from 'axios'


import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateSongInput, createSongSchema } from "@/lib/validationSchemas";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import useUploadModel from "@/hooks/useUploadModal";

export default function UploadSongForm() {

    const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
        audio: null,
        image: null,
    });


    const form = useForm({
        resolver: zodResolver(createSongSchema),
        defaultValues: {
            title: "",
            audioFile: "",
            imageFile: "",
            artist: "",
            duration: "",
            albumId: ""
        },
    });

    const [isPending, startTransition] = useTransition();
    const { onClose } = useUploadModel();

    const onSubmit = (data: CreateSongInput) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("artist", data.artist);
            formData.append("duration", data.duration);
            if (data.albumId && data.albumId !== "none") {
                formData.append("albumId", data.albumId);
            }
            formData.append("audioFile", files.audio!);
            formData.append("imageFile", files.image!);
            console.log(files.audio)

            const response = await axios.post("/api/upload-song", formData)

            if (!response.data) {
                throw new Error('Network response was not ok');
            }

            if (response.status === 200) {
                toast({
                    description: "Song uploaded succesfully",
                })
                onClose();
            } else {
                toast({
                    variant: "destructive",
                    description: "Error while uploading songs",
                })
            }
        });
    };

    return (
        <div className="w-full space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Dil nu"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="artist"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Artist</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ap dillion"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>duration (seconds)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        placeholder="120"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="audioFile"
                        render={() => (
                            <FormItem>
                                <FormLabel>Audio file</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="audio/*"
                                        onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='imageFile'
                        render={() => (
                            <FormItem >
                                <FormLabel>
                                    <div
                                        className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
                                    >
                                        <div className='text-center'>
                                            {files.image ? (
                                                <div className='space-y-2'>
                                                    <div className='text-sm text-emerald-500'>Image selected:</div>
                                                    <div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
                                                        <Upload className='h-6 w-6 text-zinc-400' />
                                                    </div>
                                                    <div className='text-sm text-zinc-400 mb-2'>Upload imageFile</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </FormLabel>
                                <div className="flex flex-col space-y-2">
                                    <FormControl className='flex-1 text-gray-200'>
                                        <Input
                                            className="hidden"
                                            type='file'
                                            accept='image/*'
                                            placeholder='Add profile photo'
                                            onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button
                        className="bg-[#34b27b] p-6 w-full font-bold"
                        type="submit"
                        disabled={isPending}>
                        {isPending ? "Uploading.." : "Upload song"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
