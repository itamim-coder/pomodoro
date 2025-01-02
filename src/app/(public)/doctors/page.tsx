"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import allSpecialities from "@/data/allSpecialities";
import { HospitalIcon, StarIcon } from "lucide-react";
import FilterButton from "@/components/views/landingPage/FilterButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDoctorQuery } from "@/redux/api/doctorApi";
import DoctorLoading from "@/components/views/landingPage/DoctorLoading";

const Doctors = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const { data: doctors, isLoading } = useDoctorQuery(undefined);

    const searchedDoctors = searchQuery
        ? doctors?.filter(
            (doctor: any) =>
                doctor?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : doctors;

    const filteredDoctors = selectedSpeciality
        ? searchedDoctors?.filter((doctor: any) => {
            const isCategoryMatch = doctor?.specialization?.name?.toLowerCase() === selectedSpeciality.toLowerCase();
            return isCategoryMatch;
        })
        : searchedDoctors;

    if (isLoading) {
        return <DoctorLoading />;
    }

    return (
        <div className="flex min-h-screen w-full">
            <aside className="hidden w-64 flex-col border-r dark:border-muted bg-background text-muted-foreground p-6 sm:flex">
                <FilterButton />
                <h2 className="my-4 text-lg font-bold">Specialties</h2>
                <div className="grid gap-2">
                    <div className="relative">
                        <div className="absolute left-2.5 top-2.5">
                            <HospitalIcon className="h-4 w-4" />
                        </div>
                        <Input
                            name="categories"
                            value="All"
                            onClick={() => setSelectedSpeciality('')}
                            readOnly
                            className="pl-8 cursor-pointer rounded-md border border-input bg-background font-bold shadow-sm focus:text-primary focus:shadow-lg"
                        />
                    </div>
                    {allSpecialities.map((speciality) => (
                        <div className="relative" key={speciality.id}>
                            <div className="absolute left-2.5 top-2.5">
                                {speciality.icon}
                            </div>
                            <Input
                                name="speciality"
                                value={speciality.name}
                                onClick={() => setSelectedSpeciality(speciality.name)}
                                readOnly
                                className="pl-8 cursor-pointer rounded-md border border-input bg-background font-bold shadow-sm focus:text-primary focus:shadow-lg"
                            />
                        </div>
                    ))}
                </div>
            </aside>
            <div className="flex-1">
                <header className="flex h-14 items-center gap-4 border-b dark:border-muted px-4 sm:px-6">
                    <Sheet>
                        <SheetTrigger className="border border-primary px-1 rounded-lg lg:hidden">
                            <FilterButton />
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>
                                    <h2 className="my-4 text-lg font-bold">Specialties</h2>
                                </SheetTitle>
                                <SheetDescription>
                                    <div className="grid gap-2">
                                        <div className="relative">
                                            <div className="absolute left-2.5 top-2.5">
                                                <HospitalIcon className="h-4 w-4" />
                                            </div>
                                            <Input
                                                name="categories"
                                                value="All"
                                                onClick={() => setSelectedSpeciality('')}
                                                readOnly
                                                className="pl-8 cursor-pointer rounded-md border border-input bg-background font-bold shadow-sm focus:text-primary focus:shadow-lg"
                                            />
                                        </div>
                                        {allSpecialities.map((speciality) => (
                                            <div className="relative" key={speciality.id}>
                                                <div className="absolute left-2.5 top-2.5">
                                                    {speciality.icon}
                                                </div>
                                                <Input
                                                    name="speciality"
                                                    value={speciality.name}
                                                    onClick={() => setSelectedSpeciality(speciality.name)}
                                                    readOnly
                                                    className="pl-8 cursor-pointer rounded-md border border-input bg-background font-bold shadow-sm focus:text-primary focus:shadow-lg"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                    <div className="relative flex-1">
                        <Input
                            type="search"
                            placeholder="Search doctors..."
                            className="w-full rounded-lg bg-muted pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </header>
                <main className="grid gap-6 p-4 sm:p-6">
                    {filteredDoctors?.map((doctor: any) => (
                        <div key={doctor.id} className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-sm">
                            <Image
                                src={doctor?.image || '/fallback-image.jpg'}
                                alt={doctor?.fullName || 'Doctor Image'}
                                width={80}
                                height={80}
                                className="h-20 w-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-medium">{doctor?.fullName}</h3>
                                <p className="text-muted-foreground">{doctor?.speciality}</p>
                                <p className="text-sm">{doctor?.description}</p>
                                <div className="mt-2 flex flex-col lg:flex-row items-center lg:justify-between">
                                    <div className="mt-2 flex items-center gap-2">
                                        <StarIcon className="h-4 w-4 text-yellow-500" />
                                        <span className="text-sm font-medium">{doctor?.rating}</span>
                                        <span className="text-muted-foreground text-sm">({doctor?.availability})</span>
                                    </div>
                                    <Link href={`doctors/${doctor.id}`} className="mt-3 lg:mt-0">
                                        <Button variant="outline" size="sm" className="font-bold text-primary">Book Appointment</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
}

export default Doctors;