import Footer from "@/components/views/landingPage/Footer";
import Hero from "@/components/views/landingPage/Hero";
import HomeBanner from "@/components/views/landingPage/HomeBanner";
import MobileMenus from "@/components/views/landingPage/MobileMenus";
import MobileNav from "@/components/views/landingPage/MobileNav";
import MobileTopBar from "@/components/views/landingPage/MobileTopBar";
import Navbar from "@/components/views/landingPage/Navbar";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 bg-gradient-to-r from-background to-muted pb-20">
        <Navbar />
        <MobileTopBar />
        <HomeBanner />
        <MobileMenus />
      </div>
      {/* <Footer /> */}
      <MobileNav />
    </main>
  );
}
