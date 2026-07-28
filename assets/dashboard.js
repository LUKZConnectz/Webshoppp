(function initMemberDashboard() {
  if (window.lucide) window.lucide.createIcons();
  const session = JSON.parse(localStorage.getItem(window.pxomxdBackend?.roleKey('user') || 'pxomxd:user') || 'null');
  if (!session || session.role === 'admin') { window.location.href = '/login'; return; }
  const form = document.querySelector('#profile-settings');
  const countLinks = (profile) => [profile.website, profile.discord].filter(Boolean).length;
  const setAccount = (account) => {
    const profile = account.profile || {};
    const values = { username: account.username, email: account.email, displayName: profile.displayName || account.username, bio: profile.bio || '', website: profile.website || '', discord: profile.discord || '' };
    Object.entries(values).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value || ''; });
    document.querySelector('#sidebar-name').textContent = values.displayName || values.username;
    document.querySelector('#profile-slug').textContent = values.username;
    document.querySelector('#links-count').textContent = countLinks(values);
  };
  let currentAccount = { id: session.id, username: session.username || 'member', email: session.email || '', role: 'user', profile: {} };
  window.pxomxdBackend.listAccounts('user').then((accounts) => {
    currentAccount = accounts.find((account) => account.id === session.id || account.username === session.username || account.email === session.email) || currentAccount;
    setAccount(currentAccount);
  });
  document.querySelector('#logout').addEventListener('click', () => { localStorage.removeItem('pxomxd:user'); window.location.href = '/login'; });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const updated = { ...currentAccount, role: 'user', username: data.username.trim().toLowerCase(), email: data.email.trim().toLowerCase(), profile: { ...(currentAccount.profile || {}), displayName: data.displayName.trim(), bio: data.bio.trim(), website: data.website.trim(), discord: data.discord.trim() } };
    currentAccount = await window.pxomxdBackend.saveAccount(updated);
    localStorage.setItem('pxomxd:user', JSON.stringify({ id: currentAccount.id, username: currentAccount.username, email: currentAccount.email, role: 'user' }));
    setAccount(currentAccount);
    window.appAlert({ type: 'success', title: 'บันทึกสำเร็จ', message: 'อัปเดตข้อมูลส่วนตัวของสมาชิกเรียบร้อยแล้ว' });
    if (window.lucide) window.lucide.createIcons();
  });
}());
