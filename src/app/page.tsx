import BusinessCard from "@/components/landing/BusinessCard";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <BusinessCard />
      
      {/* Sections appear after the Hero / scattered state */}
      <About />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  );
}
