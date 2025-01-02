"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import DonateBlood from "@/components/views/dashBoard/DonateBlood";
import { useSinglePatientQuery } from "@/redux/api/patientApi";
import { CalendarDays, Check, Mail, MapPin, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  //   console.log(session);
  //   const { userId } = session;
  const { data: profileData } = useSinglePatientQuery(session?.userId);
  console.log(profileData);

  // if (!profileData) {
  //   router.push("/login")
  // }

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-3xl mx-auto dark:border-muted">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              alt="Patient"
              src="/placeholder.svg?height=80&width=80"
            />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{profileData?.fullName}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              New York, USA
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Age</Label>
                <p className="text-sm">{profileData?.age}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Blood Group</Label>
                <p className="text-sm">{profileData?.blood}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Height</Label>
                <p className="text-sm">
                  {profileData?.height || "Not Available"}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Weight</Label>
                <p className="text-sm">
                  {profileData?.weight || "Not Available"}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {profileData?.email}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Phone</Label>
                <p className="text-sm flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  +880 {profileData?.phoneNumber}
                </p>
              </div>
              {/* <div>
                <Label className="text-sm font-medium">Emergency Contact</Label>
                <p className="text-sm">Jane Doe (Spouse) - +1 (555) 987-6543</p>
              </div> */}
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2" />
              <div>
                <p className="text-sm font-medium">Annual Check-up</p>
                <p className="text-xs text-muted-foreground">
                  July 15, 2023 at 10:00 AM
                </p>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <DonateBlood />
          <Link href="/profile/edit-profile" className="mt-6 flex justify-end">
            <Button className="font-bold">Edit Profile</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}