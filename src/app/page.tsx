import { ScrollNarrativeProvider } from "@/components/motion/scroll-narrative-provider";
import { SectionTransition } from "@/components/motion/section-transition";
import { CommandDeckNavbar } from "@/components/layout/command-deck-navbar";
import { OpeningSequence } from "@/sections/opening-sequence";
import { HeroSection } from "@/sections/hero-section";
import { MissionSection } from "@/sections/mission-section";
import { SkillsMatrixSection } from "@/sections/skills-matrix-section";
import { BrikByteOSShowcaseSection } from "@/sections/brikbyteos-showcase-section";
import { ProjectsSection } from "@/sections/projects-section";
import { ExperienceSection } from "@/sections/experience-section";
import { EngineeringIntelligenceSection } from "@/sections/engineering-intelligence-section";
import { ContactSection } from "@/sections/contact-section";
import { FooterSection } from "@/sections/footer-section";

export default function Home() {
  return (
    <OpeningSequence>
      <ScrollNarrativeProvider>
        <CommandDeckNavbar />

        <main>
          <SectionTransition stage="hero">
            <HeroSection />
          </SectionTransition>

          <SectionTransition stage="mission">
            <MissionSection />
          </SectionTransition>

          <SectionTransition stage="skills">
            <SkillsMatrixSection />
          </SectionTransition>

          <SectionTransition stage="brikbyteos" mode="reveal">
            <BrikByteOSShowcaseSection />
          </SectionTransition>

          <SectionTransition stage="projects">
            <ProjectsSection />
          </SectionTransition>

          <SectionTransition stage="experience">
            <ExperienceSection />
          </SectionTransition>

          <SectionTransition stage="engineering-intelligence">
            <EngineeringIntelligenceSection />
          </SectionTransition>

          <SectionTransition stage="contact">
            <ContactSection />
          </SectionTransition>
        </main>

        <SectionTransition stage="footer" mode="reveal">
          <FooterSection />
        </SectionTransition>
      </ScrollNarrativeProvider>
    </OpeningSequence>
  );
}
