import {
    Library,
    ListMusic,
    PlayCircle,
    Users2
} from "lucide-react";
import StatsCard from "./stats-card";
import { db } from "@/lib/db";

export default async function DashboardStats() {

    const [totalUsers, totalAlbums, uniqueArtists, totalSongs] = await Promise.all([
        db.user.count(),
        db.album.count(),
        db.song.groupBy({
            by: ["artist"],
            _count: true,
        }),
        db.song.count()
    ]);

    const totalArtists = uniqueArtists.length;


    const statsData = [
        {
            icon: ListMusic,
            label: "Total Songs",
            bgColor: "bg-emerald-500/10",
            iconColor: "text-emerald-500",
            value: totalSongs
        },
        {
            icon: Library,
            label: "Total Albums",
            bgColor: "bg-violet-500/10",
            iconColor: "text-violet-500",
            value: totalAlbums
        },
        {
            icon: Users2,
            label: "Total Artists",
            bgColor: "bg-orange-500/10",
            iconColor: "text-orange-500",
            value: totalArtists
        },
        {
            icon: PlayCircle,
            label: "Total Users",
            bgColor: "bg-sky-500/10",
            iconColor: "text-sky-500",
            value: totalUsers
        },
    ];

    return (
        <div className='grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4 '>
            {statsData.map((stat) => (
                <StatsCard
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value.toString()}
                    bgColor={stat.bgColor}
                    iconColor={stat.iconColor}
                />
            ))}
        </div>
    );
};
