import { Card } from "@/components/ui/card"
import navMenus from "@/data/navMenus";
import Link from "next/link";

export default function MobileMenus() {
    return (
        <div className="lg:hidden">
            <h2 className="text-xl text-primary font-bold my-3">Menus</h2>
            <div className="grid grid-cols-3 gap-4 pb-10">
                {
                    navMenus.slice(1, 4).map((menu) => (
                        <Link key={menu.id} href={menu.url}>
                            <Card className="w-full flex-1 p-2 bg-inherit text-card-foreground hover:text-primary border-none shadow-xl">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="bg-secondary rounded-md p-3 flex items-center justify-center">
                                        {menu.icon}
                                    </div>
                                    <div>
                                        <p>{menu.name}</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}