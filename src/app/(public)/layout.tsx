import Footer from "@/components/views/landingPage/Footer";
import MobileNav from "@/components/views/landingPage/MobileNav";
import MobileTopBar from "@/components/views/landingPage/MobileTopBar";
import Navbar from "@/components/views/landingPage/Navbar";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className="container mx-auto px-4 md:px-6 lg:px-8 bg-gradient-to-r from-background to-muted pb-20">
                <Navbar />
                <MobileTopBar />
                <div className="pt-10 lg:pt-28">
                    {children}
                </div>
            </main>
            <Footer />
            <MobileNav />
        </>
    );
}