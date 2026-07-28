(function initMemberDashboard() {
  if (window.lucide) window.lucide.createIcons();
  const session = JSON.parse(localStorage.getItem(window.pxomxdBackend?.roleKey('user') || 'pxomxd:user') || 'null');
  if (!session || session.role === 'admin') { window.location.href = '/login'; return; }
  const form = document.querySelector('#profile-settings');
  const backgroundInput = document.querySelector('#background-upload');
  const backgroundPreview = document.querySelector('#background-preview');
  const removeBackground = document.querySelector('#remove-background');
  const countLinks = (profile) => [profile.website, profile.discord].filter(Boolean).length;
  const setBackgroundPreview = (src) => {
    backgroundPreview.classList.toggle('hidden', !src);
    removeBackground.classList.toggle('hidden', !src);
    backgroundPreview.style.backgroundImage = src ? `url("${src}")` : '';
  };
  const setAccount = (account) => {
    const profile = account.profile || {};
    const values = { username: account.username, email: account.email, displayName: profile.displayName || account.username, bio: profile.bio || '', website: profile.website || '', discord: profile.discord || '', backgroundImage: profile.backgroundImage || '' };
    Object.entries(values).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value || ''; });
    document.querySelector('#sidebar-name').textContent = values.displayName || values.username;
    document.querySelector('#profile-slug').textContent = values.username;
    document.querySelector('#links-count').textContent = countLinks(values);
    setBackgroundPreview(values.backgroundImage);
  };
  let currentAccount = { id: session.id, username: session.username || 'member', email: session.email || '', role: 'user', profile: {} };
  window.pxomxdBackend.listAccounts('user').then((accounts) => {
    currentAccount = accounts.find((account) => account.id === session.id || account.username === session.username || account.email === session.email) || currentAccount;
    setAccount(currentAccount);
  });
  document.querySelector('#logout').addEventListener('click', () => { localStorage.removeItem('pxomxd:user'); window.location.href = '/login'; });
  backgroundInput.addEventListener('change', () => {
    const file = backgroundInput.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { window.appAlert({ type: 'error', title: 'ไฟล์ไม่ถูกต้อง', message: 'กรุณาเลือกรูปภาพเท่านั้น' }); backgroundInput.value = ''; return; }
    const reader = new FileReader();
    reader.addEventListener('load', () => { currentAccount.profile = { ...(currentAccount.profile || {}), backgroundImage: reader.result }; setBackgroundPreview(reader.result); });
    reader.readAsDataURL(file);
  });
  removeBackground.addEventListener('click', () => { currentAccount.profile = { ...(currentAccount.profile || {}), backgroundImage: '' }; backgroundInput.value = ''; setBackgroundPreview(''); });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const updated = { ...currentAccount, role: 'user', username: data.username.trim().toLowerCase(), email: data.email.trim().toLowerCase(), profile: { ...(currentAccount.profile || {}), displayName: data.displayName.trim(), bio: data.bio.trim(), website: data.website.trim(), discord: data.discord.trim(), backgroundImage: currentAccount.profile?.backgroundImage || '' } };
    currentAccount = await window.pxomxdBackend.saveAccount(updated);
    localStorage.setItem('pxomxd:user', JSON.stringify({ id: currentAccount.id, username: currentAccount.username, email: currentAccount.email, role: 'user' }));
    setAccount(currentAccount);
    window.appAlert({ type: 'success', title: 'บันทึกสำเร็จ', message: 'อัปเดตข้อมูลส่วนตัวของสมาชิกเรียบร้อยแล้ว' });
    if (window.lucide) window.lucide.createIcons();
  });
}());
