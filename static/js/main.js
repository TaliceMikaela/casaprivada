const publicGalleryGrid = document.getElementById('publicGalleryGrid');
const publicGalleryEmpty = document.getElementById('publicGalleryEmpty');
const securityOverlay = document.getElementById('securityOverlay');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const closeLightboxBtn = document.getElementById('closeLightboxBtn');
const modelsGrid = document.getElementById('modelsGrid');
const modelsEmpty = document.getElementById('modelsEmpty');
const modelGalleryPanel = document.getElementById('modelGalleryPanel');
const modelGalleryGrid = document.getElementById('modelGalleryGrid');
const modelGalleryTitle = document.getElementById('modelGalleryTitle');
const modelGalleryMeta = document.getElementById('modelGalleryMeta');
const modelGalleryDescription = document.getElementById('modelGalleryDescription');
const backToModelsBtn = document.getElementById('backToModelsBtn');
const eventPopup = document.getElementById('eventPopup');
const closeEventPopupBtn = document.getElementById('closeEventPopupBtn');
const dismissEventPopupBtn = document.getElementById('dismissEventPopupBtn');
const openEventBannerBtn = document.getElementById('openEventBannerBtn');
const ageGate = document.getElementById('ageGate');
const ageConfirmBtn = document.getElementById('ageConfirmBtn');


const EVENT_POPUP_END_AT = '2026-05-11T00:00:00-03:00';
const AGE_GATE_STORAGE_KEY = 'cdp_age_gate_18_verified';
const AGE_GATE_COOKIE_NAME = 'cdp_age_gate_18_verified';
const EVENT_POPUP_SESSION_KEY = 'cdp_event_popup_shown';
const EVENT_BANNER = {
  src: 'static/img/eventos/evento-noite-das-coelhinhas-2026-05-10-casa-dos-prazeres-prive-lounge.png',
  alt: 'Banner do evento Noite das Coelhinhas da Casa dos Prazeres Privé Lounge',
  title: 'Noite das Coelhinhas',
  description: 'Evento especial da casa em 10/05. Confirmação antecipada pelo WhatsApp.'
};

const PUBLIC_GALLERY_ITEMS = Array.isArray(window.HOUSE_GALLERY_ITEMS) ? window.HOUSE_GALLERY_ITEMS : [];
const MODELS_GALLERY_DATA = Array.isArray(window.MODELS_GALLERY_DATA) ? window.MODELS_GALLERY_DATA : [];

init();

function init() {
  renderPublicGallery(PUBLIC_GALLERY_ITEMS);
  renderModelsGallery(MODELS_GALLERY_DATA);
  bindLightboxEvents();
  bindModelsEvents();
  bindEventPopup();
  bindAgeGate();
  enableImageProtection();
}

function renderPublicGallery(items) {
  if (!publicGalleryGrid || !publicGalleryEmpty) return;
  publicGalleryGrid.innerHTML = '';

  if (!items.length) {
    publicGalleryEmpty.classList.remove('hidden');
    return;
  }

  publicGalleryEmpty.classList.add('hidden');

  items.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'public-gallery-card';
    button.dataset.index = String(index);
    button.setAttribute('aria-label', `Ampliar foto ${index + 1}: ${item.title || 'Ambiente da casa'}`);
    button.innerHTML = `
      <div class="public-gallery-media gallery-watermark">
        <img class="public-gallery-image" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || item.title || 'Foto do ambiente da casa')}" loading="lazy" draggable="false" />
        <div class="public-gallery-overlay">
          <h3>${escapeHtml(item.title || 'Ambiente da casa')}</h3>
          <p>${escapeHtml(item.description || 'Toque para ampliar')}</p>
        </div>
      </div>
    `;

    button.addEventListener('click', () => openLightbox(item));
    publicGalleryGrid.appendChild(button);
  });
}

