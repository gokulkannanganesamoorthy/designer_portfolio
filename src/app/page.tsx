import BusinessCard from "@/components/landing/BusinessCard";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import InteractiveShowcase from "@/components/sections/InteractiveShowcase";

export default function Home() {
  return (
    <main>
      <BusinessCard />
      
      {/* Sections appear after the Hero / scattered state */}
      <About />
      <Testimonials />
      
      <InteractiveShowcase />
      <Contact />
    </main>
  );
}
