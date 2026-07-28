import { ArrowRight, ChevronLeft, ChevronRight, Heart, MoreVertical, Plus } from 'lucide-react';
import { Avatar, DashboardShell, MiniStat } from '../components/DashboardShell';

const courses = [
  ['FRONT END', 'Beginner’s Guide to Becoming a Professional Front-End Developer', 'Leonardo samsul', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', 'bg-[#e8f7ff] text-[#46b7eb]', 46],
  ['UI/UX DESIGN', 'Optimizing User Experience with the Best UI/UX Design', 'Bayu Salto', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80', 'bg-[#efe8ff] text-[#6d5df6]', 54],
  ['BRANDING', 'Reviving and Refreshing Company Image', 'Padhang Satrio', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'bg-[#ffe7fb] text-[#e652d0]', 42],
];

export default function MemberDashboard() {
  return <DashboardShell title="Dashboard" eyebrow="ONLINE COURSE" role="member">
    <section className="grid gap-7 pt-8 xl:grid-cols-[minmax(0,1fr)_420px]">
      <div className="min-w-0 space-y-7 overflow-hidden">
        <div className="hero-card rounded-[1.7rem] bg-[#6d5df6] px-7 py-8 text-white md:px-8 md:py-9">
          <p className="text-sm font-medium tracking-[.42em]">ONLINE COURSE</p>
          <h2 className="mt-5 max-w-3xl text-[2.55rem] font-semibold leading-[1.08] tracking-[-.04em] md:text-[2.9rem]">Sharpen Your Skills with Professional Online Courses</h2>
          <button className="mt-10 flex items-center gap-4 rounded-full bg-[#111] py-2 pl-7 pr-2 text-base font-semibold">Join Now <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-black"><ArrowRight size={18} /></span></button>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          <MiniStat label="UI/UX Design" value="2/8 watched" icon="✣" />
          <MiniStat label="Branding" value="3/8 watched" tone="pink" icon="▢" />
          <MiniStat label="Front End" value="6/12 watched" tone="blue" icon="⊞" />
        </div>

        <section id="lessons" className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[1.65rem] font-semibold tracking-[-.05em]">Continue Watching</h2>
            <div className="flex gap-3"><button className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#6d5df6]"><ChevronLeft size={21} /></button><button className="grid h-10 w-10 place-items-center rounded-full bg-[#6d5df6] text-white"><ChevronRight size={21} /></button></div>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">{courses.map((course, index) => <article key={course[1]} className="rounded-[1.7rem] bg-white p-5 shadow-sm"><div className="relative h-40 overflow-hidden rounded-[1.35rem]"><img src={course[3] as string} alt="" className="h-full w-full object-cover" /><button className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/35 text-white backdrop-blur"><Heart size={20} /></button></div><p className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${course[4]}`}>{course[0]}</p><h3 className="mt-3 min-h-[4.5rem] text-[1.15rem] font-semibold leading-tight tracking-[-.04em]">{course[1]}</h3><div className="mt-5 h-1 rounded-full bg-zinc-100"><div className="h-full rounded-full bg-[#6d5df6]" style={{ width: `${course[5]}%` }} /></div><div className="mt-5 flex items-center gap-3"><Avatar seed={index + 2} /><div><p className="font-semibold">{course[2]}</p><p className="text-sm text-zinc-400">Mentor</p></div></div></article>)}</div>
        </section>

        <section id="tasks" className="rounded-[1.7rem] bg-white px-6 pb-4 pt-3 shadow-sm">
          <div className="flex items-center justify-between py-3"><h2 className="text-[1.65rem] font-semibold tracking-[-.05em]">Your Lesson</h2><a className="font-semibold text-[#6d5df6] underline" href="#">See all</a></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left"><thead className="border-b text-sm font-medium uppercase text-zinc-400"><tr><th className="py-3 pl-12">Mentor</th><th>Type</th><th>Desc</th><th>Action</th></tr></thead><tbody><tr className="border-b border-dashed"><td className="py-4"><div className="flex items-center gap-3"><Avatar seed={5} /><div><p className="font-semibold">Padhang Satrio</p><p className="text-zinc-400">2/16/2004</p></div></div></td><td><span className="rounded-full bg-[#eee7ff] px-3 py-1 text-sm font-bold text-[#6d5df6]">UI/UX DESIGN</span></td><td className="text-lg font-medium">Understand Of UI/UX Design</td><td><button className="grid h-9 w-9 place-items-center rounded-full border border-[#ddd7ff] text-[#6d5df6]">↗</button></td></tr></tbody></table></div>
        </section>
      </div>
      <RightPanel />
      <form id="profile-settings" className="sr-only"><input name="username" /><input name="email" type="email" /><input name="displayName" /><textarea name="bio" /><input name="website" /><input name="discord" /><input name="backgroundImage" /></form><input id="background-upload" name="backgroundImage" type="file" accept="image/*" className="sr-only" /><div id="background-preview" className="hidden" /><button id="remove-background" type="button" className="hidden">ลบรูปพื้นหลัง</button><span id="profile-slug" className="sr-only">member</span><span id="links-count" className="sr-only">0</span><div id="inbox" className="sr-only" /><div id="badges" className="sr-only" /><div id="widgets" className="sr-only" /><div id="songs" className="sr-only" /><div id="security" className="sr-only" /><div id="appearance" className="sr-only" /><div id="links" className="sr-only" />
    </section>
  </DashboardShell>;
}

function RightPanel() {
  return <aside className="space-y-7"><section className="rounded-[1.7rem] bg-white p-7 shadow-sm"><div className="flex justify-between"><h2 className="text-[1.65rem] font-semibold tracking-[-.05em]">Statistic</h2><MoreVertical className="text-zinc-400" /></div><div className="relative mx-auto mt-7 grid h-44 w-44 place-items-center rounded-full border-[10px] border-[#eee7ff]"><div className="absolute inset-[-10px] rounded-full border-[4px] border-[#6d5df6] border-l-transparent border-b-transparent rotate-[-30deg]" /><span className="absolute right-[-18px] top-4 rounded-full bg-[#6d5df6] px-2 py-1 text-sm font-bold text-white">32%</span><Avatar seed={4} className="h-28 w-28 bg-[#e7dceb] text-6xl" /></div><h3 className="mt-5 text-center text-[1.55rem] font-semibold tracking-[-.05em]">Good Morning Jason 🔥</h3><p className="text-center text-zinc-400">Continue your learning to achieve your target!</p><div className="mt-8 rounded-[1.5rem] bg-[#f5f6fb] px-7 py-7"><div className="relative flex h-36 items-end justify-between border-y border-dashed border-zinc-300/70 py-1"><Bar h="34%" /><Bar h="64%" active /><Bar h="34%" /><Bar h="95%" active /><Bar h="30%" /></div><div className="mt-3 flex justify-between text-sm text-zinc-400"><span>1-10 Aug</span><span>11-20 Aug</span><span>21-30 Aug</span></div></div></section><section id="group" className="rounded-[1.7rem] bg-white p-7 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-[1.55rem] font-semibold tracking-[-.05em]">Your mentor</h2><button className="grid h-10 w-10 place-items-center rounded-full border text-[#6d5df6]"><Plus size={20} /></button></div><div className="mt-5 rounded-[1.5rem] bg-[#f5f6fb] px-6 py-5">{['Padhang Satrio', 'Zakir Horizontal', 'Leonardo Samsul'].map((name, index) => <div key={name} className="flex items-center gap-4 border-b border-dashed py-4 first:pt-0 last:border-0"><Avatar seed={index + 5} className={index === 0 ? 'bg-[#ffe6a6]' : index === 1 ? 'bg-[#e8cbd9]' : 'bg-[#d9c5a8]'} /><div className="mr-auto"><p className="font-semibold">{name}</p><p className="text-sm text-zinc-400">Mentor</p></div><button className="rounded-full border border-[#ddd7ff] px-4 py-2 text-sm font-semibold text-[#6d5df6]">Follow</button></div>)}<button className="mt-3 w-full rounded-full bg-[#eee7ff] py-4 font-semibold text-[#6d5df6]">See All</button></div></section></aside>;
}
function Bar({ h, active }: { h: string; active?: boolean }) { return <span className={`w-12 rounded-lg ${active ? 'bg-[#6d5df6]' : 'bg-[#cbc5ff]'}`} style={{ height: h }} />; }
