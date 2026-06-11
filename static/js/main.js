const publicGalleryGrid = document.getElementById('publicGalleryGrid');
const publicGalleryEmpty = document.getElementById('publicGalleryEmpty');
const securityOverlay = document.getElementById('securityOverlay');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const closeLightboxBtn = document.getElementById('closeLightboxBtn');
const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
const lightboxNextBtn = document.getElementById('lightboxNextBtn');
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
const cookieConsentBanner = document.getElementById('cookieConsentBanner');
const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
const necessaryCookiesBtn = document.getElementById('necessaryCookiesBtn');
const clearSiteDataBtn = document.getElementById('clearSiteDataBtn');


const EVENT_POPUP_END_AT = '2026-05-11T00:00:00-03:00';
const AGE_GATE_STORAGE_KEY = 'cdp_age_gate_18_verified';
const AGE_GATE_COOKIE_NAME = 'cdp_age_gate_18_verified';
const EVENT_POPUP_SESSION_KEY = 'cdp_event_popup_shown';
const COOKIE_CONSENT_STORAGE_KEY = 'cdp_cookie_cache_consent';
const COOKIE_CONSENT_COOKIE_NAME = 'cdp_cookie_cache_consent';

const EVENT_BANNER = {
  src: 'static/img/eventos/evento-noite-das-coelhinhas-2026-05-10-casa-dos-prazeres-prive-lounge.png',
  alt: 'Banner do evento Noite das Coelhinhas da Casa dos Prazeres Privé Lounge',
  title: 'Noite das Coelhinhas',
  description: 'Evento especial da casa em 10/05. Confirmação antecipada pelo WhatsApp.'
};

let lightboxItems = [];
let lightboxCurrentIndex = -1;

const PUBLIC_GALLERY_ITEMS = Array.isArray(window.HOUSE_GALLERY_ITEMS) ? window.HOUSE_GALLERY_ITEMS : [];
const MODELS_GALLERY_DATA = Array.isArray(window.MODELS_GALLERY_DATA) ? window.MODELS_GALLERY_DATA : [];

init();

function init() {
  renderPublicGallery(PUBLIC_GALLERY_ITEMS);
  renderModelsGallery(MODELS_GALLERY_DATA);
  bindLightboxEvents();
  bindModelsEvents();
  bindEventPopup();
  bindCookieConsent();
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

    button.addEventListener('click', () => openLightbox({
      src: item.src,
      alt: item.alt || item.title || 'Foto do ambiente da casa',
      title: item.title || 'Ambiente da casa',
      description: item.description || 'Visualização ampliada'
    }, items.map((galleryItem) => ({
      src: galleryItem.src,
      alt: galleryItem.alt || galleryItem.title || 'Foto do ambiente da casa',
      title: galleryItem.title || 'Ambiente da casa',
      description: galleryItem.description || 'Visualização ampliada'
    })), index));
    publicGalleryGrid.appendChild(button);
  });
}

function bindLightboxEvents() {
  closeLightboxBtn?.addEventListener('click', closeLightbox);
  lightboxPrevBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    showLightboxPhoto(-1);
  });
  lightboxNextBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    showLightboxPhoto(1);
  });

  lightboxModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeLightbox === 'true') {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (lightboxModal?.classList.contains('hidden')) return;

    if (event.key === 'Escape') {
      closeLightbox();
      return;
    }

    if (event.key === 'ArrowLeft') {
      showLightboxPhoto(-1);
      return;
    }

    if (event.key === 'ArrowRight') {
      showLightboxPhoto(1);
    }
  });
}

