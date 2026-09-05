import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import Work from '@/components/sections/Work';
import Capabilities from '@/components/sections/Capabilities';
import Clients from '@/components/sections/Clients';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Work />
      <Capabilities />
      <Clients />
      <Contact />
    </main>
  );
}
