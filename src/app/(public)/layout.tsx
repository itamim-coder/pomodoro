"use client";

import MobileNav from "@/components/views/landingPage/MobileNav";
import MobileTopBar from "@/components/views/landingPage/MobileTopBar";
import Navbar from "@/components/views/landingPage/Navbar";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    // Early guard clause for missing token
    if (!token) {
      router.push("/login");
      return;
    }

    // Verify the token and decide access
    const user = verifyToken(token);
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(false); // Ensure the layout renders once verified
    }
  }, [token, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

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