function bindLightboxEvents() {
  closeLightboxBtn?.addEventListener('click', closeLightbox);

  lightboxModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeLightbox === 'true') {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightboxModal?.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

function openLightbox(item) {
  if (!lightboxModal || !lightboxImage || !lightboxTitle || !lightboxDescription) return;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt || item.title || 'Foto ampliada do ambiente';
  lightboxTitle.textContent = item.title || 'Ambiente da casa';
  lightboxDescription.textContent = item.description || 'Visualização ampliada';
  lightboxModal.classList.remove('hidden');
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxModal || !lightboxImage) return;
  lightboxModal.classList.add('hidden');
  lightboxModal.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

function enableImageProtection() {
  let longPressTimer = null;

  const isProtectedTarget = (target) => Boolean(
    target?.closest?.('.protect-area') ||
    target?.closest?.('.lightbox') ||
    target?.closest?.('.event-popup')
  );

  const clearLongPressTimer = () => {
    if (!longPressTimer) return;
    clearTimeout(longPressTimer);
    longPressTimer = null;
  };

  const showProtection = (event, options = {}) => {
    if (event?.cancelable !== false) {
      event?.preventDefault?.();
    }

    if (options.stop !== false) {
      event?.stopPropagation?.();
    }

    triggerSecurityOverlay(options);
  };

  const writeClipboardWarning = () => {
    if (!navigator.clipboard?.writeText) return;
    navigator.clipboard.writeText('Conteúdo protegido. Captura, cópia ou compartilhamento não autorizado.').catch(() => {});
  };

  ['contextmenu', 'dragstart', 'selectstart', 'copy', 'cut'].forEach((eventName) => {
    document.addEventListener(eventName, (event) => {
      if (isProtectedTarget(event.target)) {
        showProtection(event);
      }
    }, true);
  });

  document.addEventListener('keydown', (event) => {
    const key = String(event.key || '').toLowerCase();
    const code = String(event.code || '').toLowerCase();
    const ctrlOrMeta = event.ctrlKey || event.metaKey;

    const shouldBlock = [
      ctrlOrMeta && ['s', 'p', 'u', 'c', 'x', 'a'].includes(key),
      ctrlOrMeta && event.shiftKey && ['i', 'j', 'c', 'k'].includes(key),
      key === 'f12',
      key === 'printscreen' || code === 'printscreen'
    ].some(Boolean);

    if (shouldBlock) {
      showProtection(event);
      writeClipboardWarning();
    }
  }, true);

  document.addEventListener('keyup', (event) => {
    const key = String(event.key || '').toLowerCase();
    const code = String(event.code || '').toLowerCase();

    if (key === 'printscreen' || code === 'printscreen') {
      showProtection(event);
      writeClipboardWarning();
    }
  }, true);

  document.addEventListener('touchstart', (event) => {
    if (!isProtectedTarget(event.target)) return;

    if (event.touches.length >= 2) {
      showProtection(event, { stop: false });
      return;
    }

    clearLongPressTimer();
    longPressTimer = setTimeout(() => {
      triggerSecurityOverlay();
    }, 650);
  }, { capture: true, passive: false });

  document.addEventListener('touchmove', (event) => {
    if (event.touches?.length >= 2 && isProtectedTarget(event.target)) {
      showProtection(event, { stop: false });
    }

    clearLongPressTimer();
  }, { capture: true, passive: false });

  ['touchend', 'touchcancel', 'pointerup', 'pointercancel', 'mouseup', 'mouseleave'].forEach((eventName) => {
    document.addEventListener(eventName, clearLongPressTimer, true);
  });

  window.addEventListener('beforeprint', () => triggerSecurityOverlay({ keepVisible: true }));
  window.addEventListener('afterprint', releaseVisibilityShield);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') {
      engageVisibilityShield();
    } else {
      releaseVisibilityShield();
    }
  });

  window.addEventListener('pagehide', () => engageVisibilityShield());
  window.addEventListener('blur', () => engageVisibilityShield());
  window.addEventListener('focus', releaseVisibilityShield);
}

function engageVisibilityShield() {
  document.body.classList.add('security-blur', 'visibility-guard');
  triggerSecurityOverlay({ keepVisible: true });
}

function releaseVisibilityShield() {
  document.body.classList.remove('visibility-guard');
  clearTimeout(triggerSecurityOverlay.timer);
  triggerSecurityOverlay.timer = setTimeout(() => {
    document.body.classList.remove('security-blur');
    securityOverlay?.classList.add('hidden');
    securityOverlay?.setAttribute('aria-hidden', 'true');
  }, 900);
}

