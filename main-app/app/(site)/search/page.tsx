import SearchInput from "@/components/SearchInput"
import SearchContent from "./components/SearchContent"
import Header from "@/components/Header"
import { getUser } from "@/actions/user/getUser"

type SearchProps = {
    searchParams: {
        title: string
    }
}

const Search = async ({ searchParams }: SearchProps) => {
    const { user } = await getUser();
    return (
        <div className="w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900 ">
            <Header user={user!} className="from-bg-neutral-900">
                <div className="flex flex-col mb-2 gap-y-6">
                    <h1 className="text-3xl font-semibold text-white">
                        Search
                    </h1>
                    <SearchInput />
                </div>
            </Header>
            <SearchContent songs={[]} />
        </div>
    )
}

export default Search;
