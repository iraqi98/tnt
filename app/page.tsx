import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TuningSpotlight from "@/components/TuningSpotlight";
import Location from "@/components/Location";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <TuningSpotlight />
      <Location />
      <CtaBand />
      <Footer />
    </>
  );
}
