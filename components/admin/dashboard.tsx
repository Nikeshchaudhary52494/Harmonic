import {
    Album,
    AudioLines,
    Music
} from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

import DashboardStats from "./dashboard-stats";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div
            className='min-h-screen p-8 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100'
        >
            <div className='flex gap-3 mb-8'>
                <Link href='/' className='rounded-lg'>
                    <AudioLines size={40} />
                </Link>
                <div>
                    <h1 className='text-3xl font-bold'>Admin dashboard</h1>
                    <p className='mt-1 text-zinc-400'>Manage your music catalog</p>
                </div>
            </div>

            <DashboardStats />

            <Tabs defaultValue='songs' className='space-y-6'>
                <TabsList className='p-1 bg-zinc-800/50'>
                    <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700'>
                        <Music className='mr-2 size-4' />
                        Songs
                    </TabsTrigger>
                    <TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700'>
                        <Album className='mr-2 size-4' />
                        Albums
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='songs'>
                </TabsContent>
                <TabsContent value='albums'>
                </TabsContent>
            </Tabs>
        </div>
    );
};
