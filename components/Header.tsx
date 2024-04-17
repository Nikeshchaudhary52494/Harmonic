"use client"

import { useRouter } from "next/navigation"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { FaUser } from "react-icons/fa"



import { useUser } from "@/hooks/useUser"
import useAuthModel from "@/hooks/useAuthModal"

import Button from "./Button"
import toast from "react-hot-toast"

type HeaderProps = {
    children: React.ReactNode,
    className?: string
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {

    const router = useRouter();
    const authModel = useAuthModel();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        router.refresh();

        // add function to pause any-ongoing song

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Logout successfully")
        }

    }

    return (
        <div className={twMerge("bg-gradient-to-b rounded-lg from-emerald-800 p-6", className)}>
            <div className="flex justify-between items-center mb-4">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button onClick={() => router.back()} className="rounded-full bg-black transition hover:bg-opacity-50">
                        <RxCaretLeft size={35} />
                    </button>
                    <button onClick={() => router.forward()} className="rounded-full bg-black transition hover:bg-opacity-50">
                        <RxCaretRight size={35} />
                    </button>

                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button onClick={() => router.replace('/')} className="rounded-full p-2 bg-white transition hover:bg-opacity-50">
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button onClick={() => router.replace('/search')} className="rounded-full p-2 bg-white transition hover:bg-opacity-50">
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between">
                    {
                        user ? (
                            <div className="flex gap-x-4 items-center">
                                <Button
                                    onClick={handleLogout}
                                    className="bg-white px-6 py-2 rounded-full text-black font-bold"
                                >
                                    Logout
                                </Button>
                                <Button
                                    onClick={() => router.push('/account')}
                                    className="bg-green-500">
                                    <FaUser />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <Button
                                        onClick={authModel.onOpen}
                                        className="bg-white px-6 py-2 rounded-full text-black font-bold">
                                        Login
                                    </Button>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header
