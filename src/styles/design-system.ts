/**
 * BrikByte Command Design System.
 *
 * This file is the single source of truth for design tokens.
 * Do not hardcode colors, spacing, motion values, shadows, or z-index values
 * directly inside components.
 */

export const designSystem = {
  colors: {
    background: {
      deep: "#070B14",
      navy: "#0D1321",
      surface: "#111827",
      glass: "rgba(255, 255, 255, 0.06)",
    },
    accent: {
      blue: "#00D4FF",
      purple: "#7B61FF",
      green: "#00F5A0",
      orange: "#FFB547",
      red: "#FF4D6D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAB4C3",
      muted: "#6B7280",
    },
    border: {
      standard: "rgba(255, 255, 255, 0.08)",
      active: "rgba(0, 212, 255, 0.45)",
      success: "rgba(0, 245, 160, 0.45)",
      warning: "rgba(255, 181, 71, 0.45)",
    },
  },

  typography: {
    fontFamily: {
      sans: "var(--font-inter), system-ui, sans-serif",
      display: "var(--font-inter), system-ui, sans-serif",
      mono: "var(--font-jetbrains-mono), monospace",
    },
    fontSize: {
      displayXl: "clamp(4.5rem, 8vw, 6rem)",
      displayLg: "clamp(3.5rem, 6vw, 4.5rem)",
      heading1: "3rem",
      heading2: "2.25rem",
      heading3: "1.5rem",
      bodyLg: "1.125rem",
      bodyMd: "1rem",
      bodySm: "0.875rem",
      monoSm: "0.75rem",
    },
    lineHeight: {
      display: "0.95",
      tight: "1.1",
      normal: "1.6",
      relaxed: "1.7",
    },
  },

  spacing: {
    sectionDesktop: "8rem",
    sectionTablet: "6rem",
    sectionMobile: "4.5rem",
    container: "80rem",
    containerWide: "90rem",
    reading: "45rem",
  },

  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    full: "999px",
  },

  shadows: {
    glowBlue: "0 0 32px rgba(0, 212, 255, 0.18)",
    glowPurple: "0 0 32px rgba(123, 97, 255, 0.18)",
    glowGreen: "0 0 32px rgba(0, 245, 160, 0.18)",
    panelSoft: "0 24px 80px rgba(0, 0, 0, 0.35)",
  },

  motion: {
    duration: {
      micro: "120ms",
      fast: "200ms",
      standard: "350ms",
      section: "500ms",
      major: "800ms",
    },
    easing: {
      premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      system: "cubic-bezier(0.16, 1, 0.3, 1)",
      linear: "linear",
    },
  },

  zIndex: {
    background: "0",
    backgroundEffects: "5",
    content: "10",
    floatingPanels: "20",
    navbar: "50",
    commandPalette: "80",
    modal: "90",
    toast: "100",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

export type DesignSystem = typeof designSystem;
