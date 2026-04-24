'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/libs/shadcn/assets/ui/button'
import { Badge } from '@/libs/shadcn/assets/ui/badge'

type Idea = {
  id: string
  title: string
  wants: number
  author: string
  tags: string[]
  status: '募集中' | '開発中' | '解決済み'
  liked: boolean
}

const mockIdeas: Idea[] = [
  { id: '1', title: 'Excel作業を自動化したい', wants: 124, author: 'Tanaka', tags: ['#React', '#Supabase', '#Python'], status: '開発中', liked: false },
  { id: '2', title: 'TODOアプリよりもものを作りたい', wants: 56, author: 'Sato', tags: ['#Next.js', '#AI'], status: '募集中', liked: false },
  { id: '3', title: '会議の議事録を自動生成したい', wants: 201, author: 'Yamada', tags: ['#AI', '#Python'], status: '開発中', liked: false },
  { id: '4', title: '子どもの予定を家族全員で共有したい', wants: 77, author: 'Kobayashi', tags: ['#React', '#カレンダー'], status: '募集中', liked: false },
  { id: '5', title: '電車の遅延をリアルタイムで通知してほしい', wants: 312, author: 'Ito', tags: ['#API', '#通知'], status: '解決済み', liked: false },
  { id: '6', title: '読んだ本の内容を要約して保存したい', wants: 55, author: 'Nakamura', tags: ['#AI', '#メモ'], status: '募集中', liked: false },
]

const mockBuilders = [
  { id: '1', name: '@taro', initials: 'T', color: 'bg-violet-500', solved: 12 },
  { id: '2', name: '@Miyuki', initials: 'M', color: 'bg-blue-500', solved: 9 },
  { id: '3', name: '@Kobayashi', initials: 'K', color: 'bg-emerald-500', solved: 7 },
  { id: '4', name: '@build_k', initials: 'B', color: 'bg-orange-500', solved: 5 },
  { id: '5', name: '@dev_yuki', initials: 'Y', color: 'bg-pink-500', solved: 4 },
]

const statusStyle: Record<Idea['status'], string> = {
  '募集中': 'bg-slate-700 text-slate-300',
  '開発中': 'bg-blue-900 text-blue-300',
  '解決済み': 'bg-emerald-900 text-emerald-300',
}

export default function TopPage() {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas)
  const [sortBy, setSortBy] = useState<'wants' | 'new'>('wants')
  const [isLoggedIn] = useState(false)

  const sorted = [...ideas].sort((a, b) =>
    sortBy === 'wants' ? b.wants - a.wants : 0
  )

  function toggleLike(id: string) {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id
          ? { ...idea, wants: idea.liked ? idea.wants - 1 : idea.wants + 1, liked: !idea.liked }
          : idea
      )
    )
  }

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
      {!isLoggedIn && (
        <section className="text-center py-14 mb-10">
          <p className="text-sm text-muted-foreground mb-3 tracking-widest uppercase">Need + Idea</p>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            あなたの不満は、誰かのコードになる。
          </h1>
          <p className="text-muted-foreground mb-8 text-sm">
            「あったらいいな」を投稿して、解決者を募ろう
          </p>
          <Button size="lg" className="gap-2 px-8 h-11 text-base">
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub でログイン
          </Button>
        </section>
      )}

      <div className="flex gap-6">
        {/* Left: Timeline */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold flex items-center gap-2">
              🔥 Timeline
            </h2>
            <button
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setSortBy((s) => (s === 'wants' ? 'new' : 'wants'))}
            >
              {sortBy === 'wants' ? 'Wants順' : '投稿順'}
              <ChevronDown className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {sorted.map((idea) => (
              <Link key={idea.id} href={`/ideas/${idea.id}`} className="block">
                <div className="group border border-border rounded-xl p-4 bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.02] transition-all duration-200 relative h-full">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-sm leading-snug pr-8 text-foreground">{idea.title}</h3>
                    <button
                      className={`absolute top-4 right-4 flex items-center gap-1 text-xs rounded-full px-2 py-1 transition-colors ${
                        idea.liked
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        toggleLike(idea.id)
                      }}
                    >
                      🔥
                    </button>
                  </div>
                  <p className="text-xs font-bold text-primary mb-3">{idea.wants} Wants</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground">@{idea.author}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${statusStyle[idea.status]}`}>
                      {idea.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {idea.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs h-4 border-border text-muted-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="w-60 shrink-0">
          <div className="sticky top-20 space-y-4">
            <div className="border border-border rounded-xl p-4 bg-card">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Featured Build-ers</p>
              <div className="space-y-2 mb-4">
                {mockBuilders.map((b) => (
                  <div key={b.id} className="flex items-center gap-3">
                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${b.color}`}>
                      {b.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{b.name}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{b.solved}件</span>
                  </div>
                ))}
              </div>
              <Link href="/builders">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  すべて見る
                </Button>
              </Link>
            </div>

            <div className="border border-border rounded-xl p-4 bg-card">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Problem Solving Stats</p>
              <div className="space-y-2">
                {[
                  { label: '解決済み', value: 24, max: 50, color: 'bg-emerald-500' },
                  { label: '開発中', value: 38, max: 50, color: 'bg-blue-500' },
                  { label: '募集中', value: 50, max: 50, color: 'bg-slate-500' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="text-foreground font-medium">{stat.value}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stat.color}`}
                        style={{ width: `${(stat.value / stat.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border rounded-xl p-4 bg-card">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Top Builders</p>
              <div className="flex gap-2">
                {mockBuilders.slice(0, 5).map((b) => (
                  <div key={b.id} className={`size-9 rounded-full flex items-center justify-center text-xs font-bold text-white ${b.color}`} title={b.name}>
                    {b.initials}
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
