"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";


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
        </>
    )
}

export default ModalProvider
