'use client'

import Link from 'next/link'
import { Filter } from 'lucide-react'
import { Button } from '@/libs/shadcn/assets/ui/button'
import { Badge } from '@/libs/shadcn/assets/ui/badge'

type Builder = {
  id: string
  name: string
  initials: string
  color: string
  solvedCount: number
  skills: string[]
  matchPct?: number
}

const mockBuilders: Builder[] = [
  { id: '1', name: 'taro', initials: 'T', color: 'bg-violet-500', solvedCount: 31, skills: ['Python', 'AI'], matchPct: 85 },
  { id: '2', name: 'Miyuki', initials: 'M', color: 'bg-blue-500', solvedCount: 24, skills: ['React', 'Next.js'], matchPct: 60 },
  { id: '3', name: 'Kobayashi', initials: 'K', color: 'bg-emerald-500', solvedCount: 18, skills: ['Node.js', 'API'], matchPct: 40 },
  { id: '4', name: 'build_k', initials: 'B', color: 'bg-orange-500', solvedCount: 12, skills: ['Python', 'FastAPI'], matchPct: 20 },
  { id: '5', name: 'dev_yuki', initials: 'Y', color: 'bg-pink-500', solvedCount: 9, skills: ['Vue', 'TypeScript'] },
  { id: '6', name: 'fast_m', initials: 'F', color: 'bg-yellow-500', solvedCount: 7, skills: ['Go', 'Rust'] },
]

const recentlySolved = [
  { id: '1', title: 'Excel作業を自動化したい', solver: 'taro', solverColor: 'bg-violet-500', solverInit: 'T', wants: 124, skills: ['Python', 'VBA', 'pandas'] },
  { id: '3', title: '会議の議事録を自動生成したい', solver: 'Miyuki', solverColor: 'bg-blue-500', solverInit: 'M', wants: 201, skills: ['Whisper', 'GPT-4'] },
  { id: '5', title: '電車の遅延をリアルタイムで通知してほしい', solver: 'Kobayashi', solverColor: 'bg-emerald-500', solverInit: 'K', wants: 312, skills: ['Node.js', 'API'] },
]

const matchBarColor = (pct: number) => {
  if (pct >= 70) return 'bg-emerald-500'
  if (pct >= 40) return 'bg-yellow-500'
  return 'bg-slate-500'
}

export default function BuildersPage() {
  const recommended = mockBuilders.filter((b) => b.matchPct !== undefined).sort((a, b) => (b.matchPct ?? 0) - (a.matchPct ?? 0))

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">NEEDEA / Build-ers</p>
      <h1 className="text-2xl font-bold mb-1">Solution Masters</h1>
      <p className="text-sm text-muted-foreground mb-6">アイデアに共感し、自ら動いた解決者たち。</p>

      <div className="flex gap-6">
        {/* Left filter */}
        <aside className="w-44 shrink-0">
          <div className="sticky top-20 space-y-4">
            <div className="border border-border rounded-xl p-4 bg-card">
              <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-1 uppercase tracking-wider">
                <Filter className="size-3" /> フィルター
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Skills</p>
                  <select className="w-full h-7 rounded-lg border border-border bg-muted text-xs px-2 outline-none text-foreground">
                    <option>すべて</option>
                    <option>Python</option>
                    <option>React</option>
                    <option>AI</option>
                    <option>Node.js</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">制作数</p>
                  <select className="w-full h-7 rounded-lg border border-border bg-muted text-xs px-2 outline-none text-foreground">
                    <option>指定なし</option>
                    <option>10件以上</option>
                    <option>20件以上</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Featured Build-ers */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">注目度の高次解決（Featured Build-ers）</p>
            <div className="grid grid-cols-3 gap-3">
              {mockBuilders.slice(0, 3).map((b) => (
                <div key={b.id} className="border border-border rounded-xl p-4 bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`size-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${b.color}`}>
                      {b.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">@{b.name}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground mb-2">
                    <p>形にしたアイデア <span className="text-foreground font-medium">{b.solvedCount}件</span></p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {b.skills.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs h-4 border-border text-muted-foreground">{s}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently solved */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">最近形になったアイデア（Recently Built）</p>
            <div className="grid grid-cols-3 gap-3">
              {recentlySolved.map((s) => (
                <Link key={s.id} href={`/ideas/${s.id}`} className="block">
                  <div className="border border-border rounded-xl p-3 bg-card hover:border-primary/50 hover:scale-[1.02] transition-all">
                    <p className="text-sm font-medium leading-snug mb-2">{s.title}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${s.solverColor}`}>
                        {s.solverInit}
                      </div>
                      <span className="text-xs text-muted-foreground">@{s.solver}</span>
                    </div>
                    <p className="text-xs text-primary font-bold mb-2">🔥 {s.wants} Wants</p>
                    <div className="flex flex-wrap gap-1">
                      {s.skills.map((sk) => (
                        <span key={sk} className="text-xs bg-muted text-muted-foreground rounded px-1.5 py-0.5">{sk}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: おすすめ */}
        <aside className="w-48 shrink-0">
          <div className="sticky top-20">
            <div className="border border-border rounded-xl p-4 bg-card">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">おすすめの解決者<br />（Solution Masters）</p>
              <div className="space-y-3">
                {recommended.map((b) => (
                  <div key={b.id} className="flex items-center gap-2">
                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${b.color}`}>
                      {b.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">@{b.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${matchBarColor(b.matchPct ?? 0)}`}
                            style={{ width: `${b.matchPct}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{b.matchPct}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
