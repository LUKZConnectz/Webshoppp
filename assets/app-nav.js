(function initPxomxdMobileNav() {
  const navs = document.querySelectorAll('nav');

  navs.forEach((nav, index) => {
    const bar = nav.querySelector(':scope > div');
    const desktopLinks = nav.querySelector('.hidden.lg\\:flex.items-center.gap-6');
    const desktopActions = nav.querySelector('[data-auth-actions]');
    if (!bar || !desktopLinks || nav.querySelector('[data-mobile-menu]')) return;

    const menuId = `mobile-menu-${index + 1}`;
    let toggle = nav.querySelector('button[aria-label="Toggle Menu"]');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'lg:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors';
      toggle.setAttribute('aria-label', 'Toggle Menu');
      toggle.type = 'button';
      toggle.innerHTML = '<span class="block h-0.5 w-6 bg-current mb-1.5"></span><span class="block h-0.5 w-6 bg-current mb-1.5"></span><span class="block h-0.5 w-6 bg-current"></span>';
      bar.appendChild(toggle);
    }

    toggle.type = 'button';
    toggle.setAttribute('aria-controls', menuId);
    toggle.setAttribute('aria-expanded', 'false');

    const menu = document.createElement('div');
    menu.id = menuId;
    menu.className = 'hidden lg:hidden mt-3 rounded-[1.5rem] border border-white/60 bg-white/95 backdrop-blur-xl p-3 shadow-xl';
    menu.setAttribute('data-mobile-menu', '');

    const linkList = document.createElement('div');
    linkList.className = 'grid gap-1';
    desktopLinks.querySelectorAll('a').forEach((link) => {
      const item = link.cloneNode(true);
      item.className = 'block rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 transition-colors';
      linkList.appendChild(item);
    });
    menu.appendChild(linkList);

    if (desktopActions) {
      const actionList = document.createElement('div');
      actionList.className = 'mt-3 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-3';
      desktopActions.querySelectorAll('a').forEach((link) => {
        const item = link.cloneNode(true);
        item.className = link.className.includes('bg-zinc-900')
          ? 'flex items-center justify-center rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-bold text-white hover:bg-black transition-colors'
          : 'flex items-center justify-center rounded-2xl bg-zinc-100 px-4 py-3 text-sm font-bold text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950 transition-colors';
        actionList.appendChild(item);
      });
      menu.appendChild(actionList);
    }

    nav.appendChild(menu);

    const closeMenu = () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const willOpen = menu.classList.contains('hidden');
      menu.classList.toggle('hidden', !willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  });
}());
