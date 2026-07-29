import { ArrowRight, BarChart3, Link as LinkIcon, Palette, ShieldCheck } from 'lucide-react';

const features = [
  { title: 'รวมทุกลิงก์', description: 'เพิ่มลิงก์โซเชียล เว็บไซต์ และช่องทางติดต่อทั้งหมดไว้ในหน้าเดียว', icon: LinkIcon },
  { title: 'แดชบอร์ดพร้อมใช้', description: 'จัดการข้อมูลส่วนตัว รูปลักษณ์ และสถานะสมาชิกได้จากหน้า Dashboard', icon: BarChart3 },
  { title: 'ปรับแต่งสวยง่าย', description: 'รองรับรูปพื้นหลัง โปรไฟล์ และดีไซน์แบบ glass card ที่ใช้งานได้ทันที', icon: Palette },
  { title: 'ดูแลสมาชิก', description: 'มีหน้า Admin สำหรับจัดการรายชื่อสมาชิกและแพ็กเกจพื้นฐาน', icon: ShieldCheck },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-400 via-sky-500 to-fuchsia-500" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-5 py-2 text-sm font-black text-indigo-600">
            PXOMXD Webshop พร้อมใช้งานบน Vercel
          </span>
          <h1 className="mt-8 text-5xl font-black tracking-tight md:text-7xl">
            รวมทุกตัวตนไว้ใน{' '}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">ลิงก์เดียว</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-500 md:text-lg">
            หน้าแรกนี้ถูกสร้างเป็น Next.js route เพื่อให้ Vercel เปิดเว็บไซต์ได้ทันทีและไม่เจอ 404 อีกต่อไป
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-4 font-black text-white shadow-2xl shadow-slate-300" href="/dashboard">
              เปิด Dashboard <ArrowRight size={18} />
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 font-black text-slate-700 shadow-sm" href="/admin">
              ไปหน้า Admin
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 text-left shadow-xl shadow-slate-100 backdrop-blur">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Icon size={24} />
                </span>
                <h2 className="mt-5 text-xl font-black">{feature.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
