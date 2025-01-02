"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import bloodGroups from '@/data/bloodgroups'
import { useCreatePatientMutation } from "@/redux/api/patientApi"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "@/components/views/landingPage/Navbar"
import Footer from "@/components/views/landingPage/Footer"
import MobileTopBar from "@/components/views/landingPage/MobileTopBar"
import MobileNav from "@/components/views/landingPage/MobileNav"

type FormData = {
    fullName: string;
    phoneNumber: string;
    age: number;
    bloodGroup: string;
    email: string;
    password: string;
};

export default function Register() {
    const [createPatient] = useCreatePatientMutation();
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            await createPatient(data);
            toast.success("Registered successful!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            })
            router.push('/login')
        } catch (error) {
            toast.error("Registration failed. Please try again.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            })
            alert("");
        }
    };

    return (
        <>
            <Navbar />
            <MobileTopBar />
            <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 place-items-center mt-20 mb-6">
                <div>
                    <Image
                        src="https://ik.imagekit.io/xsmanrxwj/moynaa/Moynaa-register.png?updatedAt=1733844328793"
                        alt="Image"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Register Now</h1>
                            <p className="text-muted-foreground">
                                Register to Moynaa for your Better Health Care
                            </p>
                        </div>
                        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    {...register("fullName", { required: "Full Name is required" })}
                                    placeholder="Ex. John Smith"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    {...register("phoneNumber", { required: "Phone Number is required" })}
                                    placeholder="Ex. +8801########"
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    {...register("age", { required: "Age is required", valueAsNumber: true })}
                                    type="number"
                                    placeholder="Your Age"
                                />
                                {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bloodGroup">Select Blood Group</Label>
                                <Select onValueChange={(value) => setValue("bloodGroup", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Blood Group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bloodGroups.map((group) => (
                                            <SelectItem key={group.id} value={group.group}>
                                                {group.group}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email", { required: "Email is required" })}
                                    type="email"
                                    placeholder="m@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    {...register("password", { required: "Password is required" })}
                                    type="password"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
            <MobileNav />
        </>
    )
}