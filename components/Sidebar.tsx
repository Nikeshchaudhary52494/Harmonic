"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import Box from "./Box"
import SidebarItem from "./SidebarItem"
import Library from "./Library"

type Sidebarprops = {
    children: React.ReactNode
}

const Sidebar: React.FC<Sidebarprops> = ({
    children
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
        <div className="h-full flex">
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
                    <Library />
                </Box>
            </div>
            <main className="flex-1 py-2">
                {children}
            </main>
        </div>
    )
}

export default Sidebar
