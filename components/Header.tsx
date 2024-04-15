"use client"

import { useRouter } from "next/navigation"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import { Button } from "./ui/button"

type HeaderProps = {
    children: React.ReactNode,
    className?: string
}
const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {

    const router = useRouter();

    const handleLogout = () => {
        // handle logout
    }

    return (
        <div className={twMerge("bg-gradient-to-b from-emerald-800 p-6", className)}>
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
                    <button onClick={() => router.forward()} className="rounded-full p-2 bg-white transition hover:bg-opacity-50">
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button onClick={() => router.forward()} className="rounded-full p-2 bg-white transition hover:bg-opacity-50">
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between">
                    <>
                        <div>
                            <Button className="bg-transparent text-neutral-300 font-medium" onClick={() => { }}>
                                sign up
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-white px-6 py-2 rounded-full text-black font-bold" onClick={() => { }}>
                                Login
                            </Button>
                        </div>
                    </>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header
