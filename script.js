const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton?.classList.remove('active');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach((element) => {
  const delay = element.dataset.delay;
  if (delay) element.style.setProperty('--delay', `${delay}ms`);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });

revealElements.forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-42% 0px -48% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const copyEmailButton = document.querySelector('.copy-email');
copyEmailButton?.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    const original = copyEmailButton.textContent;
    copyEmailButton.textContent = 'E-mail copiado ✓';
    copyEmailButton.classList.add('copied');
    setTimeout(() => {
      copyEmailButton.textContent = original;
      copyEmailButton.classList.remove('copied');
    }, 1800);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

const glow = document.querySelector('.cursor-glow');
if (glow && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    glow.style.opacity = '1';
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
  document.documentElement.addEventListener('mouseleave', () => glow.style.opacity = '0');
}
