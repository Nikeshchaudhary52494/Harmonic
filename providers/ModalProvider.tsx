"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/Modal";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";


const ModalProvider = () => {

    const [isMounted, setIsMounded] = useState(false);

    useEffect(() => {
        setIsMounded(true)
    }, [])

    if (!isMounted)
        return null;

    return (
        <>
            <AuthModal />
            <UploadModal />
        </>
    )
}

export default ModalProvider
