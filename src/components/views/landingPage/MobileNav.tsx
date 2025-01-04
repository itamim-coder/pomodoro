import Link from "next/link";
import navMenus from "@/data/navMenus";

export default function MobileNav() {
    const mobileNavMenus = navMenus.filter((menu) => menu.id === 1 || menu.id === 4 || menu.id === 5);
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full bg-background shadow-2xl lg:hidden">
            <nav className="flex justify-around py-2">
                {
                    navMenus.map((item) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary"
                            prefetch={false}
                        >
                            {item.icon}
                            <span className="text-xs font-semibold">{item.name}</span>
                        </Link>
                    ))
                }
            </nav>
        </div>
    );
}