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
  status: '募集中' | '開発中' | '作品あり'
  liked: boolean
}

const mockIdeas: Idea[] = [
  { id: '1', title: 'Excel作業を自動化したい', wants: 124, author: 'Tanaka', tags: ['#React', '#Supabase', '#Python'], status: '開発中', liked: false },
  { id: '2', title: 'TODOアプリよりもものを作りたい', wants: 56, author: 'Sato', tags: ['#Next.js', '#AI'], status: '募集中', liked: false },
  { id: '3', title: '会議の議事録を自動生成したい', wants: 201, author: 'Yamada', tags: ['#AI', '#Python'], status: '開発中', liked: false },
  { id: '4', title: '子どもの予定を家族全員で共有したい', wants: 77, author: 'Kobayashi', tags: ['#React', '#カレンダー'], status: '募集中', liked: false },
  { id: '5', title: '電車の遅延をリアルタイムで通知してほしい', wants: 312, author: 'Ito', tags: ['#API', '#通知'], status: '作品あり', liked: false },
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
  '募集中': 'bg-slate-100 text-slate-600',
  '開発中': 'bg-blue-50 text-blue-600',
  '作品あり': 'bg-emerald-50 text-emerald-600',
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
          <p className="text-muted-foreground mb-2 text-sm">
            技術知識ゼロでOK。ツイートするように、日常の「あったらいいな」を投稿しよう。
          </p>
          <p className="text-muted-foreground mb-8 text-xs">
            あなたにしか気づけない視点が、誰かの「作りたいもの」になる。
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-3">
              <Button size="lg" variant="outline" className="gap-2 px-6 h-11 text-sm border-border">
                <svg viewBox="0 0 24 24" className="size-4" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google でログイン
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-6 h-11 text-sm border-border">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X でログイン
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              エンジニアとして解決に参加したい方は、ログイン後にプロフィールからGitHub連携できます
            </p>
          </div>
        </section>
      )}

      <div className="flex gap-6">
        {/* Left: Timeline */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold flex items-center gap-2">
                🔥 Timeline
              </h2>
              <p className="text-xs text-muted-foreground">みんなの「あったらいいな」</p>
            </div>
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
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">アイデアの広がり</p>
              <div className="space-y-2">
                {[
                  { label: '作品あり', value: 24, max: 50, color: 'bg-emerald-500' },
                  { label: '制作中', value: 38, max: 50, color: 'bg-blue-500' },
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
