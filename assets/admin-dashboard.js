(function initAdminDashboard() {
  const rows = document.querySelector('#member-rows');
  const form = document.querySelector('#admin-edit');
  const getAccounts = () => JSON.parse(localStorage.getItem('pxomxd:accounts') || '[]');
  const saveAccounts = (accounts) => localStorage.setItem('pxomxd:accounts', JSON.stringify(accounts));
  const countLinks = (account) => [account.profile?.website, account.profile?.discord].filter(Boolean).length;
  const fillForm = (account, index) => {
    form.elements.selected.value = index;
    form.elements.username.value = account.username || '';
    form.elements.email.value = account.email || '';
    form.elements.plan.value = account.plan || 'ฟรี';
    form.elements.displayName.value = account.profile?.displayName || account.username || '';
    form.elements.bio.value = account.profile?.bio || '';
  };
  const render = () => {
    const accounts = getAccounts();
    document.querySelector('#total-members').textContent = accounts.length;
    document.querySelector('#free-members').textContent = accounts.filter((item) => (item.plan || 'ฟรี') === 'ฟรี').length;
    document.querySelector('#total-links').textContent = accounts.reduce((sum, item) => sum + countLinks(item), 0);
    rows.innerHTML = accounts.map((account, index) => `<tr class="hover:bg-indigo-50/40"><td class="p-4"><div class="flex items-center gap-3"><span class="grid h-11 w-11 place-items-center rounded-full bg-indigo-50 text-lg">🧑</span><div><p class="font-black">${account.profile?.displayName || account.username}</p><p class="text-xs text-zinc-400">@${account.username}</p></div></div></td><td class="p-4 text-zinc-500">${account.email || '-'}</td><td class="p-4"><span class="rounded-full bg-zinc-100 px-3 py-1 text-sm font-bold">${account.plan || 'ฟรี'}</span></td><td class="p-4 text-zinc-400">${account.createdAt ? new Date(account.createdAt).toLocaleDateString('th-TH') : '-'}</td><td class="p-4 text-right"><button class="rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold text-white" data-edit="${index}" type="button">แก้ไข</button></td></tr>`).join('') || '<tr><td class="p-8 text-center text-zinc-400" colspan="5">ยังไม่มีสมาชิกในระบบ</td></tr>';
    if (accounts[0]) fillForm(accounts[0], 0);
  };
  rows.addEventListener('click', (event) => {
    const button = event.target.closest('[data-edit]');
    if (!button) return;
    fillForm(getAccounts()[Number(button.dataset.edit)], Number(button.dataset.edit));
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const accounts = getAccounts();
    const index = Number(form.elements.selected.value || 0);
    const account = accounts[index] || { createdAt: new Date().toISOString(), password: 'password' };
    accounts[index] = { ...account, username: form.elements.username.value.trim().toLowerCase(), email: form.elements.email.value.trim().toLowerCase(), plan: form.elements.plan.value, profile: { ...(account.profile || {}), displayName: form.elements.displayName.value.trim(), bio: form.elements.bio.value.trim() } };
    saveAccounts(accounts);
    render();
    window.appAlert({ type: 'success', title: 'บันทึกสำเร็จ', message: 'แก้ไขข้อมูลสมาชิกเรียบร้อยแล้ว' });
  });
  document.querySelector('#seed-demo').addEventListener('click', () => {
    const accounts = getAccounts();
    if (!accounts.some((item) => item.username === 'pxom')) accounts.push({ username: 'pxom', email: 'pxom@example.com', password: 'password', plan: 'ฟรี', createdAt: new Date().toISOString(), profile: { displayName: 'pxom', bio: 'สมาชิกตัวอย่าง PXOMXD', website: 'https://pxomxd.info/pxom', discord: 'https://discord.gg/sayabot' } });
    saveAccounts(accounts);
    render();
  });
  render();
}());
