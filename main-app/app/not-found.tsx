import { getUser } from "@/actions/user/getUser";
import Header from "@/components/Header";

export default async function NotFound() {
    const { user } = await getUser();
    return (
        <div className="p-2">
            <Header user={user!} />
            <div className="flex items-center mt-40 flex-col">
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
            </div>
        </div>
    );
}
