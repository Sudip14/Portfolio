// ==========================
// FUTURISTIC PORTFOLIO
// Cyberpunk / Sci-Fi Engine
// ==========================

// ==========================
// PARTICLE SYSTEM
// ==========================
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.isActive = true;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const count = Math.min(window.innerWidth / 10, 100);
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#00f0ff' : '#ff004f'
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  animate() {
    if (!this.isActive) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p, i) => {
      // Mouse interaction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        const force = (150 - dist) / 150;
        p.vx -= (dx / dist) * force * 0.02;
        p.vy -= (dy / dist) * force * 0.02;
      }

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Boundary check
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();

      // Draw connections
      this.particles.slice(i + 1).forEach(p2 => {
        const dx2 = p.x - p2.x;
        const dy2 = p.y - p2.y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if (dist2 < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = p.color;
          this.ctx.globalAlpha = (1 - dist2 / 100) * 0.15;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      });
    });

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// ==========================
// CUSTOM CURSOR
// ==========================
class FuturisticCursor {
  constructor() {
    this.core = document.querySelector('.cursor-core');
    this.ring = document.querySelector('.cursor-ring');
    this.trail = document.getElementById('cursor-trail');

    if (!this.core || window.matchMedia('(hover: none)').matches) return;

    this.mouseX = 0;
    this.mouseY = 0;
    this.ringX = 0;
    this.ringY = 0;
    this.trailDots = [];

    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.core.style.left = this.mouseX + 'px';
      this.core.style.top = this.mouseY + 'px';
      this.addTrailDot(this.mouseX, this.mouseY);
    });

    this.animateRing();
    this.setupHoverEffects();
  }

  animateRing() {
    this.ringX += (this.mouseX - this.ringX) * 0.15;
    this.ringY += (this.mouseY - this.ringY) * 0.15;
    this.ring.style.left = this.ringX + 'px';
    this.ring.style.top = this.ringY + 'px';
    requestAnimationFrame(() => this.animateRing());
  }

  addTrailDot(x, y) {
    if (this.trailDots.length > 20) {
      const old = this.trailDots.shift();
      old.remove();
    }

    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    this.trail.appendChild(dot);
    this.trailDots.push(dot);

    setTimeout(() => {
      if (dot.parentNode) dot.remove();
      const idx = this.trailDots.indexOf(dot);
      if (idx > -1) this.trailDots.splice(idx, 1);
    }, 500);
  }

  setupHoverEffects() {
    const interactives = document.querySelectorAll('a, button, .project-orb, .skill-node, .filter-btn, .social-node, .channel');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => this.ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => this.ring.classList.remove('hover'));
    });
  }
}

// ==========================
// GLITCH EFFECTS
// ==========================
class GlitchEngine {
  constructor() {
    this.overlay = document.getElementById('glitch-overlay');
    this.init();
  }

  init() {
    // Random glitch triggers
    setInterval(() => {
      if (Math.random() > 0.95) {
        this.triggerGlitch();
      }
    }, 2000);

    // Glitch on hover for title
    const title = document.querySelector('.title-glitch');
    if (title) {
      title.addEventListener('mouseenter', () => this.triggerGlitch());
    }
  }

  triggerGlitch() {
    if (!this.overlay) return;
    this.overlay.classList.add('active');
    setTimeout(() => this.overlay.classList.remove('active'), 100);
  }
}

// ==========================
// TYPING EFFECT
// ==========================
class TypeWriter {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
    this.init();
  }

  init() {
    this.element.textContent = '';
    this.type();
  }

  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    } else {
      setTimeout(() => this.delete(), 3000);
    }
  }

  delete() {
    if (this.index > 0) {
      this.element.textContent = this.text.substring(0, this.index - 1);
      this.index--;
      setTimeout(() => this.delete(), this.speed / 2);
    } else {
      setTimeout(() => this.type(), 500);
    }
  }
}

// ==========================
// NAVIGATION
// ==========================
class Navigation {
  constructor() {
    this.nav = document.getElementById('nav-future');
    this.toggle = document.getElementById('nav-hamburger');
    this.menu = document.getElementById('nav-links');
    this.links = document.querySelectorAll('.nav-link');

    this.init();
  }

  init() {
    // Scroll effect
    window.addEventListener('scroll', () => {
      this.nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Active link
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (scrollY >= top) current = section.getAttribute('id');
      });

      this.links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    });

    // Mobile toggle
    this.toggle?.addEventListener('click', () => {
      this.toggle.classList.toggle('active');
      this.menu.classList.toggle('open');
    });

    // Close on link click
    this.links.forEach(link => {
      link.addEventListener('click', () => {
        this.toggle.classList.remove('active');
        this.menu.classList.remove('open');
      });
    });
  }
}

