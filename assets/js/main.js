/**
 * SAS-CAN Services — Master Interactive JS v2.0
 * Fully fixed: search overlay, mobile drawer, mega menu,
 * hero carousel, scroll-to-top, emergency banner, cookie bar,
 * jump-to-model, rep locator, forms
 */

'use strict';

/* ══════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════ */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ══════════════════════════════════════════════════════
   JUMP-TO-MODEL DROPDOWN
════════════════════════════════════════════════════════ */
function initJumpToModel() {
  const btn      = qs('#jump-to-model-btn');
  const dropdown = qs('#jump-model-menu');
  const search   = qs('#jump-model-search');
  const items    = qsa('.jump-model-item');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = dropdown.classList.toggle('show');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', open);
    if (open && search) { search.value = ''; filterItems(''); search.focus(); }
  });

  if (search) {
    search.addEventListener('input', () => filterItems(search.value));
  }

  function filterItems(q) {
    const term = q.toLowerCase().trim();
    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
  }

  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ══════════════════════════════════════════════════════
   MEGA MENUS INTERACTION & ACCESSIBILITY
════════════════════════════════════════════════════════ */
function initMegaMenus() {
  const megaItems = qsa('.nav-item.has-mega');
  if (!megaItems.length) return;

  megaItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const menu = item.querySelector('.mega-menu');
    if (!link || !menu) return;

    let timeoutId = null;

    item.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId);
      megaItems.forEach(other => {
        if (other !== item) other.classList.remove('is-open');
      });
      item.classList.add('is-open');
      link.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('mouseleave', () => {
      timeoutId = setTimeout(() => {
        item.classList.remove('is-open');
        link.setAttribute('aria-expanded', 'false');
      }, 120);
    });

    link.addEventListener('click', e => {
      const isOpen = item.classList.contains('is-open');
      if (window.innerWidth > 1100 && !isOpen) {
        e.preventDefault();
        megaItems.forEach(other => other.classList.remove('is-open'));
        item.classList.add('is-open');
        link.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-item.has-mega')) {
      megaItems.forEach(item => {
        item.classList.remove('is-open');
        const link = item.querySelector('.nav-link');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      megaItems.forEach(item => {
        item.classList.remove('is-open');
        const link = item.querySelector('.nav-link');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
      const jumpDropdown = qs('#jump-model-menu');
      const jumpBtn = qs('#jump-to-model-btn');
      if (jumpDropdown) jumpDropdown.classList.remove('show');
      if (jumpBtn) {
        jumpBtn.classList.remove('active');
        jumpBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

/* ══════════════════════════════════════════════════════
   GLOBAL SEARCH OVERLAY — FIXED
════════════════════════════════════════════════════════ */
function initSearch() {
  const overlay   = qs('.search-overlay');
  const openBtns  = qsa('.header-search-btn');
  const closeBtn  = qs('.search-overlay-close');
  const input     = qs('.search-input-global');
  const form      = qs('.search-form-global');
  if (!overlay) return;

  function openSearch() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input && input.focus(), 220);
  }
  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(b => b.addEventListener('click', openSearch));
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if (e.key === '/' && !e.target.matches('input,textarea,select')) {
      e.preventDefault(); openSearch();
    }
  });

  // Tag clicks
  qsa('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      if (input) input.value = tag.textContent.trim();
      if (input) input.focus();
    });
  });

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = input ? input.value.trim() : '';
      if (q) {
        showToast(`Searching for "${q}"…`);
        closeSearch();
      }
    });
  }
}

/* ══════════════════════════════════════════════════════
   MOBILE DRAWER — FIXED
════════════════════════════════════════════════════════ */
function initMobileDrawer() {
  const drawer     = qs('#mobile-drawer');
  const overlay    = qs('.mobile-drawer-overlay');
  const openBtn    = qs('.mobile-toggle');
  const closeBtn   = qs('.mobile-drawer-close');
  if (!drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay && overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay && overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn  && openBtn.addEventListener('click', openDrawer);
  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  overlay  && overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/* ══════════════════════════════════════════════════════
   STICKY HEADER SHADOW
════════════════════════════════════════════════════════ */
function initStickyHeader() {
  const header = qs('.site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ══════════════════════════════════════════════════════
   HERO SLIDER — FULLY FIXED
════════════════════════════════════════════════════════ */
function initHeroSlider() {
  const slides = qsa('.hero-slide');
  const dots   = qsa('.slider-dot');
  const prev   = qs('.slider-prev');
  const next   = qs('.slider-next');
  if (!slides.length) return;

  let current  = 0;
  let autoplay = null;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current]  && dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]  && dots[current].classList.add('active');
  }

  function startAuto() { autoplay = setInterval(() => goTo(current + 1), 6500); }
  function stopAuto()  { clearInterval(autoplay); }

  dots.forEach((dot, i) => dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));
  prev && prev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  next && next.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  // Touch / swipe support
  const slider = qs('.hero-slider-container');
  if (slider) {
    let tx = 0;
    slider.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 40) { stopAuto(); goTo(dx < 0 ? current + 1 : current - 1); startAuto(); }
    }, { passive: true });
  }

  startAuto();
}

