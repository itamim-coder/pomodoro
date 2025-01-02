import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/views/landingPage/SkeletonCard";

export default function Loading() {
    return (
        <div className="p-6 flex">

            {/* Main Content Section */}
            <div className="flex-1 p-6">
                {/* Dashboard Header */}
                <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-8 w-[200px]" /> {/* Header Title Skeleton */}
                    <Skeleton className="h-8 w-[120px]" /> {/* Header Action Button Skeleton */}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex flex-col">
                            <Skeleton className="h-16 w-full mb-4" /> {/* Stat Title Skeleton */}
                            <Skeleton className="h-20 w-full" /> {/* Stat Value Skeleton */}
                        </div>
                    ))}
                </div>

                {/* Graph Section */}
                <div className="mb-6">
                    <Skeleton className="h-48 w-full mb-4" /> {/* Graph Skeleton */}
                </div>

                {/* List Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}