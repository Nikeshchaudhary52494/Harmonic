import { getUser } from "@/actions/user/getUser"
import Header from "@/components/Header";


export default async function Profile() {
    const { user } = await getUser();
    return (
        <div className="w-full h-full overflow-auto overflow-y-auto rounded-lg bg-neutral-900 ">
            <Header user={user!}>
                <h1 className="text-3xl font-bold text-white">
                    Account Details
                </h1>
            </Header>
            <div className="px-6 space-y-4">

                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="font-bold uppercase">{user?.name}</span>
                        <span className="text-sm ">{user?.email}</span>
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="font-semibold text-gray-700">Edit Personal Information</p>
                    <button className="text-xs text-slate-400">Change your Profile Name or Email</button>
                </div>

                <button className="text-sm text-slate-400 hover:underline">Change Password</button>
            </div>

        </div>
    )
}