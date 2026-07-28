(function createAppAlert() {
  const icons = {
    success: '<svg data-lucide="circle-check" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>',
    error: '<svg data-lucide="circle-x" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>',
    info: '<svg data-lucide="info" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>',
    warning: '<svg data-lucide="triangle-alert" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>',
  };

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[char]));

  const getContainer = () => {
    let container = document.querySelector('[data-app-alert-container]');
    if (!container) {
      container = document.createElement('div');
      container.className = 'app-alert-container';
      container.setAttribute('data-app-alert-container', '');
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
    return container;
  };

  window.appAlert = ({ type = 'info', title = 'แจ้งเตือน', message = '', duration = 3500 } = {}) => {
    const variant = icons[type] ? type : 'info';
    const alert = document.createElement('div');
    alert.className = `app-alert app-alert-${variant}`;
    alert.setAttribute('role', variant === 'error' ? 'alert' : 'status');
    alert.innerHTML = `<span class="alert-icon" aria-hidden="true">${icons[variant]}</span><span class="alert-copy"><strong>${escapeHtml(title)}</strong>${message ? `<small>${escapeHtml(message)}</small>` : ''}</span><button class="alert-close" type="button" aria-label="ปิดแจ้งเตือน"><svg data-lucide="x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>`;

    const close = () => {
      if (alert.classList.contains('is-leaving')) return;
      alert.classList.add('is-leaving');
      window.setTimeout(() => alert.remove(), 180);
    };

    alert.querySelector('.alert-close').addEventListener('click', close);
    getContainer().appendChild(alert);
    if (duration > 0) window.setTimeout(close, duration);
    return close;
  };
}());