function triggerSecurityOverlay(options = {}) {
  document.body.classList.add('security-blur');
  securityOverlay?.classList.remove('hidden');
  securityOverlay?.setAttribute('aria-hidden', 'false');

  clearTimeout(triggerSecurityOverlay.timer);
  triggerSecurityOverlay.timer = setTimeout(() => {
    if (options.keepVisible || document.body.classList.contains('visibility-guard')) return;
    document.body.classList.remove('security-blur');
    securityOverlay?.classList.add('hidden');
    securityOverlay?.setAttribute('aria-hidden', 'true');
  }, 6000);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}


function renderModelsGallery(models) {
  if (!modelsGrid || !modelsEmpty) return;
  modelsGrid.innerHTML = '';

  if (!models.length) {
    modelsEmpty.classList.remove('hidden');
    return;
  }

  modelsEmpty.classList.add('hidden');

  models.forEach((model, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'public-gallery-card model-gallery-card';
    button.dataset.modelIndex = String(index);
    button.setAttribute('aria-label', `Abrir galeria de ${model.name || 'modelo'}`);

    const metaText = buildModelMetaText(model);
    const subtitle = [metaText, model.tagline || 'Clique para ver a galeria individual.']
      .filter(Boolean)
      .join(' • ');

    button.innerHTML = `
      <div class="public-gallery-media gallery-watermark">
        <img class="public-gallery-image" src="${escapeHtml(model.cover || '')}" alt="${escapeHtml(model.name || 'Modelo')}" loading="lazy" draggable="false" />
        <div class="public-gallery-overlay">
          <h3>${escapeHtml(model.name || 'Modelo')}</h3>
          <p>${escapeHtml(subtitle)}</p>
        </div>
      </div>
    `;

    button.addEventListener('click', () => openModelGallery(index));
    modelsGrid.appendChild(button);
  });
}

function bindModelsEvents() {
  backToModelsBtn?.addEventListener('click', closeModelGallery);
}

