import Link from 'next/link';

export default function PublicProfilePage({ params }) {
  const { username } = params;

  const links = [
    { title: 'พอร์ตโฟลิโอ', url: '#' },
    { title: 'Instagram', url: '#' },
    { title: 'สั่งงานภาพประกอบ', url: '#' },
  ];

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="border border-line bg-surface rounded-3xl p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mint to-peri mb-4" />
          <div className="font-disp text-xl font-bold text-white">@{username}</div>
          <div className="text-sm text-muted mt-1 mb-6">สร้างหน้าโปรไฟล์ด้วย nokta</div>

          <div className="w-full space-y-2.5">
            {links.map((l) => (
              <a
                key={l.title}
                href={l.url}
                className="block border border-line bg-white/[0.03] hover:border-mint/40 hover:bg-mint/5 rounded-xl px-4 py-3 text-sm font-medium text-white transition-colors"
              >
                {l.title}
              </a>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          นี่คือหน้าตัวอย่าง (mock) — ยังไม่ได้เชื่อมกับข้อมูลจริงในแดชบอร์ด
          <br />
          <Link href="/dashboard" className="text-mint hover:underline">
            กลับไปแดชบอร์ด
          </Link>
        </p>
      </div>
    </main>
  );
}
