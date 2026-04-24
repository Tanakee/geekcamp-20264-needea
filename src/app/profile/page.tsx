'use client'

import Link from 'next/link'
import { GitBranch } from 'lucide-react'

const mockProfile = {
  name: 'Tanaka',
  handle: '@Tanaka',
  initials: 'T',
  color: 'bg-violet-500',
  githubUrl: 'https://github.com',
  stats: {
    posted: 8,
    totalWants: 847,
    solved: 3,
    adopted: 2,
    thanksCoffee: 1,
  },
  postedIdeas: [
    { id: '1', title: 'Excel作業を自動化したい', wants: 124, status: '開発中' as const },
    { id: '3', title: '会議の議事録を自動生成したい', wants: 201, status: '開発中' as const },
    { id: '4', title: '子どもの予定を家族全員で共有したい', wants: 77, status: '募集中' as const },
  ],
  solvedIdeas: [
    { id: '5', title: '電車の遅延をリアルタイムで通知してほしい', wants: 312, repoUrl: 'https://github.com/example/train-delay', solver: 'taro', solverColor: 'bg-violet-500', solverInit: 'T' },
  ],
  badges: [
    { id: '1', name: '着眼点のプロ', emoji: '🎯', desc: '100人以上が共感', earned: true },
    { id: '2', name: '爆速解決師', emoji: '⚡', desc: '3日以内に解決', earned: true },
    { id: '3', name: '社会貢献の星', emoji: '🌟', desc: '10件以上解決', earned: false },
    { id: '4', name: 'AIマスター', emoji: '🤖', desc: 'AI系を5件解決', earned: false },
  ],
}

const statusStyle: Record<string, string> = {
  '募集中': 'bg-slate-700 text-slate-300',
  '開発中': 'bg-blue-900 text-blue-300',
  '解決済み': 'bg-emerald-900 text-emerald-300',
}

const barHeights = [20, 35, 28, 45, 60, 42, 55, 70, 48, 65, 80, 55]

export default function ProfilePage() {
  const p = mockProfile

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">NEEDEA / 実績プロフィール画面</p>
      <h2 className="text-lg font-bold mb-6">アチーブメント・ミュージアム</h2>

      {/* Header */}
      <div className="flex items-center gap-5 mb-8 border border-border rounded-xl p-5 bg-card">
        <div className={`size-16 rounded-full flex items-center justify-center text-xl font-bold text-white ${p.color}`}>
          {p.initials}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{p.handle}</h1>
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors mt-1">
            <GitBranch className="size-3.5" />
            GitHub連携済み
          </a>
        </div>
        <div className="grid grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold">{p.stats.posted}</p>
            <p className="text-xs text-muted-foreground">投稿</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{p.stats.totalWants}</p>
            <p className="text-xs text-muted-foreground">Wants獲得</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{p.stats.solved}</p>
            <p className="text-xs text-muted-foreground">解決</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{p.stats.thanksCoffee}</p>
            <p className="text-xs text-muted-foreground">サンクス☕</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 発見のプロ Stats */}
        <div className="border border-border rounded-xl p-4 bg-card">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">発見のプロ & 解決統計</p>
          <div className="flex items-end gap-1 h-20 mb-2">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-primary/60 hover:bg-primary transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center">過去12ヶ月の活動</p>
          <div className="mt-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">採用されたアイデア</span>
              <span className="font-medium">{p.stats.adopted}件</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">総Want数</span>
              <span className="font-medium text-primary">{p.stats.totalWants}</span>
            </div>
          </div>
        </div>

        {/* 解決の実績グラフ */}
        <div className="border border-border rounded-xl p-4 bg-card">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">解決の実績グラフ（Build-er Stats）</p>
          <div className="space-y-2 mb-3">
            {[
              { label: 'Python系', count: 2, color: 'bg-violet-500' },
              { label: 'Web系', count: 1, color: 'bg-blue-500' },
              { label: 'AI系', count: 1, color: 'bg-emerald-500' },
            ].map((cat) => (
              <div key={cat.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{cat.label}</span>
                  <span className="font-medium">{cat.count}件</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${(cat.count / 3) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">解決したNeedポートフォリオ</p>
          {p.solvedIdeas.map((idea) => (
            <Link key={idea.id} href={`/ideas/${idea.id}`} className="block">
              <div className="border border-border rounded-lg p-2 hover:border-primary/50 transition-colors">
                <p className="text-xs font-medium leading-snug">{idea.title}</p>
                <p className="text-xs text-primary mt-0.5">🔥 {idea.wants} Wants</p>
                {idea.repoUrl && (
                  <a href={idea.repoUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                    onClick={(e) => e.stopPropagation()}>
                    <GitBranch className="size-3" /> Repo
                  </a>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Badge Collection */}
        <div className="border border-border rounded-xl p-4 bg-card">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">称号コレクション（The Badge Collection）</p>
          <div className="grid grid-cols-2 gap-2">
            {p.badges.map((badge) => (
              <div
                key={badge.id}
                className={`border rounded-xl p-3 text-center transition-all ${
                  badge.earned
                    ? 'border-primary/40 bg-primary/10'
                    : 'border-border bg-muted/20 opacity-40'
                }`}
              >
                <p className="text-2xl mb-1">{badge.emoji}</p>
                <p className="text-xs font-semibold leading-tight">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{badge.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 border border-border rounded-xl p-3 bg-muted/20">
            <p className="text-xs font-semibold mb-2">投稿したアイデア</p>
            <div className="space-y-1.5">
              {p.postedIdeas.map((idea) => (
                <Link key={idea.id} href={`/ideas/${idea.id}`} className="block">
                  <div className="flex items-center justify-between gap-2 hover:opacity-80 transition-opacity">
                    <p className="text-xs text-muted-foreground truncate leading-snug">{idea.title}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${statusStyle[idea.status]}`}>
                      {idea.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
