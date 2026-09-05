import BusinessCard from '@/components/landing/BusinessCard';
import ScrollStory from '@/components/sections/ScrollStory';
import Projects from '@/components/sections/Projects';
import TheInvisible from '@/components/sections/TheInvisible';
import Thinking from '@/components/sections/Thinking';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <BusinessCard />
      <ScrollStory />
      <Projects />
      <TheInvisible />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}
