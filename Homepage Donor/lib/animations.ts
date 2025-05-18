/**
 * Animation presets for consistent motion effects
 */

/**
 * Fade in and up animation preset
 *
 * @param delay Optional delay before animation starts
 * @returns Animation properties for framer-motion
 */
export const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

/**
 * Fade in animation preset
 *
 * @param delay Optional delay before animation starts
 * @returns Animation properties for framer-motion
 */
export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay },
})

/**
 * Scale in animation preset
 *
 * @param delay Optional delay before animation starts
 * @returns Animation properties for framer-motion
 */
export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, delay },
})
