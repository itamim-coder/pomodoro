const { CalendarIcon, UserIcon, ShieldIcon, StarIcon } = require("lucide-react");

const reasons = [
    {
        id: 1,
        title: "Easy Booking",
        description: "Quickly find and book appointments with top doctors in your area.",
        icon: <CalendarIcon className="h-6 w-6" />
    },
    {
        id: 2,
        title: "Patient-Centric",
        description: "Our platform is designed with the patient in mind, ensuring a seamless and personalized experience.",
        icon: <UserIcon className="h-6 w-6" />
    },
    {
        id: 3,
        title: "Secure & Reliable",
        description: "Our platform is built with the highest level of security and reliability, ensuring your data.",
        icon: <ShieldIcon className="h-6 w-6" />
    },
    {
        id: 4,
        title: "Top-Rated Doctors",
        description: "Access a network of highly-rated and experienced healthcare providers.",
        icon: <StarIcon className="h-6 w-6" />
    }
]

export default reasons