const root = document.documentElement;
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#navLinks');
const navItems = document.querySelectorAll('.nav-links a');
const checkpoints = document.querySelectorAll('.checkpoint');
const revealEls = document.querySelectorAll('.reveal');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectSearch = document.querySelector('#projectSearch');
const emptyState = document.querySelector('#emptyState');
const contactForm = document.querySelector('#contactForm');
const year = document.querySelector('#year');

const storageKey = 'bharathi-portfolio-theme';
const savedTheme = localStorage.getItem(storageKey);
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(storageKey, theme);
  themeIcon.textContent = theme === 'light' ? '☀' : '☾';
}

setTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

themeToggle.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);
});

navToggle.addEventListener('click', () => {
  const isOpen = body.classList.toggle('menu-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navItems.forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

checkpoints.forEach((checkpoint) => {
  checkpoint.addEventListener('click', () => {
    const target = document.getElementById(checkpoint.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

function setActiveNavigation(id) {
  navItems.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });

  checkpoints.forEach((checkpoint) => {
    checkpoint.classList.toggle('active', checkpoint.dataset.target === id);
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveNavigation(entry.target.id);
    });
  },
  { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 }
);

['about', 'skills', 'experience', 'projects', 'contact'].forEach((id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((element) => revealObserver.observe(element));

let activeFilter = 'all';

function normalize(value) {
  return value.toLowerCase().trim();
}

function applyProjectFilters() {
  const query = normalize(projectSearch.value);
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const tags = card.dataset.tags || '';
    const text = normalize(card.textContent);
    const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
    const matchesSearch = !query || text.includes(query) || tags.includes(query);
    const shouldShow = matchesFilter && matchesSearch;

    card.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    applyProjectFilters();
  });
});

projectSearch.addEventListener('input', applyProjectFilters);

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:bharathi.bharu1980@gmail.com?subject=${subject}&body=${body}`;
});

year.textContent = new Date().getFullYear();