function openLightbox(item, items = null, startIndex = 0) {
  if (!lightboxModal || !lightboxImage || !lightboxTitle || !lightboxDescription) return;

  lightboxItems = Array.isArray(items) && items.length ? items : [item];
  lightboxCurrentIndex = Math.max(0, Math.min(startIndex, lightboxItems.length - 1));
  updateLightboxContent(lightboxItems[lightboxCurrentIndex] || item);
  updateLightboxNav();

  lightboxModal.classList.remove('hidden');
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateLightboxContent(item) {
  if (!item || !lightboxImage || !lightboxTitle || !lightboxDescription) return;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt || item.title || 'Foto ampliada do ambiente';
  lightboxTitle.textContent = item.title || 'Ambiente da casa';
  lightboxDescription.textContent = item.description || 'Visualização ampliada';
}

function showLightboxPhoto(direction) {
  if (!lightboxItems.length || lightboxItems.length < 2) return;
  lightboxCurrentIndex = (lightboxCurrentIndex + direction + lightboxItems.length) % lightboxItems.length;
  updateLightboxContent(lightboxItems[lightboxCurrentIndex]);
}

function updateLightboxNav() {
  const hasNavigation = lightboxItems.length > 1;
  lightboxPrevBtn?.classList.toggle('hidden', !hasNavigation);
  lightboxNextBtn?.classList.toggle('hidden', !hasNavigation);
}

function closeLightbox() {
  if (!lightboxModal || !lightboxImage) return;
  lightboxModal.classList.add('hidden');
  lightboxModal.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxItems = [];
  lightboxCurrentIndex = -1;
  updateLightboxNav();
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



function normalizeModelPhotos(model) {
  const rawPhotos = Array.isArray(model.gallery)
    ? model.gallery
    : Array.isArray(model.fotos)
      ? model.fotos
      : Array.isArray(model.photos)
        ? model.photos
        : Array.isArray(model.images)
          ? model.images
          : [];

  return rawPhotos
    .map((photo, index) => {
      if (typeof photo === 'string') {
        return {
          src: photo,
          alt: `${model.name || model.nome || 'Modelo'} • Foto ${index + 1}`,
          title: `${model.name || model.nome || 'Modelo'} • Foto ${index + 1}`,
          description: 'Clique para ampliar'
        };
      }

      if (photo && typeof photo === 'object' && photo.src) {
        return photo;
      }

      return null;
    })
    .filter(Boolean);
}

function getModelDisplayName(model) {
  return model.name || model.nome || model.title || model.titulo || 'Modelo';
}

function getModelCover(model) {
  const photos = normalizeModelPhotos(model);
  return model.cover || model.capa || model.image || model.imagem || photos[0]?.src || '';
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
    button.setAttribute('aria-label', `Abrir galeria de ${getModelDisplayName(model)}`);

    const metaText = buildModelMetaText(model);
    const subtitle = metaText || model.tagline || 'Clique para ver a galeria individual.';
    const modelName = getModelDisplayName(model);
    const isAshleyCubana = String(model.id || '').toLowerCase().startsWith('ashleycubana');
    const modelNameClass = isAshleyCubana ? ' class="model-name-compact"' : '';

    button.innerHTML = `
      <div class="public-gallery-media gallery-watermark">
        <img class="public-gallery-image" src="${escapeHtml(getModelCover(model))}" alt="${escapeHtml(modelName)}" loading="lazy" draggable="false" />
        <div class="public-gallery-overlay model-card-center-overlay">
          <h3${modelNameClass}>${escapeHtml(modelName)}</h3>
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

  modelGalleryTitle.textContent = getModelDisplayName(model);
  modelGalleryMeta.innerHTML = buildModelMeta(model);
  modelGalleryDescription.textContent = model.description || 'Galeria individual da modelo.';
  modelGalleryGrid.innerHTML = '';

  const photos = normalizeModelPhotos(model);

  photos.forEach((photo, photoIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'public-gallery-card model-photo-card';
    button.dataset.photoIndex = String(photoIndex);
    button.innerHTML = `
      <div class="public-gallery-media gallery-watermark">
        <img class="public-gallery-image" src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || photo.title || getModelDisplayName(model) || 'Foto da modelo')}" loading="lazy" draggable="false" />
        <div class="public-gallery-overlay">
          <h3>${escapeHtml(photo.title || `${getModelDisplayName(model)} • Foto ${photoIndex + 1}`)}</h3>
          <p>${escapeHtml(photo.description || 'Clique para ampliar')}</p>
        </div>
      </div>
    `;

    const modelLightboxItems = photos.map((photoItem, indexItem) => ({
      src: photoItem.src,
      alt: photoItem.alt || photoItem.title || getModelDisplayName(model) || 'Foto da modelo',
      title: photoItem.title || `${getModelDisplayName(model)} • Foto ${indexItem + 1}`,
      description: photoItem.description || model.description || 'Visualização ampliada'
    }));

    button.addEventListener('click', () => openLightbox({
      src: photo.src,
      alt: photo.alt || photo.title || getModelDisplayName(model) || 'Foto da modelo',
      title: photo.title || `${getModelDisplayName(model)} • Foto ${photoIndex + 1}`,
      description: photo.description || model.description || 'Visualização ampliada'
    }, modelLightboxItems, photoIndex));

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



function bindCookieConsent() {
  acceptCookiesBtn?.addEventListener('click', () => saveCookieConsent('accepted'));
  necessaryCookiesBtn?.addEventListener('click', () => saveCookieConsent('necessary'));
  clearSiteDataBtn?.addEventListener('click', clearSitePreferenceData);

  showCookieConsentWhenAllowed();
}

function showCookieConsentWhenAllowed() {
  if (!cookieConsentBanner || hasCookieConsent()) return;

  if (isAgeGateVisible()) {
    cookieConsentBanner.classList.add('hidden');
    cookieConsentBanner.setAttribute('aria-hidden', 'true');
    return;
  }

  cookieConsentBanner.classList.remove('hidden');
  cookieConsentBanner.setAttribute('aria-hidden', 'false');
}

function hasCookieConsent() {
  return (
    safeStorageGet('localStorage', COOKIE_CONSENT_STORAGE_KEY) === 'accepted' ||
    safeStorageGet('localStorage', COOKIE_CONSENT_STORAGE_KEY) === 'necessary' ||
    getCookie(COOKIE_CONSENT_COOKIE_NAME) === 'accepted' ||
    getCookie(COOKIE_CONSENT_COOKIE_NAME) === 'necessary'
  );
}

function saveCookieConsent(consentType) {
  const value = consentType === 'accepted' ? 'accepted' : 'necessary';
  safeStorageSet('localStorage', COOKIE_CONSENT_STORAGE_KEY, value);
  setCookie(COOKIE_CONSENT_COOKIE_NAME, value, 180);
  cookieConsentBanner?.classList.add('hidden');
  cookieConsentBanner?.setAttribute('aria-hidden', 'true');
}

function clearSitePreferenceData() {
  [
    AGE_GATE_STORAGE_KEY,
    EVENT_POPUP_SESSION_KEY,
    COOKIE_CONSENT_STORAGE_KEY
  ].forEach((key) => {
    try { localStorage.removeItem(key); } catch (error) {}
    try { sessionStorage.removeItem(key); } catch (error) {}
  });

  [
    AGE_GATE_COOKIE_NAME,
    COOKIE_CONSENT_COOKIE_NAME
  ].forEach(expireCookie);

  if (window.caches?.keys) {
    window.caches.keys()
      .then((cacheNames) => Promise.all(cacheNames.map((cacheName) => window.caches.delete(cacheName))))
      .finally(() => window.location.reload());
    return;
  }

  window.location.reload();
}

function expireCookie(name) {
  try {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  } catch (error) {
    // segue sem cookie
  }
}

function bindAgeGate() {
  if (!ageGate || !ageConfirmBtn) return;

  if (isAgeVerified()) {
    unlockAgeGate();
    showCookieConsentWhenAllowed();
    showEventPopupAfterAgeConfirmation();
    return;
  }

  lockAgeGate();

  ageConfirmBtn.addEventListener('click', () => {
    persistAgeVerification();
    unlockAgeGate();
    showCookieConsentWhenAllowed();
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
