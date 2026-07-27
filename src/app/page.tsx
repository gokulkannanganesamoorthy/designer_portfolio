import BusinessCard from "@/components/landing/BusinessCard";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import ImmersiveShowcase from "@/components/sections/ImmersiveShowcase";

export default function Home() {
  return (
    <main>
      <BusinessCard />
      
      {/* Sections appear after the Hero / scattered state */}
      <About />
      <Testimonials />
      
      <ImmersiveShowcase />
      <Contact />
    </main>
  );
}
