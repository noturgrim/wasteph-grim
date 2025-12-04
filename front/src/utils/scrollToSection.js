/**
 * Smoothly scrolls to a section - optimized for snap scroll
 * @param {string} sectionId - The ID of the target section
 */
export const scrollToSection = (sectionId) => {
  if (!sectionId) return;

  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;

  // Use scrollIntoView with snap scroll for best compatibility
  targetElement.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
