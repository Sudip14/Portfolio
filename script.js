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
    this.animationId = null;

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

      if (dist < 150 && dist > 0) {
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
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.isActive = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);
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

    if (!this.core || window.matchMedia('(hover: none)').matches) {
      if (this.core) this.core.style.display = 'none';
      if (this.ring) this.ring.style.display = 'none';
      return;
    }

    this.mouseX = 0;
    this.mouseY = 0;
    this.ringX = 0;
    this.ringY = 0;
    this.trailDots = [];
    this.isActive = true;

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
    if (!this.isActive) return;
    this.ringX += (this.mouseX - this.ringX) * 0.15;
    this.ringY += (this.mouseY - this.ringY) * 0.15;
    this.ring.style.left = this.ringX + 'px';
    this.ring.style.top = this.ringY + 'px';
    requestAnimationFrame(() => this.animateRing());
  }

  addTrailDot(x, y) {
    if (this.trailDots.length > 20) {
      const old = this.trailDots.shift();
      if (old && old.parentNode) old.remove();
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
    const interactives = document.querySelectorAll('a, button, .project-orb, .skill-node, .filter-btn, .social-node, .channel, input, textarea');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => this.ring?.classList.add('hover'));
      el.addEventListener('mouseleave', () => this.ring?.classList.remove('hover'));
    });
  }

  destroy() {
    this.isActive = false;
    this.trailDots.forEach(dot => dot.remove());
    this.trailDots = [];
  }
}

// ==========================
// GLITCH EFFECTS
// ==========================
class GlitchEngine {
  constructor() {
    this.overlay = document.getElementById('glitch-overlay');
    this.interval = null;
    this.init();
  }

  init() {
    // Random glitch triggers
    this.interval = setInterval(() => {
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

  destroy() {
    if (this.interval) clearInterval(this.interval);
  }
}

// ==========================
// TYPING EFFECT
// ==========================
class TypeWriter {
  constructor(element, texts, speed = 50) {
    this.element = element;
    this.texts = Array.isArray(texts) ? texts : [texts];
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.isActive = true;
    this.init();
  }

  init() {
    this.type();
  }

  type() {
    if (!this.isActive) return;

    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? this.speed / 2 : this.speed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(() => this.type(), typeSpeed);
  }

  destroy() {
    this.isActive = false;
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
    this.sections = document.querySelectorAll('section[id]');
    
    this.scrollHandler = null;
    this.init();
  }

  init() {
    // Scroll effect for nav background
    this.scrollHandler = () => {
      this.nav.classList.toggle('scrolled', window.scrollY > 50);
      this.updateActiveLink();
    };
    window.addEventListener('scroll', this.scrollHandler);

    // Mobile toggle
    this.toggle?.addEventListener('click', () => {
      this.toggle.classList.toggle('active');
      this.menu.classList.toggle('open');
      document.body.style.overflow = this.menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        this.toggle.classList.remove('active');
        this.menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  updateActiveLink() {
    let current = '';
    this.sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });

    this.links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  destroy() {
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
  }
}

// ==========================
// COUNTER ANIMATION
// ==========================
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('.metric-value[data-count]');
    this.observer = null;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => this.observer.observe(counter));
  }

  animate(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      element.textContent = current + (element.classList.contains('metric-infinite') ? '' : '+');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
  }
}

// ==========================
// SKILL RINGS
// ==========================
class SkillRings {
  constructor() {
    this.nodes = document.querySelectorAll('.skill-node');
    this.observer = null;
    this.init();
  }

  init() {
    // Add SVG gradient defs once
    if (!document.getElementById('skillGradient')) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '0');
      svg.setAttribute('height', '0');
      svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = `
        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00f0ff"/>
            <stop offset="100%" style="stop-color:#ff004f"/>
          </linearGradient>
        </defs>
      `;
      document.body.appendChild(svg);
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.nodes.forEach(node => this.observer.observe(node));
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

  destroy() {
    if (this.observer) this.observer.disconnect();
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

        // Update button states
        this.buttons.forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', b === btn);
        });

        // Filter orbs with animation
        this.orbs.forEach((orb, index) => {
          const category = orb.dataset.category;
          const show = filter === 'all' || category === filter;

          if (show) {
            orb.classList.remove('hidden');
            orb.style.opacity = '0';
            orb.style.transform = 'translateY(30px)';
            setTimeout(() => {
              orb.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              orb.style.opacity = '1';
              orb.style.transform = 'translateY(0)';
            }, index * 50);
          } else {
            orb.style.opacity = '0';
            orb.style.transform = 'translateY(30px)';
            setTimeout(() => orb.classList.add('hidden'), 300);
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

      // Basic validation
      const name = this.form.querySelector('#tx-name').value.trim();
      const email = this.form.querySelector('#tx-email').value.trim();
      const message = this.form.querySelector('#tx-message').value.trim();

      if (!name || !email || !message) {
        this.showNotification('All fields are required.', 'error');
        return;
      }

      if (!this.isValidEmail(email)) {
        this.showNotification('Invalid communication address.', 'error');
        return;
      }

      const btn = this.form.querySelector('.transmit-btn');
      const text = btn.querySelector('.transmit-text');
      const loader = btn.querySelector('.transmit-loading');

      btn.disabled = true;
      text.hidden = true;
      loader.hidden = false;

      try {
        if (typeof emailjs !== 'undefined') {
          await emailjs.sendForm('service_yvzbmub', 'template_048g9pv', this.form);
          this.showNotification('Signal transmitted successfully!', 'success');
          this.form.reset();
        } else {
          // Fallback if EmailJS not loaded
          console.log('Form data:', { name, email, message });
          this.showNotification('Signal transmitted successfully!', 'success');
          this.form.reset();
        }
      } catch (err) {
        console.error('Email error:', err);
        this.showNotification('Transmission failed. Retry?', 'error');
      } finally {
        btn.disabled = false;
        text.hidden = false;
        loader.hidden = true;
      }
    });
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showNotification(message, type) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    notif.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(255, 0, 79, 0.95)'};
      color: white;
      font-family: var(--font-mono), monospace;
      font-size: 0.8rem;
      border-radius: 4px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      border: 1px solid ${type === 'success' ? '#22c55e' : '#ff004f'};
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
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
    this.elements = document.querySelectorAll(
      '.section-header-future, .about-layout > *, .projects-constellation, .contact-interface, .matrix-card, .skill-node, .terminal-window'
    );
    this.observer = null;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    this.elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = `opacity 0.8s cubic-bezier(0.5, 0, 0, 1) ${index * 0.05}s, transform 0.8s cubic-bezier(0.5, 0, 0, 1) ${index * 0.05}s`;
      this.observer.observe(el);
    });
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
  }
}