// ==========================
// COUNTER ANIMATION
// ==========================
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('.metric-value[data-count]');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => observer.observe(counter));
  }

  animate(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      element.textContent = current + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }
}

// ==========================
// SKILL RINGS
// ==========================
class SkillRings {
  constructor() {
    this.nodes = document.querySelectorAll('.skill-node');
    this.init();
  }

  init() {
    // Add SVG gradient defs
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.innerHTML = `
      <defs>
        <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00f0ff"/>
          <stop offset="100%" style="stop-color:#ff004f"/>
        </linearGradient>
      </defs>
    `;
    document.body.appendChild(svg);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.nodes.forEach(node => observer.observe(node));
  }

  animate(node) {
    const skill = parseInt(node.dataset.skill);
    const fill = node.querySelector('.skill-fill');
    if (!fill) return;

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (skill / 100) * circumference;

    setTimeout(() => {
      fill.style.strokeDashoffset = offset;
    }, 200);
  }
}

// ==========================
// PROJECT FILTER
// ==========================
class ProjectFilter {
  constructor() {
    this.buttons = document.querySelectorAll('.filter-btn');
    this.orbs = document.querySelectorAll('.project-orb');

    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        this.buttons.forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', b === btn);
        });

        this.orbs.forEach(orb => {
          const category = orb.dataset.category;
          const show = filter === 'all' || category === filter;

          if (show) {
            orb.classList.remove('hidden');
            orb.style.animation = 'fadeInUp 0.6s ease forwards';
          } else {
            orb.classList.add('hidden');
          }
        });
      });
    });
  }
}

// ==========================
// CONTACT FORM
// ==========================
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form-future');
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = this.form.querySelector('.transmit-btn');
      const text = btn.querySelector('.transmit-text');
      const loader = btn.querySelector('.transmit-loading');

      btn.disabled = true;
      text.hidden = true;
      loader.hidden = false;

      try {
        await emailjs.sendForm('service_yvzbmub', 'template_048g9pv', this.form);
        this.showNotification('Signal transmitted successfully!', 'success');
        this.form.reset();
      } catch (err) {
        this.showNotification('Transmission failed. Retry?', 'error');
      } finally {
        btn.disabled = false;
        text.hidden = false;
        loader.hidden = true;
      }
    });
  }

  showNotification(message, type) {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    notif.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(255, 0, 79, 0.9)'};
      color: white;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      border-radius: 4px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => notif.remove(), 300);
    }, 3000);
  }
}

// ==========================
// SCROLL REVEAL
// ==========================
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.section-header-future, .about-layout, .projects-constellation, .contact-interface, .matrix-card, .skill-node, .terminal-window');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.5, 0, 0, 1), transform 0.8s cubic-bezier(0.5, 0, 0, 1)';
      observer.observe(el);
    });
  }
}

// ==========================
// WARP BUTTON
// ==========================
class WarpButton {
  constructor() {
    this.btn = document.getElementById('warp-home');
    this.init();
  }

  init() {
    if (!this.btn) return;

    window.addEventListener('scroll', () => {
      this.btn.classList.toggle('visible', window.scrollY > 500);
    });

    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ==========================
// FOOTER YEAR
// ==========================
const updateYear = () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
};

// ==========================
// EMAILJS INIT
// ==========================
const initEmailJS = () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init('QdlqQtJQWOfHJmWIq');
  }
};

// ==========================
// GLOBAL STYLES FOR NOTIFICATIONS
// ==========================
const addNotificationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
};

// ==========================
// INITIALIZE EVERYTHING
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  addNotificationStyles();
  initEmailJS();
  updateYear();

  new ParticleSystem();
  new FuturisticCursor();
  new GlitchEngine();
  new Navigation();
  new CounterAnimation();
  new SkillRings();
  new ProjectFilter();
  new ContactForm();
  new ScrollReveal();
  new WarpButton();

  // Initialize typing effect
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const phrases = [
      'Building the future of web...',
      'Crafting digital experiences...',
      'Code. Create. Innovate.',
      'Full-stack architect...'
    ];
    let phraseIndex = 0;

    const typePhrase = () => {
      const phrase = phrases[phraseIndex];
      let charIndex = 0;
      typingEl.textContent = '';

      const typeChar = () => {
        if (charIndex < phrase.length) {
          typingEl.textContent += phrase.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 50);
        } else {
          setTimeout(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typePhrase();
          }, 3000);
        }
      };

      typeChar();
    };

    typePhrase();
  }
});