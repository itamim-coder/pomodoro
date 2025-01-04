"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "../Logo";
import navMenus from "@/data/navMenus";
import { useSession } from "next-auth/react";
import ProfileButton from "../ProfileButton";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function Navbar() {
  const user = useAppSelector(selectCurrentUser);
  console.log(user);
  return (
    <>
      <header className="hidden lg:flex justify-center pt-4 shadow-2xl z-30">
        <div className="mx-auto flex items-center gap-2 py-2 px-2 lg:px-8 bg-background rounded-full fixed">
          <div className="w-full flex">
            <Link href="/" className="mr-4" prefetch={false}>
              <Logo />
            </Link>
            <ul className="flex items-center gap-6 mx-2">
              {navMenus.map((menu) => (
                <li key={menu.id}>
                  <Link
                    href={menu.url}
                    className="font-medium hover:font-semibold hover:text-primary hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {!user?.email && (
            <>
              <Link href="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
            </>
          )}
          <ThemeToggle />
          {user?.email && <ProfileButton />}
        </div>
      </header>
    </>
  );
}
