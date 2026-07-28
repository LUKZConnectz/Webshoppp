(function initMemberDashboard() {
  if (window.lucide) window.lucide.createIcons();
  const session = JSON.parse(localStorage.getItem('pxomxd:user') || 'null');
  if (!session) { window.location.href = '/login'; return; }
  const accounts = JSON.parse(localStorage.getItem('pxomxd:accounts') || '[]');
  const index = accounts.findIndex((account) => account.username === session.username || account.email === session.email);
  const account = accounts[index] || { username: session.username || 'member', email: session.email || '', profile: {} };
  const profile = account.profile || {};
  const form = document.querySelector('#profile-settings');
  const values = { username: account.username, email: account.email, displayName: profile.displayName || account.username, bio: profile.bio || '', website: profile.website || '', discord: profile.discord || '' };
  Object.entries(values).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
  document.querySelector('#sidebar-name').textContent = values.displayName || values.username;
  document.querySelector('#profile-slug').textContent = values.username;
  document.querySelector('#links-count').textContent = [values.website, values.discord].filter(Boolean).length;
  document.querySelector('#logout').addEventListener('click', () => { localStorage.removeItem('pxomxd:user'); window.location.href = '/login'; });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const updated = { ...account, username: data.username.trim().toLowerCase(), email: data.email.trim().toLowerCase(), profile: { displayName: data.displayName.trim(), bio: data.bio.trim(), website: data.website.trim(), discord: data.discord.trim() } };
    if (index >= 0) accounts[index] = updated; else accounts.push(updated);
    localStorage.setItem('pxomxd:accounts', JSON.stringify(accounts));
    localStorage.setItem('pxomxd:user', JSON.stringify({ username: updated.username, email: updated.email }));
    document.querySelector('#sidebar-name').textContent = updated.profile.displayName || updated.username;
    document.querySelector('#profile-slug').textContent = updated.username;
    document.querySelector('#links-count').textContent = [updated.profile.website, updated.profile.discord].filter(Boolean).length;
    window.appAlert({ type: 'success', title: 'บันทึกสำเร็จ', message: 'อัปเดตข้อมูลส่วนตัวของสมาชิกเรียบร้อยแล้ว' });
    if (window.lucide) window.lucide.createIcons();
  });
}());
