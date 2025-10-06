// Crear partículas
function createParticles() {
  const particles = document.querySelector(".particles");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particles.appendChild(particle);
  }
}

// Navegación móvil mejorada
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  let isMenuOpen = false;

  // Toggle del menú
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      navLinks.classList.add("show");
      hamburger.innerHTML = "✕";
    } else {
      navLinks.classList.remove("show");
      hamburger.innerHTML = "☰";
    }
  });

  // Cerrar menú al hacer click en enlaces
  const navLinksItems = navLinks.querySelectorAll("a");
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("show");
        hamburger.innerHTML = "☰";
        isMenuOpen = false;
      }
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!document.querySelector(".nav").contains(e.target) && isMenuOpen) {
      navLinks.classList.remove("show");
      hamburger.innerHTML = "☰";
      isMenuOpen = false;
    }
  });

  // Cerrar menú al cambiar tamaño de pantalla
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("show");
      hamburger.innerHTML = "☰";
      isMenuOpen = false;
    }
  });
}

// Scroll suave
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Revelado al hacer scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll(".scroll-reveal");
  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add("revealed");
    }
  });
}

// Efecto parallax en el hero
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
}

// Header background en scroll
function updateHeaderOnScroll() {
  const header = document.querySelector(".header");
  const scrolled = window.pageYOffset;

  if (scrolled > 100) {
    header.style.background = "rgba(0, 0, 0, 0.95)";
    header.style.backdropFilter = "blur(15px)";
  } else {
    header.style.background = "rgba(0, 0, 0, 0.9)";
    header.style.backdropFilter = "blur(10px)";
  }
}

// Formulario
function initContactForm() {
  const form =
    document.getElementById("contact-form") ||
    document.querySelector(".contact-form");
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const msg = form.querySelector(".form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // ===========================
    // REEMPLAZA con tu endpoint
    // ===========================
    const FORM_ENDPOINT = "https://formspree.io/f/xyznpaqq";
    // ===========================

    // Simple protección: si el honeypot tiene algo, abortamos
    const gotcha = form.querySelector('input[name="_gotcha"]');
    if (gotcha && gotcha.value) return; // bot detected

    const formData = new FormData(form);

    // UI - desactivar botón y mostrar envío
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Enviando...";

    fetch(FORM_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // éxito
          msg.textContent = "¡Mensaje enviado! Te responderé pronto.";
          msg.classList.remove("error");
          msg.classList.add("success");

          button.textContent = "Enviado ✓";
          button.style.background = "linear-gradient(45deg, #00ff00, #008000)";
          form.reset();
        } else {
          // intenta leer JSON con error
          return response.json().then((data) => {
            throw new Error(data.error || "Error al enviar el formulario");
          });
        }
      })
      .catch((error) => {
        console.error("Formspree error:", error);
        msg.textContent = "Error al enviar. Intenta nuevamente más tarde.";
        msg.classList.remove("success");
        msg.classList.add("error");
        button.textContent = "Error ❌";
      })
      .finally(() => {
        // Restaurar estado del botón después de un pequeño delay
        setTimeout(() => {
          button.disabled = false;
          button.textContent = originalText;
          button.style.background = "linear-gradient(45deg, #00ffff, #ff00ff)";

          // limpiar mensaje después de 5s
          setTimeout(() => {
            msg.textContent = "";
            msg.classList.remove("success", "error");
          }, 5000);
        }, 1400);
      });
  });
}

// Animaciones adicionales
function initAnimations() {
  // Animación de escritura para el título
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;

    setTimeout(() => {
      const typeWriter = setInterval(() => {
        heroTitle.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(typeWriter);
        }
      }, 100);
    }, 500);
  }

  // Contador animado para proyectos
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".step-number").forEach((step) => {
    observer.observe(step);
    step.style.animationPlayState = "paused";
  });
}

// Optimización de rendimiento
function optimizePerformance() {
  // Lazy loading para imágenes
  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.5s ease";

        img.onload = () => {
          img.style.opacity = "1";
        };

        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });

  // Throttle para eventos de scroll
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        revealOnScroll();
        parallaxEffect();
        updateHeaderOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.removeEventListener("scroll", () => {
    revealOnScroll();
    parallaxEffect();
    updateHeaderOnScroll();
  });

  window.addEventListener("scroll", throttledScroll);
}

// Inicialización completa
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initAnimations();
  optimizePerformance();
  revealOnScroll();

  // Precargar imágenes críticas
  const criticalImages = [
    "images/foto_perfil.jpg",
    "images/proyecto-cevicheria.jpg",
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});

// Debug para desarrollo
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  console.log("🚀 RonalDev Portfolio cargado correctamente");
  console.log("📱 Responsive:", window.innerWidth <= 768 ? "Móvil" : "Desktop");
}
