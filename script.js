// Preloader
window.addEventListener('load', () => {
  document.getElementById('preloader').style.opacity = '0';
  setTimeout(() => document.getElementById('preloader').style.display = 'none', 800);
});

// AOS
AOS.init({
  duration: 900,
  once: true,
  offset: 70
});

// GSAP intro
gsap.from('.hero-content h1', {
  opacity: 0,
  y: 70,
  duration: 1.2,
  delay: 0.3
});
gsap.from('.hero-content p', {
  opacity: 0,
  y: 40,
  duration: 1,
  delay: 0.6
});

// Swiper Hero (sliding images)
const heroSwiper = new Swiper('.hero-swiper', {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  effect: 'slide',
  speed: 800,
});

// Navbar scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('scrolled', window.scrollY > 80);
  document.getElementById('scrollProgress').style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Cursor glow
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .card, .glass-card').forEach(el => {
  el.addEventListener('mouseenter', () => glow.classList.add('hover'));
  el.addEventListener('mouseleave', () => glow.classList.remove('hover'));
});

// Gallery filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.project-item').forEach(item => {
      item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
    });
  });
});

// Animated counters
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 40));

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.innerText = target;
        clearInterval(timer);
      } else {
        counter.innerText = current;
      }
    }, 30);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  counters.forEach(counter => observer.observe(counter));
});

// Ripple effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    let ripple = document.createElement('span');
    let rect = this.getBoundingClientRect();
    ripple.style.cssText = `position:absolute; border-radius:50%; background:rgba(255,255,255,0.25); width:100px; height:100px; left:${e.clientX - rect.left - 50}px; top:${e.clientY - rect.top - 50}px; transform:scale(0); animation:ripple 0.6s linear; pointer-events:none;`;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});