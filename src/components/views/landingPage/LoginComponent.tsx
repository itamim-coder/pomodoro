"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "@/components/views/landingPage/Navbar";
import Footer from "@/components/views/landingPage/Footer";
import MobileTopBar from "@/components/views/landingPage/MobileTopBar";
import MobileNav from "@/components/views/landingPage/MobileNav";

export default function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSignIn = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const data = {
            email,
            password,
            role: "patient",
        };

        const result = await signIn("moynaa-backend", {
            email: data.email,
            password: data.password,
            role: data.role,
            redirect: false,
        });
        console.log(result, "result");
        if (result?.ok) {
            toast.success("Login successful!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            })
            router.push("/");
        }
        if (!result?.ok && !result?.error) {
            toast.error(result?.error || "Failed to login", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            })
            router.refresh();
        }
    };

    return (
        <>
            <Navbar />
            <MobileTopBar />
            <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 place-items-center mt-5">
                <div className="flex items-center justify-center order-2 lg:order-1">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Login</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email below to login to your account
                            </p>
                        </div>

                        <form onSubmit={handleSignIn}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link
                                            href="/forgot-password"
                                            className="ml-auto inline-block text-sm underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="Your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <Image
                        src="https://ik.imagekit.io/xsmanrxwj/moynaa/Moynaa-login.png?updatedAt=1733844003864"
                        alt="Image"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
            <ToastContainer />
            <Footer />
            <MobileNav />
        </>
    );
}