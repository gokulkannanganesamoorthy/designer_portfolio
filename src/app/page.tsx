import BusinessCard from '@/components/landing/BusinessCard';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Projects from '@/components/sections/Projects';
import InteractiveTunnel from '@/components/showcase/InteractiveTunnel';

export default function Home() {
  return (
    <main>
      <BusinessCard />
      <About />
      
      {/* Experience Section (The Kinetic Velocity Shredder) */}
      <section id="experience">
        <InteractiveTunnel
          projects={[
            {
              id: 'luno',
              year: 'Feb 2025 - Dec 2025',
              role: 'Founder',
              title: 'Founder',
              company: 'Luno Tech',
            },
            {
              id: 'orrayson',
              year: 'Jan 2026 - Jul 2026',
              role: 'Tech & Operations Associate',
              title: 'Tech & Operations Associate',
              company: 'Orrayson Studio',
            },
            {
              id: 'tat',
              year: 'Jun 2026 - Present',
              role: 'Founding Member & Tech Head',
              title: 'Founding Member & Tech Head',
              company: 'TAT (The Ads Tag)',
            },
            {
              id: 'indie',
              year: 'Jun 2026 - Present',
              role: 'Digital Experience Designer',
              title: 'Digital Experience Designer',
              company: 'Independent',
            },
          ]}
        />
      </section>

      {/* Projects Section */}
      <Projects />

      <Testimonials />
      <Contact />
    </main>
  );
}
