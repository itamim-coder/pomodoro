"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import places from "@/data/places"
// import donors from '@/data/donors'
import { CalendarDaysIcon, DropletsIcon, MapPinIcon } from "lucide-react"
import FilterButton from "@/components/views/landingPage/FilterButton"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useGetAllPatientQuery } from '@/redux/api/patientApi'

export default function FindBlood() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlace, setSelectedPlace] = useState('');

    const { data: allDoners } = useGetAllPatientQuery(undefined)
    console.log(allDoners);


    const searchedDonors = searchQuery
        ? allDoners?.filter(
            (donor: any) =>
                donor?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                donor?.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
                donor?.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : allDoners;

    const filteredDonors =
        selectedPlace
            ? searchedDonors?.filter((donor: any) => {
                const isCategoryMatch = selectedPlace
                    ? donor?.place.toLowerCase() === selectedPlace.toLowerCase()
                    : true;
                return isCategoryMatch
            })
            : searchedDonors;
    return (
        <div className="flex min-h-screen w-full">
            <aside className="hidden w-64 flex-col border-r dark:border-muted bg-background text-muted-foreground p-6 sm:flex">
                <FilterButton />
                <h2 className="my-4 text-lg font-bold">Specialties</h2>
                <div className="grid gap-2">
                    <Input
                        name="places"
                        value="All"
                        checked={selectedPlace === ''}
                        onClick={(e) => setSelectedPlace('')}
                        readOnly
                        className="cursor-pointer rounded-md border border-input bg-background font-bold shadow-sm focus:text-primary focus:shadow-lg"
                    />
                    {
                        places.map((place) => (
                            <Input
                                key={place.id}
                                name="place"
                                value={place.name}
                                checked={selectedPlace === place.name}
                                onClick={(e: any) => setSelectedPlace(e.target.value)}
                                readOnly
                                className="cursor-pointer rounded-md border border-input bg-background font-bold shadow-sm focus:text-primary focus:shadow-lg"
                            />
                        ))
                    }
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
                                        <div className="grid gap-2">
                                            <Input
                                                name="places"
                                                value="All"
                                                checked={selectedPlace === ''}
                                                onClick={(e) => setSelectedPlace('')}
                                                readOnly
                                                className="cursor-pointer rounded-md border border-input bg-background font-bold shadow-sm focus:text-primary focus:shadow-lg"
                                            />
                                            {
                                                places.map((place) => (
                                                    <Input
                                                        key={place.id}
                                                        name="place"
                                                        value={place.name}
                                                        checked={selectedPlace === place.name}
                                                        onClick={(e: any) => setSelectedPlace(e.target.value)}
                                                        readOnly
                                                        className="cursor-pointer rounded-md border border-input bg-background font-bold shadow-sm focus:text-primary focus:shadow-lg"
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                    <div className="relative flex-1">
                        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search Blood Donors..."
                            className="w-full rounded-lg bg-muted pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </header>
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4 px-4 sm:px-6 mt-5">
                    {filteredDonors?.map((donor: any) => (
                        <Card className="w-full max-w-md" key={donor.id}>
                            <CardContent className="grid gap-6">
                                <div className="flex items-center gap-4 mt-3">
                                    <Avatar className="bg-primary text-primary-foreground">
                                        <AvatarFallback>{donor.name}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <div className="font-semibold">{donor.fullName}</div>
                                        <div className="text-muted-foreground">
                                            <MapPinIcon className="w-4 h-4 mr-1 inline" />
                                            {donor.place}
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <CalendarDaysIcon className="w-4 h-4" />
                                        <span>Last Donation: {donor.lastDonationDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <DropletsIcon className="w-4 h-4" />
                                        <span>Blood Type: O+</span>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button variant="secondary">Contact Now</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </main>
            </div>
        </div>
    )
}