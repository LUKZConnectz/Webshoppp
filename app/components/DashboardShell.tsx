'use client';

import Script from 'next/script';
import { Bell, BookOpenCheck, Inbox, LayoutDashboard, LogOut, Search, Settings, Shield, UsersRound, WalletCards } from 'lucide-react';
import type { ReactNode } from 'react';

type NavItem = { label: string; href: string; icon: ReactNode; active?: boolean };

export function DashboardShell({ title, eyebrow, role, children, actions }: { title: string; eyebrow: string; role: 'member' | 'admin'; children: ReactNode; actions?: ReactNode }) {
  const memberNav: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} />, active: true },
    { label: 'Inbox', href: '#inbox', icon: <Inbox size={20} /> },
    { label: 'Lesson', href: '#lessons', icon: <BookOpenCheck size={20} /> },
    { label: 'Task', href: '#tasks', icon: <WalletCards size={20} /> },
    { label: 'Group', href: '#group', icon: <UsersRound size={20} /> },
  ];
  const adminNav: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} />, active: true },
    { label: 'Inbox', href: '#inbox', icon: <Inbox size={20} /> },
    { label: 'Lesson', href: '#lessons', icon: <BookOpenCheck size={20} /> },
    { label: 'Task', href: '#tasks', icon: <WalletCards size={20} /> },
    { label: 'Group', href: '#group', icon: <UsersRound size={20} /> },
  ];
  const nav = role === 'admin' ? adminNav : memberNav;
  const friends = ['Bagas Mahpie', 'Sir Dandy', 'Jhon Tosan'];

  return (
    <div className="min-h-screen bg-[#b8c0c8] px-4 py-6 text-[#111] md:px-10 xl:px-[5vw] xl:py-[5.5vh]">
      <div className="mx-auto grid h-auto min-h-[min(1200px,89vh)] max-w-[1710px] overflow-hidden rounded-[26px] bg-[#f6f7fc] shadow-2xl shadow-slate-700/20 lg:grid-cols-[276px_1fr] xl:rounded-[28px]">
        <aside className="flex flex-col gap-11 bg-white px-6 py-8 lg:px-11 lg:py-11">
          <a href="/" className="flex items-center gap-3 text-[1.7rem] font-semibold tracking-[-.05em]"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#6d5df6] text-white">✦</span>Coursue</a>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-4 lg:overflow-visible">
            <p className="hidden pt-10 text-xs font-medium uppercase tracking-wide text-zinc-400 lg:block">OVERVIEW</p>
            {nav.map((item) => <a key={item.label} className={`nav-pill flex min-w-max items-center gap-3 rounded-2xl px-3 py-2.5 text-[1.35rem] font-semibold tracking-[-.06em] ${item.active ? 'text-[#161616]' : 'text-zinc-500 hover:bg-[#f5f6fb] hover:text-[#6d5df6]'}`} href={item.href}>{item.icon}{item.label}</a>)}
          </nav>
          <section className="hidden lg:block">
            <p className="mb-5 text-xs font-medium uppercase tracking-wide text-zinc-400">FRIENDS</p>
            <div className="grid gap-6">
              {friends.map((friend, index) => <div key={friend} className="flex items-center gap-4"><Avatar seed={index + (role === 'admin' ? 5 : 1)} /><div><p className="font-semibold tracking-[-.04em]">{friend}</p><p className="text-sm text-zinc-400">{index === 1 ? 'Old Friend' : 'Friend'}</p></div></div>)}
            </div>
          </section>
          <div className="mt-auto flex gap-3 overflow-x-auto lg:block lg:space-y-4">
            <p className="hidden text-xs font-medium uppercase tracking-wide text-zinc-400 lg:block">SETTINGS</p>
            <a className="flex min-w-max items-center gap-3 rounded-2xl px-3 py-3 text-lg font-semibold" href="#settings"><Settings size={21} />Setting</a>
            <button id="logout" className="flex min-w-max items-center gap-3 rounded-2xl px-3 py-3 text-lg font-semibold text-orange-500" type="button"><LogOut size={21} />Logout</button>
          </div>
        </aside>
        <main className="min-w-0 px-5 py-7 md:px-8 lg:px-9">
          <header className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-center">
            <div className="relative max-w-[910px]"><Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={22} /><input className="h-14 w-full rounded-full border border-zinc-200 bg-white px-14 text-lg outline-none placeholder:text-zinc-400" placeholder={role === 'admin' ? 'ค้นหาสมาชิกหรือคอร์ส...' : 'Search your course....'} /></div>
            <div className="flex items-center gap-4">{actions}<button className="grid h-14 w-14 place-items-center rounded-full border border-zinc-200 bg-[#f7f8fd]"><Inbox size={19} /></button><button className="grid h-14 w-14 place-items-center rounded-full border border-zinc-200 bg-[#f7f8fd]"><Bell size={19} /></button><span className="h-14 w-px bg-zinc-300" /><Avatar seed={role === 'admin' ? 9 : 4} /><div><p id="sidebar-name" className="text-lg font-semibold">Jason Ranti</p></div></div>
          </header>
          <div className="sr-only"><p>{eyebrow}</p><h1>{title}</h1></div>
          {children}
          <Script src="/assets/app-alert.js" strategy="afterInteractive" />
          <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" strategy="afterInteractive" />
          <Script src="/assets/supabase-backend.js" strategy="afterInteractive" />
          <Script src={role === 'admin' ? '/assets/admin-dashboard.js' : '/assets/dashboard.js'} strategy="afterInteractive" />
        </main>
      </div>
    </div>
  );
}

export function Avatar({ seed = 1, className = '' }: { seed?: number; className?: string }) {
  const faces = ['👨🏻‍🎓', '👩🏻‍💻', '🧑🏻‍🏫', '🤓', '👨🏻‍💼', '👩🏻‍🎨', '🧑🏻‍🚀', '👨🏻‍🍳', '🧑🏻‍💼'];
  return <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#eee7ff] text-2xl ${className}`}>{faces[seed % faces.length]}</span>;
}

export function MiniStat({ label, value, tone = 'purple', icon = '✣' }: { label: string; value: string; tone?: 'purple' | 'pink' | 'blue'; icon?: string }) {
  const tones = { purple: 'bg-[#ebe7ff] text-[#6d5df6]', pink: 'bg-[#ffe7fb] text-[#e652d0]', blue: 'bg-[#e5f6ff] text-[#45b6e8]' };
  return <article className="flex items-center gap-4 rounded-[1.45rem] bg-white px-4 py-3 shadow-sm"><span className={`grid h-16 w-16 place-items-center rounded-full text-2xl ${tones[tone]}`}>{icon}</span><div><p className="text-zinc-400">{value}</p><h3 className="text-xl font-semibold tracking-[-.06em]">{label}</h3></div><span className="ml-auto text-2xl text-zinc-400">⋮</span></article>;
}
