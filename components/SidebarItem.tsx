import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

type SidebarItemProps = {
    icon: IconType,
    lable: string,
    href: string,
    active: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    lable,
    href,
    active
}) => {
    return (
        <div className={twMerge('flex gap-4 items-center py-1 font-medium text-neutral-400 text-md cursor-pointer transition hover:text-white', active && "text-white")}>
            <Icon size={26} />
            <p className='truncate'>{lable}</p>
        </div>
    )
}

export default SidebarItem