/* ══════════════════════════════════════════════════════
   SCROLL-TO-TOP BUTTON
════════════════════════════════════════════════════════ */
function initScrollTop() {
  const btn = qs('.scroll-top-btn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 350);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════════════════════
   EMERGENCY FAB BANNER
════════════════════════════════════════════════════════ */
function initEmergencyFab() {
  const fab = qs('.emergency-fab');
  if (!fab) return;
  setTimeout(() => fab.classList.add('visible'), 1200);
}

/* ══════════════════════════════════════════════════════
   COOKIE CONSENT BAR
════════════════════════════════════════════════════════ */
function initCookieBar() {
  const bar = qs('.cookie-bar');
  if (!bar) return;
  const key = 'sascan_cookie_consent';
  if (localStorage.getItem(key)) { bar.remove(); return; }
  setTimeout(() => bar.classList.add('visible'), 900);

  qs('.btn-cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem(key, 'accepted');
    bar.classList.remove('visible');
    setTimeout(() => bar.remove(), 400);
  });
  qs('.btn-cookie-reject')?.addEventListener('click', () => {
    localStorage.setItem(key, 'rejected');
    bar.classList.remove('visible');
    setTimeout(() => bar.remove(), 400);
  });
  qs('.btn-cookie-settings')?.addEventListener('click', () => {
    showToast('Cookie preferences panel coming soon.', 'info');
  });
}

/* ══════════════════════════════════════════════════════
   SCROLL FADE-IN ANIMATION
════════════════════════════════════════════════════════ */
function initScrollFadeIn() {
  const els = qsa('.fade-up');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
    obs.observe(el);
  });
}

/* ══════════════════════════════════════════════════════
   FILTER TABS (Products page)
════════════════════════════════════════════════════════ */
function initFilterTabs() {
  qsa('.filter-tabs-bar').forEach(bar => {
    const tabs  = qsa('.filter-tab', bar);
    const target = qs(bar.dataset.target || '.filter-target-area');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;

        if (target) {
          qsa('[data-category]', target).forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        }
      });
    });
  });
}

/* ══════════════════════════════════════════════════════
   PRODUCT IMAGE FALLBACKS
════════════════════════════════════════════════════════ */
function initImageFallbacks() {
  qsa('img[data-fallback-icon]').forEach(img => {
    img.addEventListener('error', () => {
      const icon    = img.dataset.fallbackIcon || 'fa-snowflake';
      const wrapper = img.parentElement;
      if (wrapper) {
        img.style.display = 'none';
        const el = document.createElement('i');
        el.className = `fas ${icon} product-cat-img-icon`;
        wrapper.appendChild(el);
      }
    });
  });
}

/* ══════════════════════════════════════════════════════
   TOAST NOTIFICATION
════════════════════════════════════════════════════════ */
function showToast(msg, type = 'success') {
  let toast = qs('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  const icons = { success: 'fa-check-circle', info: 'fa-info-circle', error: 'fa-exclamation-circle' };
  toast.innerHTML = `<i class="fas ${icons[type] || icons.success}" style="color:var(--cyan);margin-right:8px"></i>${msg}`;
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.display = 'none'; }, 4200);
}

