"use client"

import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";


import { useUser } from "@/hooks/useUser";
import useUploadModel from "@/hooks/useUploadModal";


import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";
import { toast } from "@/hooks/use-toast";


const UploadModal = () => {
    const uploadModel = useUploadModel();
    const { user } = useUser();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const {
        reset,
        handleSubmit,
        register,
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModel.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {

    }

    return (
        <Modal
            title="Add a song"
            description="Upload a Mp3 file"
            isOpen={uploadModel.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Song author"
                />
                <div className="pb-1">
                    Select a song file
                    <Input
                        id="song"
                        type="file"
                        accept=".mp3"
                        disabled={isLoading}
                        {...register('song', { required: true })}
                    />
                </div>
                <div className="pb-1">
                    Select a song file
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        disabled={isLoading}
                        {...register('image', { required: true })}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-md text-white font-normal text-sm"
                >
                    Upload
                </Button>
            </form>
        </Modal >
    )
}

export default UploadModal
