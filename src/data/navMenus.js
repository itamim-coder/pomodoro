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
    name: "Timer",
    url: "/timer",
    icon: <UsersRound className="w-6 h-6" />,
  },
];

export default navMenus;
