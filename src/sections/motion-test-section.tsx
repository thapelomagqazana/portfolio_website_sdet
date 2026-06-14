"use client";

import { motion } from "motion/react";
import { fadeIn, staggerContainer } from "@/animations";
import { MotionCard } from "@/components/motion/motion-card";
import { MotionSection } from "@/components/motion/motion-section";

/**
 * Temporary verification section for WBS 1.3.
 *
 * Replace this with the real hero section when production sections begin.
 */
export function MotionTestSection() {
  const values = ["Precision", "Confidence", "Continuity"];

  return (
    <MotionSection className="bg-background-deep text-text-primary min-h-screen px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.p variants={fadeIn} className="text-mono-sm text-accent-green font-mono">
          ● MOTION SYSTEM ONLINE
        </motion.p>

        <motion.h1 variants={fadeIn} className="text-display-lg mt-4 font-extrabold">
          Motion Library Active
        </motion.h1>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <MotionCard key={item} className="glass-panel rounded-2xl p-6">
              <h3 className="text-heading-3 font-bold">{item}</h3>
              <p className="text-body-sm text-text-secondary mt-3">
                Motion supports the command center experience.
              </p>
            </MotionCard>
          ))}
        </div>
      </motion.div>
    </MotionSection>
  );
}
