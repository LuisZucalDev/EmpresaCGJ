// Activar menú móvil
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Mensaje al enviar formulario
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Gracias por contactarte con CGJ Electricidad. Te responderemos pronto ⚡');
    this.reset();
});

// Carrusel para cada proyecto
document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelector('.carousel-images');
    const total = images.children.length;
    let index = 0;

    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + total) % total;
        images.style.transform = `translateX(-${index * 100}%)`;
    });

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % total;
        images.style.transform = `translateX(-${index * 100}%)`;
    });
});
