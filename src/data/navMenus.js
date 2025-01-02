const { UsersRound, DropletIcon, HomeIcon, UserIcon, AppWindowMac } = require("lucide-react");

const navMenus = [
    {
        id: 1,
        name: "Home",
        url: "/",
        icon: <HomeIcon className="w-6 h-6" />,
    },
    {
        id: 2,
        name: "Doctors",
        url: "/doctors",
        icon: <UsersRound className="w-6 h-6" />,
    },
    {
        id: 3,
        name: "Blogs",
        url: "/blogs",
        icon: <AppWindowMac className="w-6 h-6" />,
    },
    {
        id: 4,
        name: "Find Blood",
        url: "/find-blood",
        icon: <DropletIcon />,
    },
    {
        id: 5,
        name: "Profile",
        url: "/profile",
        icon: <UserIcon className="w-6 h-6" />,
    }
]

export default navMenus