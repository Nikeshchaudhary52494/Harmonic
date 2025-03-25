"use client"

import SearchInput from "@/components/SearchInput"
import SearchContent from "./components/SearchContent"
import Header from "@/components/Header"
import { useState } from "react"
import { Song } from "@prisma/client"
import { useUser } from "@/hooks/useUser"



const Search = () => {
    const { user } = useUser();
    const [searchResults, setSearchResults] = useState<Song[]>([]);
    return (
        <div className="w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900 ">
            <Header user={user!} className="from-bg-neutral-900">
                <div className="flex flex-col mb-2 gap-y-6">
                    <h1 className="text-3xl font-semibold text-white">
                        Search
                    </h1>
                    <SearchInput
                        setSearchResults={setSearchResults}
                    />
                </div>
            </Header>
            <SearchContent songs={searchResults} />
        </div>
    )
}

export default Search;