/* ══════════════════════════════════════════════════════
   FORM HANDLERS
════════════════════════════════════════════════════════ */
function initFormHandlers() {
  // Service Request
  const serviceForm = qs('#service-request-form');
  if (serviceForm) {
    serviceForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = serviceForm.querySelector('button[type="submit"]');
      if (btn) btn.textContent = 'Submitting…';
      setTimeout(() => {
        showToast('✓ Service request received! Our team will contact you within 2 hours.');
        serviceForm.reset();
        if (btn) btn.textContent = 'Submit Service Request';
      }, 1400);
    });
  }

  // Parts Quote
  const partsForm = qs('#parts-inquiry-form');
  if (partsForm) {
    partsForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = partsForm.querySelector('button[type="submit"]');
      if (btn) btn.textContent = 'Sending…';
      setTimeout(() => {
        showToast('✓ Parts inquiry submitted! Quote will arrive in 1 business day.');
        partsForm.reset();
        if (btn) btn.textContent = 'Request Parts Quote';
      }, 1400);
    });
  }

  // Newsletter
  qsa('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      if (email && email.value) {
        showToast(`✓ You're subscribed! Welcome to the SAS-CAN newsletter.`);
        form.reset();
      }
    });
  });

  // Contact / generic
  qsa('form.contact-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast('✓ Message sent! We\'ll get back to you shortly.');
      form.reset();
    });
  });
}

/* ══════════════════════════════════════════════════════
   REP LOCATOR
════════════════════════════════════════════════════════ */
const REP_DATABASE = [
  { name: 'Northern Air Systems',       phone: '(416) 555-0181', email: 'info@northernair.ca',   city: 'Toronto',    province: 'ON', zip: 'M5V', type: 'sales,service', desc: 'Full-service commercial HVAC sales and service.' },
  { name: 'Prairie HVAC Solutions',    phone: '(403) 555-0142', email: 'hello@prairiehvac.ca',  city: 'Calgary',    province: 'AB', zip: 'T2P', type: 'sales',         desc: 'Commercial chillers and rooftop systems specialist.' },
  { name: 'Pacific Coast Climate',     phone: '(604) 555-0167', email: 'service@pccclimate.ca', city: 'Vancouver',  province: 'BC', zip: 'V6B', type: 'service',       desc: '24/7 emergency service and planned maintenance.' },
  { name: 'Atlantic Building Systems', phone: '(902) 555-0199', email: 'info@atlanticbs.ca',    city: 'Halifax',    province: 'NS', zip: 'B3J', type: 'sales,service', desc: 'Marine and coastal HVAC installation & service.' },
  { name: 'Capital District HVAC',     phone: '(613) 555-0155', email: 'contact@cdhvac.ca',     city: 'Ottawa',     province: 'ON', zip: 'K1A', type: 'sales,service', desc: 'Government and commercial building specialists.' },
  { name: 'Westgate Climate Control',  phone: '(780) 555-0134', email: 'info@westgateclimate.ca',city: 'Edmonton',  province: 'AB', zip: 'T5J', type: 'sales',         desc: 'Industrial and heavy commercial HVAC solutions.' },
  { name: 'Great Lakes Air',           phone: '(905) 555-0178', email: 'service@greatlakesair.ca',city:'Mississauga',province:'ON', zip: 'L4Z', type: 'service',       desc: 'Service and parts depot for Southern Ontario.' },
  { name: 'St. Lawrence Air Partners', phone: '(514) 555-0162', email: 'info@stlawrenceair.ca', city: 'Montreal',   province: 'QC', zip: 'H2Y', type: 'sales,service', desc: 'Bilingual HVAC solutions for Quebec and surroundings.' },
];

