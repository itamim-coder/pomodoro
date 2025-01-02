"use client";

import { CalendarRange, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useSingleDoctorQuery } from "@/redux/api/doctorApi";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AppointmentBookingForm from "@/components/views/landingPage/AppointmentBookingForm";
import DoctorDetailsLoading from "@/components/views/landingPage/DoctorDetailsLoading";

export default function DoctorDetails({ params }: { params: { id: string } }) {
  const { data: doctorDetails, isLoading, error } = useSingleDoctorQuery(params.id);

  if (isLoading) {
    return <DoctorDetailsLoading />;
  }

  if (error || !doctorDetails) {
    return <p>Failed to load doctor details. Please try again later.</p>;
  }

  const availableSlots = doctorDetails?.DoctorConsultation || [];

  // Extract unique dates from available slots
  function getUniqueDates(slots: any) {
    return Array.from(new Set(slots.map((slot: any) => slot.availableDate)));
  }

  const uniqueDates = getUniqueDates(availableSlots);
  console.log(uniqueDates);


  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between">
        <div className="order-2 lg:order-1">
          
          <h1 className="text-3xl font-bold my-4">{doctorDetails?.fullName || "Doctor Name"}</h1>
          <p className="text-gray-600 mb-4">| {doctorDetails?.qualification || "Qualification"}</p>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-gray-400" />
            <span>{doctorDetails?.address || "Address not available"}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="text-gray-400" />
            <span>{doctorDetails?.email || "Email not available"}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Phone className="text-gray-400" />
            <span>{doctorDetails?.phoneNumber || "Phone number not available"}</span>
          </div>
          {
            doctorDetails?.summary ? <p className="text-muted-foreground mb-6 lg:w-96">
              {doctorDetails?.summary}
            </p> : <p className="text-muted-foreground mb-6 lg:w-96">
              Dr. {doctorDetails?.fullName} is a highly experienced specialist in{" "}
              {doctorDetails?.qualification}. Please contact for more details.
            </p>
          }
        </div>
        <div className="order-1 lg:order-2">
          <Image
            src={doctorDetails?.image || "/placeholder-image.jpg"}
            width={300}
            height={300}
            alt={doctorDetails?.fullName || "Doctor"}
            className="rounded-lg"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Available Time Slots</h2>
        <div className="grid grid-cols-1 gap-4">
          {uniqueDates.map((date: any, dateIndex) => {
            // Filter slots for the current date
            const filteredSlots = availableSlots.filter((slot: any) => slot.availableDate === date);

            return (
              <div key={dateIndex}>
                <Badge variant="outline" className="text-base text-primary font-semibold w-52">
                  <CalendarRange className="w-4 h-4 mr-2" />
                  {date}
                </Badge>
                <div className="mt-2">
                  {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot: any) => (
                      <div key={slot.id} className="flex items-center space-x-2 my-2">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-primary" />
                          <Input
                            value={slot.slotTime || "Time not available"}
                            className="border-none shadow-none pl-2"
                            readOnly
                          />
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="link" className="shadow-sm">
                              Book Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Book Appointment</DialogTitle>
                              <DialogDescription>
                                Book your appointment with {doctorDetails.fullName}. Please confirm the details below.
                              </DialogDescription>
                            </DialogHeader>
                            <AppointmentBookingForm slot={slot} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))
                  ) : (
                    <p>No available slots for this date.</p>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  )
}
