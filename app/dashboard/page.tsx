import { Eye, Link, Shield, UserRound, MessageCircle, ArrowUpRight } from 'lucide-react';
import { DashboardShell, StatCard } from '../components/DashboardShell';

export default function MemberDashboard() {
  return <DashboardShell title="Member Overview" eyebrow="Next.js + Tailwind" role="member">
    <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard label="ยอดเข้าชมโปรไฟล์" value="1" icon={<Eye size={28} />} />
      <StatCard label="ลิงก์ทั้งหมด" value="0" valueId="links-count" icon={<Link size={28} />} />
      <StatCard label="เหรียญตรา" value="0" icon={<Shield size={28} />} />
      <StatCard label="แพ็กเกจปัจจุบัน" value="ฟรี" icon={<UserRound size={28} />} />
    </section>
    <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_390px]">
      <div className="glass-card rounded-[2.25rem] p-6 md:p-8">
        <div className="flex flex-col gap-3 border-b border-slate-200/70 pb-6 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-black">จัดการโปรไฟล์</h2><p className="font-semibold text-slate-400">แก้ไขข้อมูลที่จะแสดงบนหน้าโปรไฟล์ของคุณ</p></div><span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-black text-indigo-600">Auto save ready</span></div>
        <form id="profile-settings" className="mt-7 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-bold text-slate-500">ชื่อผู้ใช้<input name="username" className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-indigo-400" /></label>
          <label className="space-y-2 text-sm font-bold text-slate-500">อีเมล<input name="email" type="email" className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-indigo-400" /></label>
          <label className="space-y-2 text-sm font-bold text-slate-500 md:col-span-2">ชื่อแสดงผล<input name="displayName" className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-indigo-400" /></label>
          <label className="space-y-2 text-sm font-bold text-slate-500 md:col-span-2">คำอธิบาย<textarea name="bio" rows={4} className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-indigo-400" /></label>
          <div id="links" className="grid gap-3 md:col-span-2"><p className="font-black">ลิงก์โซเชียล</p><input name="website" placeholder="https://pxomxd.info/username" className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-indigo-400" /><input name="discord" placeholder="Discord URL" className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none focus:border-indigo-400" /></div>
          <button className="rounded-2xl bg-slate-950 px-6 py-4 font-black text-white shadow-xl shadow-slate-200 md:col-span-2" type="submit">บันทึกข้อมูลส่วนตัว</button>
        </form>
      </div>
      <aside className="grid content-start gap-6">
        <div className="glass-card rounded-[2rem] p-7"><h3 className="flex items-center gap-3 text-xl font-black"><MessageCircle className="text-indigo-600" /> Discord Community</h3><p className="mt-2 font-semibold text-slate-400">อัปเดตข่าวสารและพูดคุยกับทีมงาน</p><a className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-4 font-black text-white" href="https://discord.gg/sayabot">เข้าร่วม Discord <ArrowUpRight size={18} /></a></div>
        <div className="glass-card rounded-[2rem] p-7"><h3 className="text-xl font-black">โปรไฟล์ของคุณ</h3><p className="mt-5 text-slate-400">pxomxd.info/<b id="profile-slug" className="text-slate-950">member</b></p><a className="mt-6 block rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 text-center font-black" href="/profile">ดูโปรไฟล์</a></div>
        <div id="appearance" className="glass-card rounded-[2rem] p-7"><h3 className="text-xl font-black">รูปลักษณ์</h3><p className="mt-2 text-sm font-semibold text-slate-400">อัปโหลดรูปภาพพื้นหลังที่จะแสดงในหน้าโปรไฟล์</p><input id="background-upload" name="backgroundImage" type="file" accept="image/*" className="mt-5 w-full rounded-2xl border border-dashed border-slate-300 bg-white/80 px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:font-bold file:text-white" /><div id="background-preview" className="mt-4 hidden h-36 rounded-[1.5rem] border border-slate-200 bg-cover bg-center" /><button id="remove-background" type="button" className="mt-3 hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-bold">ลบรูปพื้นหลัง</button></div>
      </aside>
    </section><div id="badges" className="sr-only"/><div id="widgets" className="sr-only"/><div id="songs" className="sr-only"/><div id="security" className="sr-only"/>
  </DashboardShell>;
}
