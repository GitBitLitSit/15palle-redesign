"use client"

import { MotionConfig } from "motion/react"

/**
 * Honors the visitor's "reduce motion" setting for every animation. Doing it here, rather
 * than branching on useReducedMotion() per component, keeps the server HTML identical to
 * the first client render (no hydration mismatch).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
