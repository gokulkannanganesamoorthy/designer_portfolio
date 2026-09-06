import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import Capabilities from '@/components/sections/Capabilities';
import Work from '@/components/sections/Work';
import Clients from '@/components/sections/Clients';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Capabilities />
      <Work />
      <Clients />
      <Contact />
    </main>
  );
}
