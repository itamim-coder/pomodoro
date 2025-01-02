import { CalendarIcon, FileBoxIcon, HomeIcon, UserIcon } from "lucide-react"

const dashboardMenus = [
    {
        id: 1,
        name: 'Dashboard',
        icon: <HomeIcon className="h-5 w-5" />,
        link: '/dashboard',
    },
    {
        id: 2,
        name: 'My Profile',
        icon: <UserIcon className="h-5 w-5" />,
        link: '/profile',
    },
    {
        id: 3,
        name: 'Appointments',
        icon: <CalendarIcon className="h-5 w-5" />,
        link: '/appointments',
    },
    {
        id: 4,
        name: 'Medical Records',
        icon: <FileBoxIcon className="h-5 w-5" />,
        link: '/medical-records',
    }
]

export default dashboardMenus