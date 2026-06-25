const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a[href^='#'], .footer a[href^='#'], .button[href^='#']");
const faqItems = document.querySelectorAll(".faq-item");
const typedText = document.querySelector("#typed-text");
const typedPhrases = ["jouw bedrijf.", "jouw uitstraling.", "meer contact."];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function closeMenu() {
  if (!menuToggle || !navMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) return;

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

faqItems.forEach((item) => {
  const button = item.querySelector("button");
  const icon = button?.querySelector("span");

  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    if (icon) icon.textContent = isOpen ? "-" : "+";
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

function startTypedHeadline() {
  if (!typedText) return;

  if (prefersReducedMotion) {
    typedText.textContent = typedPhrases[0];
    return;
  }

  let phraseIndex = 0;
  let letterIndex = 0;
  let deleting = false;

  function typeNext() {
    const phrase = typedPhrases[phraseIndex];

    if (!deleting) {
      letterIndex += 1;
      typedText.textContent = phrase.slice(0, letterIndex);

      if (letterIndex === phrase.length) {
        deleting = true;
        window.setTimeout(typeNext, 1800);
        return;
      }

      window.setTimeout(typeNext, 55);
      return;
    }

    letterIndex -= 1;
    typedText.textContent = phrase.slice(0, letterIndex);

    if (letterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % typedPhrases.length;
      window.setTimeout(typeNext, 250);
      return;
    }

    window.setTimeout(typeNext, 35);
  }

  typedText.textContent = "";
  typeNext();
}

startTypedHeadline();
