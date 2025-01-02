import Link from "next/link"
import Logo from "../Logo"
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-muted py-8 sm:py-12 text-muted-foreground">
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
                <div className="flex flex-col items-start gap-4">
                    <Link href="#" className="flex items-center gap-2" prefetch={false}>
                        <Logo />
                        <span className="text-lg text-primary font-bold">MOYNAA</span>
                    </Link>
                    <p>
                        Connecting patients with top-rated doctors for exceptional healthcare.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="hover:text-primary" prefetch={false}>
                            <TwitterIcon className="h-6 w-6" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="hover:text-primary" prefetch={false}>
                            <FacebookIcon className="h-6 w-6" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="hover:text-primary" prefetch={false}>
                            <InstagramIcon className="h-6 w-6" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="hover:text-primary" prefetch={false}>
                            <LinkedinIcon className="h-6 w-6" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                </div>
                <div className="grid gap-2">
                    <h3 className="text-lg font-semibold">Contact</h3>
                    <address className="not-italic ">
                        <p>123 Main St, Anytown USA</p>
                        <p>
                            <a href="#" className="hover:underline">
                                +1 (234) 567-890
                            </a>
                        </p>
                        <p>
                            <a href="#" className="hover:underline">
                                info@moynaa.com
                            </a>
                        </p>
                    </address>
                </div>
                <div className="grid gap-2">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <nav className="grid gap-1">
                        <Link href="#" className="hover:underline" prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="hover:underline" prefetch={false}>
                            Services
                        </Link>
                        <Link href="#" className="hover:underline" prefetch={false}>
                            Doctors
                        </Link>
                        <Link href="#" className="hover:underline" prefetch={false}>
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="grid gap-2">
                    <h3 className="text-lg font-semibold">Legal</h3>
                    <nav className="grid gap-1">
                        <Link href="#" className="hover:underline" prefetch={false}>
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:underline" prefetch={false}>
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:underline" prefetch={false}>
                            Disclaimer
                        </Link>
                    </nav>
                </div>
            </div>
            <div className="mt-8 border-t border-muted pt-4 text-center text-sm">
                &copy; 2024 MOYNAA. All rights reserved.
            </div>
        </footer>
    )
}