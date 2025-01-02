"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useSinglePatientQuery,
  useUpdateProfileMutation,
} from "@/redux/api/patientApi";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { Camera } from "lucide-react";

// Define the data structure for form data
type FormData = {
  fullName: string;
  phoneNumber: string;
  age: number;
  height: string;
  weight: string;
};

export default function EditProfile({ user }: { user: FormData }) {
  const [updateProfile] = useUpdateProfileMutation();
  const { data: session, status } = useSession();
  const { data: profileData } = useSinglePatientQuery(session?.userId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: user,
  });

  const onSubmit = async (data: FormData) => {
    try {
      const updatedData = await updateProfile({
        id: profileData?.id,
        updateData: data,
      });
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error) {
      toast.error("Profile update failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-8 p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-6">
          <div className="relative w-24 h-24">
            <img
              src={profileData?.image}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border border-primary"
            />
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer">
              <Camera className="w-4 h-4" />
              <input type="file" className="hidden" />
            </label>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profileData?.fullName}</h2>
            <p className="text-sm text-muted-foreground">
              {profileData?.email}
            </p>
          </div>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                {...register("fullName")}
                defaultValue={`${profileData?.fullName}`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                {...register("phoneNumber")}
                defaultValue={`${profileData?.phoneNumber}`}
                placeholder="Ex. +8801########"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                {...register("age")}
                defaultValue={`${profileData?.age}`}
                type="number"
                placeholder="Your Age"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                {...register("weight")}
                defaultValue={`${profileData?.height || "0"} `}
              />
              {errors.height && (
                <p className="text-red-500 text-sm">{errors.height.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="weight">Weight</Label>
              <Input
                {...register("weight")}
                defaultValue={`${profileData?.weight || "0"} `}
                type="text"
                placeholder="Your Weight"
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight.message}</p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/dashboard" className="text-sm text-primary underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
