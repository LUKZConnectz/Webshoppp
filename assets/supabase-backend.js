(function initPxomxdBackend() {
  const storageKeys = { accounts: 'pxomxd:accounts', userSession: 'pxomxd:user', adminSession: 'pxomxd:admin' };
  const config = window.PXOMXD_SUPABASE || {
    url: window.SUPABASE_URL || '',
    anonKey: window.SUPABASE_ANON_KEY || '',
    table: 'profiles',
  };
  const hasSupabase = Boolean(config.url && config.anonKey && window.supabase?.createClient);
  const client = hasSupabase ? window.supabase.createClient(config.url, config.anonKey) : null;
  const table = config.table || 'profiles';
  const normalizeRole = (role) => (role === 'admin' ? 'admin' : 'user');
  const roleKey = (role) => (normalizeRole(role) === 'admin' ? storageKeys.adminSession : storageKeys.userSession);
  const localAccounts = () => JSON.parse(localStorage.getItem(storageKeys.accounts) || '[]').map((account) => ({ id: account.id || `${normalizeRole(account.role)}:${account.username || account.email}`, role: normalizeRole(account.role), plan: account.plan || 'ฟรี', profile: account.profile || {}, ...account }));
  const saveLocalAccounts = (accounts) => localStorage.setItem(storageKeys.accounts, JSON.stringify(accounts));
  const publicAccount = (account) => ({ ...account, password: undefined });
  async function listAccounts(role) {
    if (client) {
      let query = client.from(table).select('*').order('created_at', { ascending: false });
      if (role) query = query.eq('role', normalizeRole(role));
      const { data, error } = await query;
      if (!error) return data.map((item) => ({ id: item.id, username: item.username, email: item.email, role: normalizeRole(item.role), plan: item.plan || 'ฟรี', createdAt: item.created_at, profile: item.profile || {} }));
      console.warn('Supabase listAccounts failed, falling back to localStorage:', error.message);
    }
    return localAccounts().filter((account) => !role || normalizeRole(account.role) === normalizeRole(role));
  }
  async function register({ username, email, password, role = 'user' }) {
    const normalized = { username: username.trim().toLowerCase(), email: email.trim().toLowerCase(), password, role: normalizeRole(role) };
    const id = `${normalized.role}:${normalized.email || normalized.username}`;
    if (client) {
      const { data, error } = await client.from(table).insert({ id, username: normalized.username, email: normalized.email, role: normalized.role, plan: 'ฟรี', profile: {}, created_at: new Date().toISOString() }).select('*').single();
      if (!error) return publicAccount({ ...data, createdAt: data.created_at, profile: data.profile || {} });
      console.warn('Supabase register failed, falling back to localStorage:', error.message);
    }
    const accounts = localAccounts();
    if (accounts.some((account) => normalizeRole(account.role) === normalized.role && (account.username.toLowerCase() === normalized.username || account.email.toLowerCase() === normalized.email))) throw new Error('ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้แล้วในประเภทบัญชีนี้');
    const account = { ...normalized, id, plan: 'ฟรี', createdAt: new Date().toISOString(), profile: {} };
    saveLocalAccounts([...accounts, account]);
    return publicAccount(account);
  }
  async function login({ login, password, role = 'user' }) {
    const normalizedLogin = login.trim().toLowerCase();
    const normalizedRole = normalizeRole(role);
    const accounts = await listAccounts(normalizedRole);
    const account = accounts.find((item) => (item.username?.toLowerCase() === normalizedLogin || item.email?.toLowerCase() === normalizedLogin) && (!item.password || item.password === password));
    if (!account) throw new Error('ชื่อผู้ใช้ อีเมล หรือรหัสผ่านไม่ถูกต้อง');
    const session = { id: account.id || `${normalizedRole}:${account.email || account.username}`, username: account.username, email: account.email, role: normalizedRole };
    localStorage.setItem(roleKey(normalizedRole), JSON.stringify(session));
    if (normalizedRole === 'user') localStorage.setItem(storageKeys.userSession, JSON.stringify(session));
    return session;
  }
  async function saveAccount(updated) {
    if (client) {
      const payload = { username: updated.username, email: updated.email, role: normalizeRole(updated.role), plan: updated.plan || 'ฟรี', profile: updated.profile || {} };
      const { data, error } = await client.from(table).upsert({ id: updated.id || `${payload.role}:${payload.email || payload.username}`, ...payload }).select('*').single();
      if (!error) return { ...data, createdAt: data.created_at, profile: data.profile || {} };
      console.warn('Supabase saveAccount failed, falling back to localStorage:', error.message);
    }
    const accounts = localAccounts();
    const key = updated.id || `${normalizeRole(updated.role)}:${updated.email || updated.username}`;
    const index = accounts.findIndex((account) => (account.id || `${normalizeRole(account.role)}:${account.email || account.username}`) === key);
    const next = { ...(accounts[index] || { createdAt: new Date().toISOString() }), ...updated, id: key, role: normalizeRole(updated.role) };
    if (index >= 0) accounts[index] = next; else accounts.push(next);
    saveLocalAccounts(accounts);
    return publicAccount(next);
  }
  window.pxomxdBackend = { listAccounts, register, login, saveAccount, roleKey, isSupabaseEnabled: hasSupabase };
}());
