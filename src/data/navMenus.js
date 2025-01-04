const {
  UsersRound,
  DropletIcon,
  HomeIcon,
  UserIcon,
  AppWindowMac,
} = require("lucide-react");

const navMenus = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "Focus",
    url: "/focus",
    icon: <UsersRound className="w-6 h-6" />,
  },

  {
    id: 3,
    name: "Profile",
    url: "/profile",
    icon: <UserIcon className="w-6 h-6" />,
  },
];

export default navMenus;
