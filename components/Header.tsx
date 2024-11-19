"use client"

import { usePathname, useRouter } from "next/navigation"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import { FaUser } from "react-icons/fa"

import useAuthModel from "@/hooks/useAuthModal"

import Button from "./Button"
import { logoutUser } from "@/actions/user/logoutUser"
import { toast } from "@/hooks/use-toast"
import { User } from "@prisma/client"
import { TbLayoutDashboardFilled } from "react-icons/tb"

type HeaderProps = {
    children: React.ReactNode,
    className?: string
    user: User
}

const Header: React.FC<HeaderProps> = ({
    children,
    className,
    user
}) => {

    const router = useRouter();
    const authModel = useAuthModel();
    const pathname = usePathname();
    const isAdmin = true;

    const handleLogout = async () => {
        const { error } = await logoutUser();
        if (error) {
            toast({ description: "error in logingout" })
        } else {
            toast({ description: "Logout successfully" })
        }

    }

    return (
        <div className={twMerge("bg-gradient-to-b rounded-lg from-emerald-800 p-6", className)}>
            <div className="flex items-center justify-between mb-4">
                <div className="items-center hidden md:flex gap-x-2">
                    <button onClick={() => router.back()} className="transition bg-black rounded-full hover:bg-opacity-50">
                        <RxCaretLeft size={35} />
                    </button>
                    <button onClick={() => router.forward()} className="transition bg-black rounded-full hover:bg-opacity-50">
                        <RxCaretRight size={35} />
                    </button>

                </div>
                <div className="flex items-center md:hidden gap-x-2">
                    <button onClick={() => router.replace('/')} className="p-2 transition bg-white rounded-full hover:bg-opacity-50">
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button onClick={() => router.replace('/search')} className="p-2 transition bg-white rounded-full hover:bg-opacity-50">
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between">
                    {
                        user ? (
                            <div className="flex items-center gap-x-4">
                                <Button
                                    onClick={handleLogout}
                                    className="px-6 py-2 font-bold text-black bg-white rounded-full"
                                >
                                    Logout
                                </Button>
                                {
                                    pathname !== "/account" &&
                                    <Button
                                        onClick={() => router.push('/account')}
                                        className="bg-green-500">
                                        <FaUser size={18} />
                                    </Button>
                                }
                                {isAdmin && (
                                    <Button
                                        onClick={() => router.push('/dashboard')}
                                        className="bg-green-500">
                                        <TbLayoutDashboardFilled size={18} />
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div>
                                    <Button
                                        onClick={authModel.onOpen}
                                        className="px-6 py-2 font-bold text-black bg-white rounded-full">
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
