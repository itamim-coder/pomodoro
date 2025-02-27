"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Logo from "@/components/views/Logo";
import ProfileButton from "@/components/views/ProfileButton";
import DashboardMenus from "@/components/views/DashboardMenu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  let user: any;

  useEffect(() => {
    if (token) {
      user = verifyToken(token);
    }
    if (!user) {
      // removeUserInfo(authKey);
      return router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading]);
  console.log(user);
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-background">
      <aside className="flex-col border-r dark:border-muted bg-background hidden lg:flex">
        <div className="flex h-[60px] items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <Logo />
          </Link>
        </div>
        <DashboardMenus />
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-30 flex w-full h-14 items-center justify-between border-b dark:border-muted bg-background px-6 shadow-sm">
          <Sheet>
            <SheetTrigger className="border border-primary px-1 rounded-lg lg:hidden">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <h1 className="text-sm lg:text-lg font-semibold">
                    Student Dashboard
                  </h1>
                </SheetTitle>
                <SheetDescription>
                  <DashboardMenus />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <div className="items-center gap-4 hidden lg:flex">
            <h1 className="text-lg font-semibold">Student Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <ProfileButton />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
