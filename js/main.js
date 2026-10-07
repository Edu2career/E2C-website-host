'use strict';

document.documentElement.classList.add('js');

function initNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (!toggle || !navigation) return;

  const desktop = window.matchMedia('(min-width: 881px)');
  const setMenu = open => {
    navigation.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
  };

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  navigation.addEventListener('focusout', event => {
    if (!event.relatedTarget?.closest('.site-header')) setMenu(false);
  });
  desktop.addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });
}

function initExperienceTabs() {
  const tablist = document.querySelector('.experience-tabs');
  if (!tablist) return;
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  if (!tabs.length || panels.some(panel => !panel)) return;

  const activate = selected => {
    tabs.forEach((tab, index) => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[index].hidden = !active;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      switch (event.key) {
        case 'ArrowRight': next = (index + 1) % tabs.length; break;
        case 'ArrowLeft': next = (index - 1 + tabs.length) % tabs.length; break;
        case 'Home': next = 0; break;
        case 'End': next = tabs.length - 1; break;
        default: return;
      }
      event.preventDefault();
      activate(tabs[next]);
      tabs[next].focus();
    });
  });
  activate(tabs[0]);
  tablist.hidden = false;
}

function initContactDialog() {
  const dialog = document.querySelector('#contact-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const email = document.querySelector('#contact-email');
  const copy = document.querySelector('#copy-email');
  const status = document.querySelector('#copy-status');
  let resetTimer;
  let opener;
  let previousScroll = 0;

  document.querySelectorAll('[data-contact]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      opener = link;
      previousScroll = window.scrollY;
      status.textContent = '';
      dialog.showModal();
      document.documentElement.classList.add('modal-open');
    });
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('modal-open');
    clearTimeout(resetTimer);
    copy.querySelector('span').textContent = 'Copy';
    // Click focus differs between browsers. Return to the link that opened the dialog.
    opener?.focus({ preventScroll: true });
    window.scrollTo({ top: previousScroll, behavior: 'instant' });
  });

  // A click on the backdrop targets the dialog. A click inside its box should stay open.
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (event.target === dialog && outside) dialog.close();
  });
  copy.addEventListener('click', async () => {
    clearTimeout(resetTimer);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email.value);
      if (!dialog.open) return;
      copy.querySelector('span').textContent = 'Copied';
      status.textContent = 'Email address copied.';
      resetTimer = setTimeout(() => {
        copy.querySelector('span').textContent = 'Copy';
      }, 2400);
    } catch {
      email.focus();
      email.select();
      status.textContent = 'Select and copy the email address.';
    }
  });
}

function initPageState() {
  const header = document.querySelector('#site-header');
  const backToTop = document.querySelector('#back-to-top');
  const links = [...document.querySelectorAll('.navigation a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scheduled = false;

  const update = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 16);
    if (backToTop) backToTop.hidden = window.scrollY < 700;
    let active = -1;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= window.innerHeight * .35) {
        active = index;
      }
    });
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  };

  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
  backToTop?.addEventListener('click', () => {
    const home = document.querySelector('.site-header .brand');
    home?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  });
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
}

initNavigation();
initExperienceTabs();
initContactDialog();
initPageState();
