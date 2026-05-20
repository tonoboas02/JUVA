import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhilosophySection from "@/components/PhilosophySection";
import ExperienceCards from "@/components/ExperienceCards";
import SignatureTechnologies from "@/components/SignatureTechnologies";
import SanctuarySection from "@/components/SanctuarySection";
import MembershipCTA from "@/components/MembershipCTA";
import Footer from "@/components/Footer";
// import ReservationSection from "@/components/ReservationSection"; // ← RESERVATION: uncomment when ready to launch bookings

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PhilosophySection />
        <ExperienceCards />
        <SignatureTechnologies />
        <SanctuarySection />
        {/* RESERVATION — uncomment the line below when ready to launch bookings */}
        {/* <ReservationSection /> */}
        <MembershipCTA />
      </main>
      <Footer />
    </>
  );
}
