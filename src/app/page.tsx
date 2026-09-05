import BusinessCard from '@/components/landing/BusinessCard';
import Positioning from '@/components/sections/Positioning';
import Projects from '@/components/sections/Projects';
import TheInvisible from '@/components/sections/TheInvisible';
import About from '@/components/sections/About';
import Thinking from '@/components/sections/Thinking';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <BusinessCard />
      <Positioning />
      <Projects />
      <TheInvisible />
      <About />
      <Thinking />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}
