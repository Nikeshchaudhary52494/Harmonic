import {
    Library,
    ListMusic,
    PlayCircle,
    Users2
} from "lucide-react";
import StatsCard from "./stats-card";

const DashboardStats = () => {

    const statsData = [
        {
            icon: ListMusic,
            label: "Total Songs",
            bgColor: "bg-emerald-500/10",
            iconColor: "text-emerald-500",
        },
        {
            icon: Library,
            label: "Total Albums",
            bgColor: "bg-violet-500/10",
            iconColor: "text-violet-500",
        },
        {
            icon: Users2,
            label: "Total Artists",
            bgColor: "bg-orange-500/10",
            iconColor: "text-orange-500",
        },
        {
            icon: PlayCircle,
            label: "Total Users",
            bgColor: "bg-sky-500/10",
            iconColor: "text-sky-500",
        },
    ];

    return (
        <div className='grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4 '>
            {statsData.map((stat) => (
                <StatsCard
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={"0"}
                    bgColor={stat.bgColor}
                    iconColor={stat.iconColor}
                />
            ))}
        </div>
    );
};
export default DashboardStats;
