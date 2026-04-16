const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 40);
};

const toggleMobileMenu = (open) => {
  if (!menuToggle || !mobileMenu) return;
  const willOpen = typeof open === "boolean" ? open : !mobileMenu.classList.contains("is-open");
  mobileMenu.classList.toggle("is-open", willOpen);
  menuToggle.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (menuToggle) {
  menuToggle.addEventListener("click", () => toggleMobileMenu());
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => toggleMobileMenu(false));
});

const revealItems = document.querySelectorAll(".section-reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const stepCards = Array.from(document.querySelectorAll("[data-step]"));
const stepTriggers = document.querySelectorAll("[data-step-trigger]");
let activeStepIndex = 0;
let stepIntervalId = null;

const setActiveStep = (index) => {
  stepCards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === index);
  });
  activeStepIndex = index;
};

const restartStepCycle = () => {
  if (stepIntervalId) window.clearInterval(stepIntervalId);
  if (stepCards.length < 2) return;
  stepIntervalId = window.setInterval(() => {
    const nextIndex = (activeStepIndex + 1) % stepCards.length;
    setActiveStep(nextIndex);
  }, 4000);
};

stepTriggers.forEach((trigger, index) => {
  trigger.addEventListener("click", () => {
    setActiveStep(index);
    restartStepCycle();
  });
});

setActiveStep(0);
restartStepCycle();

const testimonialRoot = document.querySelector("[data-testimonials]");
const testimonialItems = testimonialRoot ? Array.from(testimonialRoot.querySelectorAll("[data-testimonial]")) : [];
const dotsRoot = testimonialRoot ? testimonialRoot.querySelector("[data-testimonial-dots]") : null;
const prevButton = testimonialRoot ? testimonialRoot.querySelector("[data-testimonial-prev]") : null;
const nextButton = testimonialRoot ? testimonialRoot.querySelector("[data-testimonial-next]") : null;
let testimonialIndex = 0;
let testimonialIntervalId = null;

const renderTestimonial = (index) => {
  testimonialItems.forEach((item, itemIndex) => {
    item.classList.toggle("is-visible", itemIndex === index);
  });

  if (dotsRoot) {
    Array.from(dotsRoot.children).forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
  }

  testimonialIndex = index;
};

const restartTestimonials = () => {
  if (testimonialIntervalId) window.clearInterval(testimonialIntervalId);
  if (testimonialItems.length < 2) return;
  testimonialIntervalId = window.setInterval(() => {
    renderTestimonial((testimonialIndex + 1) % testimonialItems.length);
  }, 5000);
};

if (dotsRoot) {
  testimonialItems.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver depoimento ${index + 1}`);
    dot.addEventListener("click", () => {
      renderTestimonial(index);
      restartTestimonials();
    });
    dotsRoot.appendChild(dot);
  });
}

if (prevButton) {
  prevButton.addEventListener("click", () => {
    const nextIndex = testimonialIndex === 0 ? testimonialItems.length - 1 : testimonialIndex - 1;
    renderTestimonial(nextIndex);
    restartTestimonials();
  });
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    renderTestimonial((testimonialIndex + 1) % testimonialItems.length);
    restartTestimonials();
  });
}

if (testimonialItems.length) {
  renderTestimonial(0);
  restartTestimonials();
}

const faqItems = Array.from(document.querySelectorAll(".faq-item"));

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");
    faqItems.forEach((faq) => {
      faq.classList.remove("is-open");
      const faqButton = faq.querySelector(".faq-question");
      if (faqButton) faqButton.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const currentYear = document.getElementById("current-year");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const whatsappNumber = "5521979978050";
const whatsappForms = document.querySelectorAll("[data-whatsapp-form]");

whatsappForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const goal = String(formData.get("goal") || "").trim();
    const schedule = String(formData.get("schedule") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const lines = [
      "Olá, Patrícia. Vim pelo site e gostaria de agendar uma consulta.",
      name ? `Nome: ${name}` : "",
      phone ? `WhatsApp: ${phone}` : "",
      goal ? `Motivo do contato: ${goal}` : "",
      schedule ? `Melhor horário para retorno: ${schedule}` : "",
      message ? `Mensagem: ${message}` : "",
    ].filter(Boolean);

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });
});
