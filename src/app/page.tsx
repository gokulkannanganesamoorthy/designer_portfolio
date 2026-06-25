import BusinessCard from "@/components/landing/BusinessCard";
import ProjectExhibition from "@/components/portfolio/ProjectExhibition";

export default function Home() {
  return (
    <main>
      <BusinessCard />
      
      <div id="work">
        <ProjectExhibition 
          title="Editorial Experience" 
          description="A reimagined reading experience focusing on typography, rhythm, and undisturbed focus."
          role="Design & Engineering"
          year="2025"
          layout="default"
        />
        <ProjectExhibition 
          title="Invisible Interfaces" 
          description="A study in removing the UI. Creating systems where the content is the only interface."
          role="Interaction Design"
          year="2026"
          layout="alt"
        />
      </div>
    </main>
  );
}
