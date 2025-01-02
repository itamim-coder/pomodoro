import { HeartPulse, Users2Icon, UsersRoundIcon } from "lucide-react"

const stats = [
    {
        id: 1,
        title: "Total Doctors",
        value: "100+",
        icon: <Users2Icon className="w-6 h-6 text-primary-foreground" />,
    },
    {
        id: 2,
        title: "Total Patients",
        value: "4050+",
        icon: <UsersRoundIcon className="w-6 h-6 text-primary" />,
    },
    {
        id: 3,
        title: "Satisfaction",
        value: "98%",
        icon: <HeartPulse className="w-6 h-6 text-primary" />
    }
]

export default stats