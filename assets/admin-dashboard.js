(function initAdminDashboard() {
  if (window.lucide) window.lucide.createIcons();
  const session = JSON.parse(localStorage.getItem(window.pxomxdBackend?.roleKey('admin') || 'pxomxd:admin') || 'null');
  if (!session || session.role !== 'admin') { window.location.href = '/login'; return; }
  const rows = document.querySelector('#member-rows');
  const form = document.querySelector('#admin-edit');
  let accounts = [];
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const countLinks = (account) => [account.profile?.website, account.profile?.discord].filter(Boolean).length;
  const fillForm = (account, index) => {
    form.elements.selected.value = index;
    form.elements.username.value = account.username || '';
    form.elements.email.value = account.email || '';
    form.elements.plan.value = account.plan || 'ฟรี';
    form.elements.displayName.value = account.profile?.displayName || account.username || '';
    form.elements.bio.value = account.profile?.bio || '';
  };
  const render = async () => {
    accounts = await window.pxomxdBackend.listAccounts('user');
    document.querySelector('#total-members').textContent = accounts.length;
    document.querySelector('#free-members').textContent = accounts.filter((item) => (item.plan || 'ฟรี') === 'ฟรี').length;
    document.querySelector('#total-links').textContent = accounts.reduce((sum, item) => sum + countLinks(item), 0);
    rows.innerHTML = accounts.map((account, index) => `<tr class="hover:bg-indigo-50/40"><td class="p-4"><div class="flex items-center gap-3"><span class="grid h-11 w-11 place-items-center rounded-full bg-sky-50 text-lg">👤</span><div><p class="font-black">${escapeHtml(account.profile?.displayName || account.username || '-')}</p><p class="text-xs text-zinc-400">User ID: ${escapeHtml(account.id || '-')}</p></div></div></td><td class="p-4 text-zinc-500">${escapeHtml(account.email || '-')}</td><td class="p-4"><span class="rounded-full bg-zinc-100 px-3 py-1 text-sm font-bold">${escapeHtml(account.plan || 'ฟรี')}</span></td><td class="p-4 text-zinc-400">${account.createdAt ? new Date(account.createdAt).toLocaleDateString('th-TH') : '-'}</td><td class="p-4 text-right"><button class="rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold text-white" data-edit="${index}" type="button">แก้ไข</button></td></tr>`).join('') || '<tr><td class="p-8 text-center text-zinc-400" colspan="5">ยังไม่มีสมาชิกในระบบ</td></tr>';
    if (accounts[0]) fillForm(accounts[0], 0);
  };
  rows.addEventListener('click', (event) => { const button = event.target.closest('[data-edit]'); if (button) fillForm(accounts[Number(button.dataset.edit)], Number(button.dataset.edit)); });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const index = Number(form.elements.selected.value || 0);
    const account = accounts[index] || { role: 'user', createdAt: new Date().toISOString() };
    await window.pxomxdBackend.saveAccount({ ...account, role: 'user', username: form.elements.username.value.trim().toLowerCase(), email: form.elements.email.value.trim().toLowerCase(), plan: form.elements.plan.value, profile: { ...(account.profile || {}), displayName: form.elements.displayName.value.trim(), bio: form.elements.bio.value.trim() } });
    await render();
    window.appAlert({ type: 'success', title: 'บันทึกสำเร็จ', message: 'แก้ไขข้อมูลสมาชิกเรียบร้อยแล้ว' });
  });
  document.querySelector('#seed-demo').addEventListener('click', async () => { await window.pxomxdBackend.saveAccount({ id: 'user:pxom@example.com', role: 'user', username: 'pxom', email: 'pxom@example.com', plan: 'ฟรี', createdAt: new Date().toISOString(), profile: { displayName: 'pxom', bio: 'สมาชิกตัวอย่าง PXOMXD', website: 'https://pxomxd.info/pxom', discord: 'https://discord.gg/sayabot' } }); await render(); });
  render();
}());
