"use client"

type ListItemProps = {
    image: string,
    name: string,
    href: string
}

const ListItem: React.FC<ListItemProps> = ({
    name,
    image,
    href
}) => {
    return (
        <div>
            List Items...
        </div>
    )
}

export default ListItem
