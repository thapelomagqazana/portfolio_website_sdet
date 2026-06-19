import { LazySection } from "@/components/lazy/lazy-section";
import { CommandDeckNavbar } from "@/components/layout/command-deck-navbar";
import { ScrollNarrativeProvider } from "@/components/motion/scroll-narrative-provider";
import { SectionTransition } from "@/components/motion/section-transition";
import { BrikByteOSShowcaseSection } from "@/sections/brikbyteos-showcase-section";
import { ContactSection } from "@/sections/contact-section";
import { EngineeringIntelligenceSection } from "@/sections/engineering-intelligence-section";
import { ExperienceSection } from "@/sections/experience-section";
import { FooterSection } from "@/sections/footer-section";
import { HeroSection } from "@/sections/hero-section";
import { MissionSection } from "@/sections/mission-section";
import { OpeningSequence } from "@/sections/opening-sequence";
import { ProjectsSection } from "@/sections/projects-section";
import { SkillsMatrixSection } from "@/sections/skills-matrix-section";
// import { MotionDebugOverlay } from "@/components/dev/motion-debug-overlay";

function SectionSkeleton() {
  return <div className="min-h-[60vh]" aria-hidden="true" />;
}

export default function Home() {
  return (
    <OpeningSequence>
      <ScrollNarrativeProvider>
        <CommandDeckNavbar />
        {/* <MotionDebugOverlay /> */}

        <main>
          <SectionTransition stage="hero">
            <HeroSection />
          </SectionTransition>

          <SectionTransition stage="mission">
            <MissionSection />
          </SectionTransition>

          <LazySection fallback={<SectionSkeleton />}>
            <SectionTransition stage="skills">
              <SkillsMatrixSection />
            </SectionTransition>
          </LazySection>

          <LazySection fallback={<SectionSkeleton />}>
            <SectionTransition stage="brikbyteos" mode="reveal">
              <BrikByteOSShowcaseSection />
            </SectionTransition>
          </LazySection>

          <LazySection fallback={<SectionSkeleton />}>
            <SectionTransition stage="projects">
              <ProjectsSection />
            </SectionTransition>
          </LazySection>

          <LazySection fallback={<SectionSkeleton />}>
            <SectionTransition stage="experience">
              <ExperienceSection />
            </SectionTransition>
          </LazySection>

          <LazySection fallback={<SectionSkeleton />}>
            <SectionTransition stage="engineering-intelligence">
              <EngineeringIntelligenceSection />
            </SectionTransition>
          </LazySection>

          <LazySection fallback={<SectionSkeleton />}>
            <SectionTransition stage="contact">
              <ContactSection />
            </SectionTransition>
          </LazySection>
        </main>

        <LazySection fallback={<SectionSkeleton />}>
          <SectionTransition stage="footer" mode="reveal">
            <FooterSection />
          </SectionTransition>
        </LazySection>
      </ScrollNarrativeProvider>
    </OpeningSequence>
  );
}
