const { HeartPulseIcon, BrainIcon, TreesIcon, BoneIcon, StickerIcon, SkullIcon, EyeIcon, EarIcon } = require("lucide-react");

const allSpecialities = [
    {
        id: 1,
        name: 'Cardiology',
        description: 'Comprehensive heart and vascular care.',
        icon: <HeartPulseIcon className="w-4 h-4" />,
    },
    {
        id: 2,
        name: 'Neurology',
        description: 'Comprehensive care for neurological conditions.',
        icon: <BrainIcon className="w-4 h-4" />,
    },
    {
        id: 3,
        name: 'Pulmonology',
        description: 'Comprehensive care for respiratory health.',
        icon: <TreesIcon className="w-4 h-4" />,
    },
    {
        id: 4,
        name: 'Orthopedics',
        description: 'Comprehensive care for musculoskeletal health.',
        icon: <BoneIcon className="w-4 h-4" />,
    },
    {
        id: 5,
        name: 'Gastroenterology',
        description: 'Comprehensive care for digestive health.',
        icon: <StickerIcon className="w-4 h-4" />,
    },
    {
        id: 6,
        name: 'Dermatology',
        description: 'Comprehensive care for skin health.',
        icon: <SkullIcon className="w-4 h-4" />,
    },
    {
        id: 7,
        name: 'Ophthalmology',
        description: 'Comprehensive care for eye health.',
        icon: <EyeIcon className="w-4 h-4" />,
    },
    {
        id: 8,
        name: 'Otolaryngology',
        description: 'Comprehensive care for ear, nose, and throat health.',
        icon: <EarIcon className="w-4 h-4" />,
    }
]

export default allSpecialities