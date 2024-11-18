"use client"

import useUploadModel from "@/hooks/useUploadModal";
import Modal from "./Modal";
import UploadSongForm from "./admin/upload-song-form";


const UploadModal = () => {
    const uploadModel = useUploadModel();
    const onChange = (open: boolean) => {
        if (!open) {
            uploadModel.onClose();
        }
    }
    return (
        <Modal
            title="Add a song"
            description="Upload a Mp3 file"
            isOpen={uploadModel.isOpen}
            onChange={onChange}
        >
            <UploadSongForm />
        </Modal >
    )
}

export default UploadModal
