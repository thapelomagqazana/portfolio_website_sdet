import { describe, expect, it } from "vitest";
import { brikByteOsStory, problemSolutionComparisons } from "@/data/brikbyteos-story";
import { engineeringVoiceGuidelines } from "@/data/content-guidelines";
import { experienceNarrativeContent } from "@/data/experience-timeline";
import { heroContent, heroIdentity } from "@/data/hero";
import { engineerDossier, engineeringPosture, operatorProfileItems } from "@/data/mission-profile";
import { coreSeoKeywords } from "@/data/seo";
import { countMatchedKeywords, createContentBlob } from "@/lib/content/seo";
import { headingIsConcise, paragraphIsScannable } from "@/lib/content/readability";
import {
  containsUnsafeHtml,
  ctaIsComplete,
  findEmptyStringPaths,
  paragraphLengthIsValid,
} from "@/lib/content/validation";

describe("core portfolio content", () => {
  const modules = [
    heroContent,
    heroIdentity,
    engineerDossier,
    operatorProfileItems,
    engineeringPosture,
    brikByteOsStory,
    experienceNarrativeContent,
    engineeringVoiceGuidelines,
  ];

  it("defines required hero copy", () => {
    expect(heroContent.headline).toBe("Building Confidence Into Every Release");
    expect(heroContent.positioning).toContain("Software Development Engineer in Test");
    expect(heroContent.brikByteLine).toContain("BrikByteOS");
    expect(heroContent.description).toContain("software quality evidence");
    expect(ctaIsComplete(heroContent.primaryCta)).toBe(true);
    expect(ctaIsComplete(heroContent.secondaryCta)).toBe(true);
  });

  it("defines hero identity", () => {
    expect(heroIdentity.name).toBe("Thapelo Magqazana");
    expect(heroIdentity.role).toBe("Software Development Engineer in Test");
    expect(heroIdentity.location).toBe("South Africa");
  });

  it("defines mission profile copy", () => {
    expect(engineerDossier.mission).toContain("ready to ship");
    expect(engineerDossier.narrative).toContain("measurable");
    expect(operatorProfileItems.length).toBeGreaterThan(0);
    expect(engineeringPosture.length).toBeGreaterThan(0);
  });

  it("defines BrikByteOS story", () => {
    expect(brikByteOsStory.productCategory).toBe("Release Confidence Infrastructure");
    expect(brikByteOsStory.problem).toContain("quality evidence");
    expect(brikByteOsStory.solution).toContain("quality gates");
    expect(brikByteOsStory.vision).toContain("evidence-driven");
  });

  it("defines experience narrative", () => {
    expect(experienceNarrativeContent.narrative).toContain("systems thinking");
    expect(experienceNarrativeContent.currentFocus).toContain("BrikByteOS");
    expect(experienceNarrativeContent.technicalEvolution.length).toBeGreaterThan(0);
  });

  it("does not contain empty string fields", () => {
    for (const contentModule of modules) {
      expect(findEmptyStringPaths(contentModule)).toEqual([]);
    }
  });

  it("keeps paragraphs within content guidelines", () => {
    const paragraphs = [
      heroContent.positioning,
      heroContent.description,
      heroContent.brikByteLine,
      heroContent.proofLine,
      engineerDossier.narrative,
      engineerDossier.positioning,
      brikByteOsStory.problem,
      brikByteOsStory.solution,
      experienceNarrativeContent.narrative,
      experienceNarrativeContent.progression,
      experienceNarrativeContent.currentFocus,
    ];

    for (const paragraph of paragraphs) {
      expect(paragraphLengthIsValid(paragraph)).toBe(true);
      expect(paragraphIsScannable(paragraph)).toBe(true);
    }
  });

  it("keeps headings concise", () => {
    expect(headingIsConcise(heroContent.headline)).toBe(true);
    expect(headingIsConcise(engineerDossier.mission)).toBe(true);
    expect(headingIsConcise(brikByteOsStory.heading)).toBe(true);
    expect(headingIsConcise(experienceNarrativeContent.heading)).toBe(true);
  });

  it("integrates SEO keywords naturally", () => {
    const blob = createContentBlob(
      heroContent,
      heroIdentity,
      engineerDossier,
      operatorProfileItems,
      engineeringPosture,
      brikByteOsStory,
      experienceNarrativeContent
    );

    expect(countMatchedKeywords(blob, coreSeoKeywords)).toBeGreaterThanOrEqual(8);
  });

  it("avoids unsafe script tags", () => {
    const blob = createContentBlob(...modules);

    expect(containsUnsafeHtml(blob)).toBe(false);
  });

  it("defines problem-solution comparisons", () => {
    expect(problemSolutionComparisons.length).toBeGreaterThanOrEqual(4);

    for (const comparison of problemSolutionComparisons) {
      expect(comparison.problem.trim()).not.toBe("");
      expect(comparison.solution.trim()).not.toBe("");
    }
  });

  it("defines engineering voice guidelines", () => {
    expect(engineeringVoiceGuidelines.tone).toContain("Technical");
    expect(engineeringVoiceGuidelines.avoid).toContain("Marketing hype");
  });

  it("supports Unicode and special characters", () => {
    expect(heroContent.engineeringPhilosophy).toContain("—");
    expect(brikByteOsStory.decisionShift).toContain('"Did the tests pass?"');
  });
});
