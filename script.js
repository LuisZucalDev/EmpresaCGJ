// ===========================
// MENÚ MÓVIL
// ===========================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// ===========================
// MENSAJE FORMULARIO CONTACTO
// ===========================
// Asegúrate de agregar id="contact-form" a tu <form>
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Gracias por contactarte con CGJ Electricidad. Te responderemos pronto ⚡');
        this.reset();
    });
}

// ===========================
// CARRUSEL PROYECTOS
// ===========================
document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-images');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let index = 0;

    const updateSlide = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * index}px)`;
    };

    // Flecha anterior
    prevBtn.addEventListener('click', () => {
        index--;
        if(index < 0) index = slides.length - 1;
        updateSlide();
    });

    // Flecha siguiente
    nextBtn.addEventListener('click', () => {
        index++;
        if(index >= slides.length) index = 0;
        updateSlide();
    });

    // Ajustar si se redimensiona la ventana
    window.addEventListener('resize', updateSlide);

    // Inicializa la primera imagen
    updateSlide();
});
