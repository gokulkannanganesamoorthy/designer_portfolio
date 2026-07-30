import BusinessCard from '@/components/landing/BusinessCard';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Projects from '@/components/sections/Projects';
import MyTunnel from '@/components/showcase/MyTunnel';

export default function Home() {
  return (
    <main>
      <BusinessCard />

      {/* Sections appear after the Hero / scattered state */}
      <About />
      <Testimonials />
      <Projects />
      <MyTunnel />
      <Contact />
    </main>
  );
}
