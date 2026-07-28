'use client';

import Script from 'next/script';
import { BarChart3, BadgeCheck, Blocks, Eye, Link, LogOut, Music2, Palette, Settings, Shield, UserRound, Users, WalletCards } from 'lucide-react';
import type { ReactNode } from 'react';

type NavItem = { label: string; href: string; icon: ReactNode; active?: boolean };

export function DashboardShell({ title, eyebrow, role, children, actions }: { title: string; eyebrow: string; role: 'member' | 'admin'; children: ReactNode; actions?: ReactNode }) {
  const memberNav: NavItem[] = [
    { label: 'ภาพรวม', href: '/dashboard', icon: <BarChart3 size={20} />, active: true },
    { label: 'โปรไฟล์', href: '#profile-settings', icon: <UserRound size={20} /> },
    { label: 'รูปลักษณ์', href: '#appearance', icon: <Palette size={20} /> },
    { label: 'ลิงก์', href: '#links', icon: <Link size={20} /> },
    { label: 'เหรียญตรา', href: '#badges', icon: <BadgeCheck size={20} /> },
    { label: 'วิดเจ็ต', href: '#widgets', icon: <Blocks size={20} /> },
    { label: 'เพลง', href: '#songs', icon: <Music2 size={20} /> },
    { label: 'ตั้งค่า', href: '#security', icon: <Settings size={20} /> },
  ];
  const adminNav: NavItem[] = [
    { label: 'สมาชิก', href: '/admin', icon: <Shield size={20} />, active: true },
    { label: 'ดูโปรไฟล์', href: '/profile', icon: <Eye size={20} /> },
  ];
  const nav = role === 'admin' ? adminNav : memberNav;

  return (
    <div className="dashboard-bg min-h-screen lg:grid lg:grid-cols-[292px_1fr]">
      <aside className="fixed inset-x-0 top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-2xl lg:sticky lg:inset-y-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col gap-6 p-5 lg:p-7">
          <a href="/" className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-950"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-400 text-white shadow-xl shadow-indigo-200">P</span>PXOMXD</a>
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            <p className="hidden px-4 text-xs font-black uppercase tracking-[.22em] text-slate-400 lg:block">{role === 'admin' ? 'Admin' : 'Dashboard'}</p>
            {nav.map((item) => <a key={item.label} className={`nav-pill flex min-w-max items-center gap-3 rounded-3xl px-4 py-3 text-sm font-bold ${item.active ? 'bg-slate-950 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:bg-white hover:text-indigo-600'}`} href={item.href}>{item.icon}{item.label}</a>)}
          </nav>
          <div className="mt-auto hidden rounded-[1.75rem] border border-white/80 bg-white/75 p-3 shadow-sm lg:flex lg:items-center lg:gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-xl">{role === 'admin' ? '🛡️' : '🧑‍💻'}</div>
            <div className="min-w-0"><p id="sidebar-name" className="truncate font-black">{role === 'admin' ? 'Admin' : 'member'}</p><p className="text-xs font-bold text-slate-400">{role === 'admin' ? 'จัดการสมาชิก' : 'แพ็กเกจฟรี'}</p></div>
            {role === 'member' && <button id="logout" className="ml-auto rounded-2xl p-2 text-slate-400 hover:bg-slate-100" aria-label="ออกจากระบบ"><LogOut size={20} /></button>}
          </div>
        </div>
      </aside>
      <main className="px-5 pb-12 pt-32 lg:px-10 lg:pt-10 xl:px-14">
        <header className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between"><div><p className="text-sm font-black uppercase tracking-[.24em] text-indigo-500">{eyebrow}</p><h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{title}</h1></div>{actions}</header>
        {children}
      </main>
      <Script src="/assets/app-alert.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" strategy="afterInteractive" />
      <Script src="/assets/supabase-backend.js" strategy="afterInteractive" />
      <Script src={role === 'admin' ? '/assets/admin-dashboard.js' : '/assets/dashboard.js'} strategy="afterInteractive" />
    </div>
  );
}

export function StatCard({ label, value, icon, valueId }: { label: string; value: string; icon: ReactNode; valueId?: string }) {
  return <article className="stat-card glass-card rounded-[2rem] p-6"><div className="flex items-center justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">{icon}</span><span className="rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-600">LIVE</span></div><p id={valueId} className="mt-8 text-4xl font-black text-slate-950">{value}</p><p className="mt-2 font-bold text-slate-400">{label}</p></article>;
}
