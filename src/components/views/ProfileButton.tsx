"use client";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

const ProfileButton = () => {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img
            src="/placeholder.svg"
            width="32"
            height="32"
            className="rounded-full"
            alt="Avatar"
            style={{ aspectRatio: "32/32", objectFit: "cover" }}
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
