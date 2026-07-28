(function initAdminDashboard() {
  if (window.lucide) window.lucide.createIcons();
  const session = JSON.parse(localStorage.getItem(window.pxomxdBackend?.roleKey('admin') || 'pxomxd:admin') || 'null');
  if (!session || session.role !== 'admin') { window.location.href = '/login'; return; }

  const main = document.querySelector('main');
  if (!main) return;

  main.innerHTML = `
    <header class="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-center">
      <div class="relative max-w-[910px]"><i data-lucide="search" class="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" width="22" height="22"></i><input class="h-14 w-full rounded-full border border-zinc-200 bg-white px-14 text-lg outline-none placeholder:text-zinc-400" placeholder="Search your course...." /></div>
      <div class="flex items-center gap-4"><button class="grid h-14 w-14 place-items-center rounded-full border border-zinc-200 bg-[#f7f8fd]"><i data-lucide="mail" width="19" height="19"></i></button><button class="grid h-14 w-14 place-items-center rounded-full border border-zinc-200 bg-[#f7f8fd]"><i data-lucide="bell" width="19" height="19"></i></button><span class="h-14 w-px bg-zinc-300"></span><span class="grid h-11 w-11 place-items-center rounded-full bg-[#eee7ff] text-2xl">🤓</span><p id="sidebar-name" class="text-lg font-semibold">Jason Ranti</p></div>
    </header>
    <section class="grid gap-7 pt-8 xl:grid-cols-[minmax(0,1fr)_420px]">
      <div class="min-w-0 space-y-7 overflow-hidden">
        <div class="relative overflow-hidden rounded-[1.7rem] bg-[#6d5df6] px-7 py-8 text-white shadow-lg shadow-indigo-200/40 md:px-8 md:py-9">
          <div class="pointer-events-none absolute inset-0 opacity-25"><span class="absolute right-24 top-16 h-28 w-28 rounded-[18px] border border-white/20"></span><span class="absolute right-5 top-3 h-56 w-56 rounded-[18px] border border-white/20"></span><span class="absolute left-[54%] top-14 text-[10rem] leading-none text-white">✦</span><span class="absolute right-5 bottom-4 text-[5.5rem] leading-none text-white/60">✦</span></div>
          <p class="relative text-sm font-medium tracking-[.42em]">ONLINE COURSE</p>
          <h2 class="relative mt-5 max-w-3xl whitespace-pre-line text-[2.65rem] font-semibold leading-[1.05] tracking-[-.055em] md:text-[3.05rem]">Sharpen Your Skills with\nProfessional Online Courses</h2>
          <button id="seed-demo" class="relative mt-10 flex items-center gap-4 rounded-full bg-[#111] py-2 pl-7 pr-2 text-base font-semibold" type="button">Join Now <span class="grid h-10 w-10 place-items-center rounded-full bg-white text-black"><i data-lucide="arrow-right" width="18" height="18"></i></span></button>
        </div>
        <div class="grid gap-7 md:grid-cols-3">
          <article class="course-stat"><span>✣</span><div><p id="total-members">2/8 watched</p><h3>UI/UX Design</h3></div><b>⋮</b></article>
          <article class="course-stat pink"><span>▢</span><div><p id="free-members">3/8 watched</p><h3>Branding</h3></div><b>⋮</b></article>
          <article class="course-stat blue"><span>⊞</span><div><p id="total-links">6/12 watched</p><h3>Front End</h3></div><b>⋮</b></article>
        </div>
        <section class="space-y-5"><div class="flex items-center justify-between"><h2 class="text-[1.65rem] font-semibold tracking-[-.05em]">Continue Watching</h2><div class="flex gap-3"><button class="grid h-10 w-10 place-items-center rounded-full bg-white text-[#6d5df6]"><i data-lucide="chevron-left" width="21" height="21"></i></button><button class="grid h-10 w-10 place-items-center rounded-full bg-[#6d5df6] text-white"><i data-lucide="chevron-right" width="21" height="21"></i></button></div></div><div class="grid gap-7 lg:grid-cols-3" id="course-cards"></div></section>
        <section class="rounded-[1.7rem] bg-white px-6 pb-4 pt-3 shadow-sm"><div class="flex items-center justify-between py-3"><h2 class="text-[1.65rem] font-semibold tracking-[-.05em]">Your Lesson</h2><a class="font-semibold text-[#6d5df6] underline" href="#">See all</a></div><div class="overflow-x-auto"><table class="w-full min-w-[720px] text-left"><thead class="border-b text-sm font-medium uppercase text-zinc-400"><tr><th class="py-3 pl-12">Mentor</th><th>Type</th><th>Desc</th><th>Action</th></tr></thead><tbody id="member-rows"></tbody></table></div></section>
      </div>
      <aside class="space-y-7"><section class="rounded-[1.7rem] bg-white p-7 shadow-sm"><div class="flex justify-between"><h2 class="text-[1.65rem] font-semibold tracking-[-.05em]">Statistic</h2><i data-lucide="more-vertical" class="text-zinc-400"></i></div><div class="relative mx-auto mt-7 grid h-44 w-44 place-items-center rounded-full border-[10px] border-[#eee7ff]"><div class="absolute inset-[-10px] rotate-[-30deg] rounded-full border-[4px] border-[#6d5df6] border-b-transparent border-l-transparent"></div><span class="absolute right-[-18px] top-4 rounded-full bg-[#6d5df6] px-2 py-1 text-sm font-bold text-white">32%</span><span class="grid h-28 w-28 place-items-center rounded-full bg-[#e7dceb] text-6xl">🤓</span></div><h3 class="mt-5 text-center text-[1.55rem] font-semibold tracking-[-.05em]">Good Morning Jason 🔥</h3><p class="text-center text-zinc-400">Continue your learning to achieve your target!</p><div class="mt-8 rounded-[1.5rem] bg-[#f5f6fb] px-7 py-7"><div class="relative flex h-36 items-end justify-between border-y border-dashed border-zinc-300/70 py-1"><span class="bar" style="height:34%"></span><span class="bar active" style="height:64%"></span><span class="bar" style="height:34%"></span><span class="bar active" style="height:95%"></span><span class="bar" style="height:30%"></span></div><div class="mt-3 flex justify-between text-sm text-zinc-400"><span>1-10 Aug</span><span>11-20 Aug</span><span>21-30 Aug</span></div></div></section><section class="rounded-[1.7rem] bg-white p-7 shadow-sm"><div class="flex items-center justify-between"><h2 class="text-[1.55rem] font-semibold tracking-[-.05em]">Your mentor</h2><button class="grid h-10 w-10 place-items-center rounded-full border text-[#6d5df6]"><i data-lucide="plus" width="20" height="20"></i></button></div><div class="mt-5 rounded-[1.5rem] bg-[#f5f6fb] px-6 py-5" id="mentor-list"></div></section></aside>
      <form id="admin-edit" class="sr-only"><input name="selected"><input name="username"><input name="email"><select name="plan"><option>ฟรี</option></select><input name="displayName"><textarea name="bio"></textarea></form>
    </section>`;

  const style = document.createElement('style');
  style.textContent = `.course-stat{display:flex;align-items:center;gap:1rem;border-radius:1.45rem;background:#fff;padding:.75rem 1rem;box-shadow:0 1px 2px #0000000d}.course-stat span{display:grid;height:4rem;width:4rem;place-items:center;border-radius:9999px;background:#ebe7ff;color:#6d5df6;font-size:1.5rem}.course-stat.pink span{background:#ffe7fb;color:#e652d0}.course-stat.blue span{background:#e5f6ff;color:#45b6e8}.course-stat p{color:#a1a1aa}.course-stat h3{font-size:1.25rem;font-weight:600;letter-spacing:-.06em}.course-stat b{margin-left:auto;color:#a1a1aa;font-size:1.5rem}.bar{width:3rem;border-radius:.5rem;background:#cbc5ff}.bar.active{background:#6d5df6}`;
  document.head.appendChild(style);

  const form = document.querySelector('#admin-edit');
  let accounts = [];
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const countLinks = (account) => [account.profile?.website, account.profile?.discord].filter(Boolean).length;
  const fillForm = (account, index) => { if (!form || !account) return; form.elements.selected.value = index; form.elements.username.value = account.username || ''; form.elements.email.value = account.email || ''; form.elements.plan.value = account.plan || 'ฟรี'; form.elements.displayName.value = account.profile?.displayName || account.username || ''; form.elements.bio.value = account.profile?.bio || ''; };
  const render = async () => {
    accounts = await window.pxomxdBackend.listAccounts('user');
    document.querySelector('#total-members').textContent = `${accounts.length || 2}/8 watched`;
    document.querySelector('#free-members').textContent = `${accounts.filter((item) => (item.plan || 'ฟรี') === 'ฟรี').length || 3}/8 watched`;
    document.querySelector('#total-links').textContent = `${accounts.reduce((sum, item) => sum + countLinks(item), 0) || 6}/12 watched`;
    const courses = [
      ['FRONT END', 'Beginner’s Guide to Becoming a Professional Front-End Developer', 'Leonardo samsul', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', 'bg-[#e8f7ff] text-[#46b7eb]', 46],
      ['UI/UX DESIGN', 'Optimizing User Experience with the Best UI/UX Design', 'Bayu Salto', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80', 'bg-[#efe8ff] text-[#6d5df6]', 54],
      ['BRANDING', 'Reviving and Refresh Company Image', 'Padhang Satrio', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'bg-[#ffe7fb] text-[#e652d0]', 42],
    ];
    document.querySelector('#course-cards').innerHTML = courses.map((course, index) => `<article class="rounded-[1.7rem] bg-white p-5 shadow-sm"><div class="relative h-40 overflow-hidden rounded-[1.35rem]"><img src="${course[3]}" alt="" class="h-full w-full object-cover"><button class="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/35 text-white backdrop-blur"><i data-lucide="heart" width="20" height="20"></i></button></div><p class="mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${course[4]}">${course[0]}</p><h3 class="mt-3 min-h-[4.5rem] text-[1.15rem] font-semibold leading-tight tracking-[-.04em]">${course[1]}</h3><div class="mt-5 h-1 rounded-full bg-zinc-100"><div class="h-full rounded-full bg-[#6d5df6]" style="width:${course[5]}%"></div></div><div class="mt-5 flex items-center gap-3"><span class="grid h-11 w-11 place-items-center rounded-full bg-[#eee7ff] text-2xl">${['🧑🏻‍🏫','👨🏻‍🍳','👨🏻‍💼'][index]}</span><div><p class="font-semibold">${course[2]}</p><p class="text-sm text-zinc-400">Mentor</p></div></div></article>`).join('');
    const lessonAccounts = accounts.length ? accounts.slice(0, 3) : [{ username: 'Padhang Satrio', profile: { displayName: 'Padhang Satrio' }, plan: 'UI/UX DESIGN' }];
    document.querySelector('#member-rows').innerHTML = lessonAccounts.map((account, index) => `<tr class="border-b border-dashed"><td class="py-4"><div class="flex items-center gap-3"><span class="grid h-11 w-11 place-items-center rounded-full bg-[#ffe6a6] text-2xl">👨🏻‍🍳</span><div><p class="font-semibold">${escapeHtml(account.profile?.displayName || account.username || 'Padhang Satrio')}</p><p class="text-zinc-400">2/16/2004</p></div></div></td><td><span class="rounded-full bg-[#eee7ff] px-3 py-1 text-sm font-bold text-[#6d5df6]">${escapeHtml(account.plan || 'UI/UX DESIGN')}</span></td><td class="text-lg font-medium">Understand Of UI/UX Design</td><td><button class="grid h-9 w-9 place-items-center rounded-full border border-[#ddd7ff] text-[#6d5df6]" data-edit="${index}" type="button">↗</button></td></tr>`).join('');
    document.querySelector('#mentor-list').innerHTML = ['Padhang Satrio', 'Zakir Horizontal', 'Leonardo Samsul'].map((name, index) => `<div class="flex items-center gap-4 border-b border-dashed py-4 first:pt-0 last:border-0"><span class="grid h-11 w-11 place-items-center rounded-full ${index === 0 ? 'bg-[#ffe6a6]' : index === 1 ? 'bg-[#e8cbd9]' : 'bg-[#d9c5a8]'} text-2xl">${['👨🏻‍🍳','🧔🏻','🤓'][index]}</span><div class="mr-auto"><p class="font-semibold">${name}</p><p class="text-sm text-zinc-400">Mentor</p></div><button class="rounded-full border border-[#ddd7ff] px-4 py-2 text-sm font-semibold text-[#6d5df6]">Follow</button></div>`).join('') + '<button class="mt-3 w-full rounded-full bg-[#eee7ff] py-4 font-semibold text-[#6d5df6]">See All</button>';
    if (accounts[0]) fillForm(accounts[0], 0);
    if (window.lucide) window.lucide.createIcons();
  };
  document.addEventListener('click', async (event) => {
    const editButton = event.target.closest('[data-edit]');
    if (editButton) fillForm(accounts[Number(editButton.dataset.edit)], Number(editButton.dataset.edit));
  });
  document.querySelector('#seed-demo').addEventListener('click', async () => { await window.pxomxdBackend.saveAccount({ id: 'user:pxom@example.com', role: 'user', username: 'pxom', email: 'pxom@example.com', plan: 'UI/UX DESIGN', createdAt: new Date().toISOString(), profile: { displayName: 'Padhang Satrio', bio: 'สมาชิกตัวอย่าง PXOMXD', website: 'https://pxomxd.info/pxom', discord: 'https://discord.gg/sayabot' } }); await render(); });
  render();
}());
