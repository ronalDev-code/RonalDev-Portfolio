// ========================================
// SCRIPT.JS - PORTAFOLIO RONALDEV
// Versión limpia sin console.log
// ========================================

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

  document.addEventListener("click", (e) => {
    if (!document.querySelector(".nav").contains(e.target) && isMenuOpen) {
      navLinks.classList.remove("show");
      hamburger.innerHTML = "☰";
      isMenuOpen = false;
    }
  });

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

// Optimización de videos
function initVideoOptimization() {
  const videos = document.querySelectorAll(".project-video video");
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      
      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Silenciar errores de autoplay
        });
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.5
  });

  videos.forEach(video => {
    videoObserver.observe(video);
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('preload', 'metadata');
  });
}

// Lazy loading de videos
function initVideoLazyLoad() {
  const videos = document.querySelectorAll(".project-video video");
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const source = video.querySelector('source');
        
        if (source && !video.src) {
          video.src = source.getAttribute('src');
          video.load();
        }
        
        videoObserver.unobserve(video);
      }
    });
  }, {
    rootMargin: '50px'
  });

  videos.forEach(video => {
    videoObserver.observe(video);
  });
}

// Formulario de contacto
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const msg = form.querySelector(".form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const FORM_ENDPOINT = "https://formspree.io/f/xyznpaqq";

    const gotcha = form.querySelector('input[name="_gotcha"]');
    if (gotcha && gotcha.value) return;

    const formData = new FormData(form);

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
          msg.textContent = "¡Mensaje enviado! Te responderé pronto.";
          msg.classList.remove("error");
          msg.classList.add("success");

          button.textContent = "Enviado ✓";
          button.style.background = "linear-gradient(45deg, #00ff00, #008000)";
          form.reset();
        } else {
          return response.json().then((data) => {
            throw new Error(data.error || "Error al enviar el formulario");
          });
        }
      })
      .catch(() => {
        msg.textContent = "Error al enviar. Intenta nuevamente más tarde.";
        msg.classList.remove("success");
        msg.classList.add("error");
        button.textContent = "Error ❌";
      })
      .finally(() => {
        setTimeout(() => {
          button.disabled = false;
          button.textContent = originalText;
          button.style.background = "linear-gradient(45deg, #00ffff, #ff00ff)";

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

  window.addEventListener("scroll", throttledScroll);
}

// Detectar modo ahorro de datos
function checkDataSaverMode() {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    
    if (connection.saveData) {
      document.querySelectorAll(".project-video video").forEach(video => {
        video.pause();
        video.removeAttribute('autoplay');
      });
      
      return true;
    }
  }
  
  return false;
}

// Ajustar calidad de video según conexión
function adjustVideoQuality() {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    const effectiveType = connection.effectiveType;
    
    if (effectiveType === '2g' || effectiveType === 'slow-2g') {
      document.querySelectorAll(".project-video video").forEach(video => {
        video.style.display = 'none';
      });
    }
  }
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
  initVideoOptimization();
  initVideoLazyLoad();
  checkDataSaverMode();
  adjustVideoQuality();

  // Precargar imagen crítica
  const img = new Image();
  img.src = "images/foto_perfil.jpg";
});