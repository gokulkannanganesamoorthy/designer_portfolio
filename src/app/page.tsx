import BusinessCard from '@/components/landing/BusinessCard';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Projects from '@/components/sections/Projects';

export default function Home() {
  return (
    <main>
      <BusinessCard />
      <About />
      
      {/* Projects Section */}
      <Projects />

      <Testimonials />
      <Contact />
    </main>
  );
}
