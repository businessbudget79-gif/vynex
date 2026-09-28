// VYNEX V2 — site interactions

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Mobile navigation
if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    const open = navMenu.classList.toggle('mobile-active');
    menuBtn.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-active');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
    });
  });
}

// Navbar shadow + reading progress
function updateScrollUI() {
  const scrollTop = window.scrollY;
  navbar?.classList.toggle('scrolled', scrollTop > 20);

  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${progress}%`;
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

// Reveal sections as they enter the screen
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

// Contact form -> WhatsApp
contactForm?.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const service = document.getElementById('service')?.value;
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please complete your name, email and project details.';
    formStatus.className = 'form-note error';
    return;
  }

  const whatsappNumber = '233538676679';
  const text = [
    'Hello VYNEX! I would like to start a project.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service}`,
    `Project details: ${message}`
  ].join('\n');

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  formStatus.textContent = 'Opening WhatsApp…';
  formStatus.className = 'form-note success';
  window.open(url, '_blank', 'noopener,noreferrer');
});

// Dynamic year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
