"use client"

import Footer from "@/components/views/landingPage/Footer";
import MobileNav from "@/components/views/landingPage/MobileNav";
import MobileTopBar from "@/components/views/landingPage/MobileTopBar";
import Navbar from "@/components/views/landingPage/Navbar";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  let user;

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
  return (
    <>
      <main className="container mx-auto px-4 md:px-6 lg:px-8 bg-gradient-to-r from-background to-muted pb-20">
        <Navbar />
        <MobileTopBar />
        <div className="pt-10 lg:pt-28">{children}</div>
      </main>

      <MobileNav />
    </>
  );
}
