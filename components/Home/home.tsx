import { getUser } from "@/actions/user/getUser";
import Header from "../Header";
import ListItem from "../ListItem";
import PageContent from "@/components/Home/PageContent";

export default async function Home() {
    const { user } = await getUser();
    return (
        <div className="h-full overflow-auto overflow-y-auto rounded-lg bg-neutral-900 ">
            <Header user={user!}>
                <div className="mt-2">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h1>
                    <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        <ListItem
                            name=""
                            href="/liked"
                            image="/images/liked.webp"
                        />
                    </div>
                </div>
            </Header>
            <div className="px-6 mt-2 mb-7">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-white">Newest songs </h1>
                </div>
                <div>
                    <PageContent songs={[]} />
                </div>
            </div>

        </div>
    );
}
