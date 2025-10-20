// ===========================
// SCRIPT PRINCIPAL (script.js)
// ===========================

// --- SELECTORES ---
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links"); // <ul id="nav-links">
const navAnchors = document.querySelectorAll("#nav-links a");

// --- SEGURIDAD: salir si no existen (evita errores) ---
if (!menuToggle || !navLinks) {
  console.warn("menu-toggle o nav-links no encontrados. Revisa IDs en el HTML.");
}

// --- FUNCIONES DEL MENÚ ---
function openMenu() {
  navLinks.classList.add("open");
  menuToggle.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("no-scroll");
}

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", (e) => {
    const isOpen = navLinks.classList.contains("open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Cerrar cuando se hace click en un enlace (mejora UX móvil)
  navAnchors.forEach((a) => {
    a.addEventListener("click", () => {
      // solo cerrar si estamos en vista móvil (opcional)
      if (window.matchMedia("(max-width:900px)").matches) closeMenu();
    });
  });

  // Cerrar si el usuario hace click fuera del menú (en móvil)
  document.addEventListener("click", (e) => {
    const target = e.target;
    const clickedInsideNav = navLinks.contains(target) || menuToggle.contains(target);
    if (!clickedInsideNav && navLinks.classList.contains("open")) {
      closeMenu();
    }
  });

  // Cerrar al cambiar tamaño de ventana (ayuda si se redimensiona)
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width:901px)").matches) {
      // en desktop mostrar siempre sin la clase open para evitar solapamientos
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      document.body.classList.remove("no-scroll");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ----------------------------
// SCROLL SUAVE PARA ANCLAS
// ----------------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Permite que los enlaces de navegación funcionen correctamente
    const href = this.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ----------------------------
// BOTÓN SUBIR (usa el <a> que ya existe en HTML)
// ----------------------------
const scrollTopAnchor = document.querySelector('a.scroll-top');
if (scrollTopAnchor) {
  // Mostrar/ocultar según scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) scrollTopAnchor.classList.add("show");
    else scrollTopAnchor.classList.remove("show");
  });

  // click ya va a un ancla href="#inicio" (si quieres behavior smooth):
  scrollTopAnchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector('#inicio');
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
}

// ----------------------------
// EFECTO FADE-IN (IntersectionObserver)
// ----------------------------
const fadeEls = document.querySelectorAll(".fade-in");
if ("IntersectionObserver" in window && fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  fadeEls.forEach((el) => observer.observe(el));
} else {
  // Fallback simple
  fadeEls.forEach((el) => el.classList.add("visible"));
}

// ----------------------------
// FORMULARIO (envío con fetch a Formspree o similar)
// ----------------------------
const form = document.querySelector(".formulario");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // valida action
    const action = form.getAttribute("action");
    if (!action || action.includes("tu-id")) {
      alert("Configura el atributo action del formulario con tu endpoint (Formspree u otro).");
      return;
    }

    const formData = new FormData(form);
    const msgBox = document.createElement("div");
    msgBox.className = "form-message";
    msgBox.textContent = "Enviando...";
    document.body.appendChild(msgBox);
    setTimeout(() => msgBox.classList.add("show"), 20);

    try {
      const res = await fetch(action, {
        method: form.method || "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        msgBox.textContent = "✅ Mensaje enviado. ¡Gracias!";
        form.reset();
      } else {
        msgBox.textContent = "⚠️ Hubo un problema al enviar. Intenta de nuevo.";
      }
    } catch (err) {
      msgBox.textContent = "❌ Error de red. Revisa tu conexión.";
    }

    setTimeout(() => {
      msgBox.classList.remove("show");
      setTimeout(() => msgBox.remove(), 400);
    }, 3000);
  });
}

// CARRUSEL PROYECTOS
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-images");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const slides = Array.from(track.children);
  let currentIndex = 0;

  function updateCarousel() {
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  // Botón siguiente
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  // Botón anterior
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  // Ajustar al redimensionar ventana
  window.addEventListener("resize", updateCarousel);

  // Inicial
  updateCarousel();
});