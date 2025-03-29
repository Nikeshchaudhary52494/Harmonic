"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import SidebarItem from "./SidebarItem"
import Library from "./Library"
import { Album } from "@prisma/client"

type Sidebarprops = {
    albums: Album[]
}

const Sidebar: React.FC<Sidebarprops> = ({
    albums
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
            active: pathname === "/search",
            href: "/search"
        }
    ], [pathname])

    return (
        <div className="flex-col hidden h-full mr-2 bg-black md:flex gap-y-2 ">
            <div className="w-full rounded-lg bg-neutral-900 h-fit">
                <div className="flex flex-col gap-2 p-5">
                    {
                        routes.map((item) => (
                            <SidebarItem
                                key={item.lable}
                                {...item} />
                        ))
                    }
                </div>
            </div>
            <div className="w-full h-full rounded-lg bg-neutral-900">
                <Library albums={albums} />
            </div>
        </div>
    )
}

export default Sidebar
