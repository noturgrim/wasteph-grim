export const scrollToSection = (sectionId) => {
  if (!sectionId) return;

  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;

  targetElement.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
