import Link from "next/link"
import Logo from "../Logo"
import ThemeToggle from "@/components/ThemeToggle"

const MobileTopBar = () => {
    return (
        <div className="w-full flex lg:hidden justify-between p-3">
            <Link href="#" prefetch={false}>
                <Logo />
            </Link>
            <ThemeToggle />
        </div>
    )
}

export default MobileTopBar