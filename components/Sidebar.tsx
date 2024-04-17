"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import Box from "./Box"
import SidebarItem from "./SidebarItem"
import Library from "./Library"
import { Song } from "@/types"
import usePlayer from "@/hooks/usePlayer"
import { twMerge } from "tailwind-merge"

type Sidebarprops = {
    children: React.ReactNode,
    songs: Song[]
}

const Sidebar: React.FC<Sidebarprops> = ({
    children,
    songs
}) => {

    const pathname = usePathname();
    const player = usePlayer();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            lable: "Home",
            active: pathname === "/",
            href: "/"
        },
        {
            icon: BiSearch,
            lable: "Search",
            active: pathname !== "/",
            href: "/search"
        }
    ], [pathname])

    return (
        <div className={twMerge('flex h-full', player.activeId && "h-[calc(100%-80px)]")}>
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-2 p-5">
                        {
                            routes.map((item) => (
                                <SidebarItem
                                    key={item.lable}
                                    {...item} />
                            ))
                        }
                    </div>
                </Box>
                <Box className="h-full">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="flex-1 py-2">
                {children}
            </main>
        </div>
    )
}

export default Sidebar
