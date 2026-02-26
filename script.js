const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("menu-open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("menu-open");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 75, 520)}ms`;
  revealObserver.observe(element);
});

const statElements = document.querySelectorAll(".stat");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const element = entry.target;
      const target = Number(element.dataset.target || 0);
      let current = 0;
      const duration = 1100;
      const startTime = performance.now();

      const animate = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        current = Math.floor(progress * target);
        element.textContent = current.toString();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = target.toString();
        }
      };

      requestAnimationFrame(animate);
      statsObserver.unobserve(element);
    });
  },
  { threshold: 0.45 }
);

statElements.forEach((element) => statsObserver.observe(element));

const shapes = document.querySelectorAll(".shape");
window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    shapes.forEach((shape, index) => {
      const speed = 0.025 + index * 0.01;
      shape.style.transform = `translate3d(0, ${y * speed}px, 0) rotate(${y * 0.004}deg)`;
    });
  },
  { passive: true }
);

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    button.style.transform = "translateY(1px) scale(0.975)";
  });

  button.addEventListener("pointerup", () => {
    button.style.transform = "";
  });

  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });

  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const ratio = offsetX / rect.width;
    button.style.backgroundPosition = `${Math.round(ratio * 100)}% 50%`;
  });
});
