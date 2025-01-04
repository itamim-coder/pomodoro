"use client";

import Link from "next/link";
import dashboardMenus from "@/data/dashboardMenus";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { USER_ROLE } from "@/constants/role";
import { SideBarItems } from "@/constants/sideBarItem";

const DashboardMenus = () => {
 
  const pathname = usePathname();
  return (
    <nav className="flex-1 px-4 py-6">
      <ul className="grid gap-2">
        {dashboardMenus.map((menu) => {
          const isActive = pathname === menu.link;
          return (
            <li key={menu.id}>
              <Link
                href={menu.link}
                className={`text-xs lg:text-base ${
                  isActive ? "bg-muted text-primary" : ""
                } flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground`}
                prefetch={false}
              >
                {menu.icon}
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DashboardMenus;