function openModelGallery(index) {
  const model = MODELS_GALLERY_DATA[index];
  if (!model || !modelGalleryPanel || !modelGalleryGrid || !modelGalleryTitle || !modelGalleryMeta || !modelGalleryDescription) return;

  modelGalleryTitle.textContent = model.name || 'Modelo';
  modelGalleryMeta.innerHTML = buildModelMeta(model);
  modelGalleryDescription.textContent = model.description || 'Galeria individual da modelo.';
  modelGalleryGrid.innerHTML = '';

  const photos = Array.isArray(model.gallery) ? model.gallery : [];

  photos.forEach((photo, photoIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'public-gallery-card model-photo-card';
    button.dataset.photoIndex = String(photoIndex);
    button.innerHTML = `
      <div class="public-gallery-media gallery-watermark">
        <img class="public-gallery-image" src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || photo.title || model.name || 'Foto da modelo')}" loading="lazy" draggable="false" />
        <div class="public-gallery-overlay">
          <h3>${escapeHtml(photo.title || `${model.name || 'Modelo'} • Foto ${photoIndex + 1}`)}</h3>
          <p>${escapeHtml(photo.description || 'Clique para ampliar')}</p>
        </div>
      </div>
    `;

    button.addEventListener('click', () => openLightbox({
      src: photo.src,
      alt: photo.alt || photo.title || model.name || 'Foto da modelo',
      title: photo.title || `${model.name || 'Modelo'} • Foto ${photoIndex + 1}`,
      description: photo.description || model.description || 'Visualização ampliada'
    }));

    modelGalleryGrid.appendChild(button);
  });

  modelGalleryPanel.classList.remove('hidden');
  modelGalleryPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeModelGallery() {
  modelGalleryPanel?.classList.add('hidden');
  document.getElementById('modelos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildModelMeta(model) {
  return [model.age, model.sign, model.city]
    .filter(Boolean)
    .map((value) => `<span class="model-pill">${escapeHtml(value)}</span>`)
    .join('');
}

function buildModelMetaText(model) {
  return [model.age, model.sign, model.city]
    .filter(Boolean)
    .join(' • ');
}


function bindAgeGate() {
  if (!ageGate || !ageConfirmBtn) return;

  if (isAgeVerified()) {
    unlockAgeGate();
    showEventPopupAfterAgeConfirmation();
    return;
  }

  lockAgeGate();

  ageConfirmBtn.addEventListener('click', () => {
    persistAgeVerification();
    unlockAgeGate();
    showEventPopupAfterAgeConfirmation(true);
  }, { once: true });
}

function lockAgeGate() {
  if (!ageGate) return;
  closeEventPopup(false);
  ageGate.classList.remove('hidden');
  ageGate.setAttribute('aria-hidden', 'false');
  document.body.classList.add('age-gate-active');
  document.body.style.overflow = 'hidden';
}

function persistAgeVerification() {
  safeStorageSet('localStorage', AGE_GATE_STORAGE_KEY, '1');
  safeStorageSet('sessionStorage', AGE_GATE_STORAGE_KEY, '1');
  setCookie(AGE_GATE_COOKIE_NAME, '1', 30);
}

function isAgeVerified() {
  return (
    safeStorageGet('localStorage', AGE_GATE_STORAGE_KEY) === '1' ||
    safeStorageGet('sessionStorage', AGE_GATE_STORAGE_KEY) === '1' ||
    getCookie(AGE_GATE_COOKIE_NAME) === '1'
  );
}

function unlockAgeGate() {
  if (!ageGate) return;
  ageGate.classList.add('hidden');
  ageGate.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('age-gate-active');
  if (lightboxModal?.classList.contains('hidden') && eventPopup?.classList.contains('hidden')) {
    document.body.style.overflow = '';
  }
}

function bindEventPopup() {
  closeEventPopupBtn?.addEventListener('click', () => closeEventPopup(true));
  dismissEventPopupBtn?.addEventListener('click', () => closeEventPopup(true));
  openEventBannerBtn?.addEventListener('click', () => openLightbox(EVENT_BANNER));

  eventPopup?.addEventListener('click', (event) => {
    if (event.target.dataset.closeEventPopup === 'true') {
      closeEventPopup(true);
    }
  });
}

function showEventPopupAfterAgeConfirmation(force = false) {
  if (!eventPopup || !isAgeVerified() || isEventPopupExpired() || isAgeGateVisible()) return;
  if (!force && hasShownEventPopupInSession()) return;

  window.setTimeout(() => {
    if (isAgeGateVisible() || isEventPopupExpired()) return;
    eventPopup.classList.remove('hidden');
    eventPopup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    markEventPopupAsShown();
  }, 700);
}

function isEventPopupExpired() {
  const endAt = new Date(EVENT_POPUP_END_AT);
  if (Number.isNaN(endAt.getTime())) return false;
  return Date.now() >= endAt.getTime();
}

function closeEventPopup(remember = false) {
  if (!eventPopup) return;
  eventPopup.classList.add('hidden');
  eventPopup.setAttribute('aria-hidden', 'true');

  if (remember) {
    markEventPopupAsShown();
  }

  if (!isAgeGateVisible() && document.body.style.overflow === 'hidden' && lightboxModal?.classList.contains('hidden')) {
    document.body.style.overflow = '';
  }
}

function isAgeGateVisible() {
  return Boolean(ageGate && !ageGate.classList.contains('hidden'));
}

function hasShownEventPopupInSession() {
  return safeStorageGet('sessionStorage', EVENT_POPUP_SESSION_KEY) === '1';
}

function markEventPopupAsShown() {
  safeStorageSet('sessionStorage', EVENT_POPUP_SESSION_KEY, '1');
}

function safeStorageGet(storageName, key) {
  try {
    return window[storageName]?.getItem(key) ?? null;
  } catch (error) {
    return null;
  }
}

function safeStorageSet(storageName, key, value) {
  try {
    window[storageName]?.setItem(key, value);
  } catch (error) {
    // segue sem storage
  }
}

function setCookie(name, value, days) {
  try {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch (error) {
    // segue sem cookie
  }
}

function getCookie(name) {
  try {
    const prefix = `${name}=`;
    return document.cookie
      .split(';')
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix))
      ?.slice(prefix.length) ?? null;
  } catch (error) {
    return null;
  }
}
