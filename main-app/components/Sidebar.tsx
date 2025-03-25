"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import Box from "./Box"
import SidebarItem from "./SidebarItem"
import Library from "./Library"
import { Song } from "@prisma/client"

type Sidebarprops = {
    songs: Song[]
}

const Sidebar: React.FC<Sidebarprops> = ({
    songs
}) => {

    const pathname = usePathname();

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
        <div className="hidden md:flex flex-col gap-y-2 mr-2 bg-black h-full ">
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
    )
}

export default Sidebar