function initRepLocator() {
  const form        = qs('#rep-locator-form');
  const resultsArea = qs('#locator-results');
  const quickInput  = qs('.locator-input');
  const quickBtn    = qs('.locator-btn');
  if (!form && !quickBtn) return;

  function renderResults(matches) {
    if (!resultsArea) return;
    if (!matches.length) {
      resultsArea.innerHTML = `
        <div style="text-align:center;padding:48px 24px;color:var(--text-muted);">
          <i class="fas fa-map-marker-slash" style="font-size:3rem;color:var(--border);display:block;margin-bottom:14px"></i>
          <p>No reps found for that location. Try a different city, province or ZIP.</p>
        </div>`;
      return;
    }
    resultsArea.innerHTML = `
      <p style="margin-bottom:16px;font-size:.85rem;color:var(--text-muted);">${matches.length} rep${matches.length > 1 ? 's' : ''} found</p>
      ${matches.map(r => `
        <div class="locator-result-card fade-up">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:10px">
            <div>
              <h3 style="font-size:1.05rem;font-weight:800;color:var(--navy);margin-bottom:4px">${r.name}</h3>
              <p style="font-size:.80rem;color:var(--text-muted)">${r.city}, ${r.province} &bull; ${r.zip}</p>
            </div>
            <span style="background:var(--cyan-lt);color:var(--blue);font-size:.70rem;font-weight:800;padding:3px 10px;border-radius:3px;text-transform:uppercase">
              ${r.type.replace(',', ' & ')}
            </span>
          </div>
          <p style="font-size:.85rem;color:var(--text-muted);margin-bottom:14px">${r.desc}</p>
          <div style="display:flex;gap:14px;flex-wrap:wrap">
            <a href="tel:${r.phone.replace(/\D/g,'')}" style="font-size:.85rem;font-weight:700;color:var(--blue);display:flex;align-items:center;gap:6px">
              <i class="fas fa-phone"></i> ${r.phone}
            </a>
            <a href="mailto:${r.email}" style="font-size:.85rem;font-weight:700;color:var(--blue);display:flex;align-items:center;gap:6px">
              <i class="fas fa-envelope"></i> ${r.email}
            </a>
          </div>
        </div>
      `).join('')}`;
    initScrollFadeIn();
  }

  function search(query, typeFilter = 'all') {
    const q = query.toLowerCase().trim();
    if (!q) { renderResults([]); return; }
    const filtered = REP_DATABASE.filter(r => {
      const matchLoc  = r.city.toLowerCase().includes(q) || r.province.toLowerCase().includes(q) || r.zip.toLowerCase().includes(q) || r.name.toLowerCase().includes(q);
      const matchType = typeFilter === 'all' || r.type.includes(typeFilter);
      return matchLoc && matchType;
    });
    renderResults(filtered);
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = (form.querySelector('#locator-zip') || form.querySelector('#locator-query') || form.querySelector('input[name="location"]') || form.querySelector('input[type="text"]'))?.value || '';
      const t = (form.querySelector('#locator-type') || form.querySelector('#locator-type-filter'))?.value || 'all';
      search(q, t);
    });
  }

  if (quickBtn) {
    quickBtn.addEventListener('click', () => {
      const q = quickInput?.value || '';
      if (q) window.location = `rep-locator.html?q=${encodeURIComponent(q)}`;
    });
    quickInput?.addEventListener('keydown', e => {
      if (e.key === 'Enter') quickBtn.click();
    });
  }

  // Pre-fill from URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('q') && form) {
    const inp = form.querySelector('#locator-zip') || form.querySelector('#locator-query') || form.querySelector('input[name="location"]') || form.querySelector('input[type="text"]');
    if (inp) { inp.value = params.get('q'); search(params.get('q')); }
  }
}

/* ══════════════════════════════════════════════════════
   ACTIVE NAV LINK (by current page)
════════════════════════════════════════════════════════ */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const cleanPage = path.split('?')[0].split('#')[0] || 'index.html';
  const isProductPage = ['products.html', 'chillers.html', 'air-handlers.html', 'rooftop-systems.html'].includes(cleanPage);

  qsa('.nav-item').forEach(item => {
    const link = item.querySelector('.nav-link');
    if (!link) return;
    const href = (link.getAttribute('href') || '').split('?')[0].split('#')[0];
    link.classList.remove('active');

    if (cleanPage === href) {
      link.classList.add('active');
    } else if (isProductPage && href === 'products.html') {
      link.classList.add('active');
    } else if (cleanPage === 'industry-solutions.html' && href === 'industry-solutions.html') {
      link.classList.add('active');
    } else if (cleanPage === 'resources.html' && href === 'resources.html') {
      link.classList.add('active');
    }
  });
}

/* ══════════════════════════════════════════════════════
   SMOOTH ANCHOR SCROLLING
════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) {
        e.preventDefault();
        const offset = (qs('.site-header')?.offsetHeight || 80) + 16;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });
}

/* ══════════════════════════════════════════════════════
   COUNTER ANIMATION (stat numbers)
════════════════════════════════════════════════════════ */
function initCounters() {
  const counters = qsa('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur  = 1600;
      const step = 16;
      let current = 0;
      const increment = end / (dur / step);
      const timer = setInterval(() => {
        current = Math.min(current + increment, end);
        el.textContent = (Number.isInteger(end) ? Math.round(current) : current.toFixed(1)) + suffix;
        if (current >= end) clearInterval(timer);
      }, step);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => obs.observe(c));
}

/* ══════════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initJumpToModel();
  initMegaMenus();
  initSearch();
  initMobileDrawer();
  initStickyHeader();
  initHeroSlider();
  initScrollTop();
  initEmergencyFab();
  initCookieBar();
  initScrollFadeIn();
  initFilterTabs();
  initImageFallbacks();
  initFormHandlers();
  initRepLocator();
  initActiveNav();
  initSmoothScroll();
  initCounters();
});

// Make showToast globally available
window.showToast = showToast;