// ==========================
// WARP BUTTON
// ==========================
class WarpButton {
  constructor() {
    this.btn = document.getElementById('warp-home');
    this.scrollHandler = null;
    this.init();
  }

  init() {
    if (!this.btn) return;

    this.scrollHandler = () => {
      this.btn.classList.toggle('visible', window.scrollY > 500);
    };
    window.addEventListener('scroll', this.scrollHandler);

    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  destroy() {
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
  }
}

// ==========================
// FOOTER YEAR
// ==========================
const updateYear = () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = '2024';
};

// ==========================
// EMAILJS INIT
// ==========================
const initEmailJS = () => {
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init('QdlqQtJQWOfHJmWIq');
    } catch (e) {
      console.warn('EmailJS init failed:', e);
    }
  }
};

// ==========================
// GLOBAL STYLES FOR NOTIFICATIONS
// ==========================
const addNotificationStyles = () => {
  if (document.getElementById('notification-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
};

// ==========================
// PREFERS REDUCED MOTION
// ==========================
const checkReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ==========================
// INITIALIZE EVERYTHING
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  addNotificationStyles();
  initEmailJS();
  updateYear();

  const reducedMotion = checkReducedMotion();

  // Initialize systems
  const systems = [];

  if (!reducedMotion) {
    systems.push(new ParticleSystem());
    systems.push(new FuturisticCursor());
    systems.push(new GlitchEngine());
  }

  systems.push(new Navigation());
  systems.push(new CounterAnimation());
  systems.push(new SkillRings());
  systems.push(new ProjectFilter());
  systems.push(new ContactForm());
  systems.push(new ScrollReveal());
  systems.push(new WarpButton());

  // Initialize typing effect
  const typingEl = document.getElementById('typing-text');
  if (typingEl && !reducedMotion) {
    const phrases = [
      'Building the future of web...',
      'Crafting digital experiences...',
      'Code. Create. Innovate.',
      'Full-stack architect...'
    ];
    new TypeWriter(typingEl, phrases, 50);
  } else if (typingEl) {
    typingEl.textContent = 'Full-stack developer from Nepal.';
  }

  // Expose for debugging
  window.portfolioSystems = systems;
});

// Cleanup on page hide
window.addEventListener('pagehide', () => {
  if (window.portfolioSystems) {
    window.portfolioSystems.forEach(sys => {
      if (sys && typeof sys.destroy === 'function') sys.destroy();
    });
  }
});