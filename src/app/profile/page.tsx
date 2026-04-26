'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GitBranch, Lock, Globe } from 'lucide-react'
import { Button } from '@/libs/shadcn/assets/ui/button'

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
    { id: '1', title: 'Excel作業を自動化したい', wants: 124, status: '開発中' as const, isPublic: true },
    { id: '3', title: '会議の議事録を自動生成したい', wants: 201, status: '作品あり' as const, isPublic: true },
    { id: '4', title: '子どもの予定を家族全員で共有したい', wants: 77, status: '募集中' as const, isPublic: true },
    { id: '7', title: 'スーパーの特売情報をまとめて通知してほしい', wants: 0, status: '募集中' as const, isPublic: false },
    { id: '8', title: '読んだ本の感想を一言でまとめたい', wants: 0, status: '募集中' as const, isPublic: false },
  ],
  likedIdeas: [
    { id: '5', title: '電車の遅延をリアルタイムで通知してほしい', wants: 312, status: '作品あり' as const, author: 'Ito' },
    { id: '2', title: 'TODOアプリよりもものを作りたい', wants: 56, status: '募集中' as const, author: 'Sato' },
    { id: '6', title: '読んだ本の内容を要約して保存したい', wants: 55, status: '募集中' as const, author: 'Nakamura' },
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
  '募集中': 'bg-slate-100 text-slate-600',
  '開発中': 'bg-blue-50 text-blue-600',
  '作品あり': 'bg-emerald-50 text-emerald-600',
}

const barHeights = [20, 35, 28, 45, 60, 42, 55, 70, 48, 65, 80, 55]

export default function ProfilePage() {
  const p = mockProfile
  const [githubConnected, setGithubConnected] = useState(false)
  const [activeTab, setActiveTab] = useState<'posted' | 'liked'>('posted')

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">NEEDEA / プロフィール</p>
      <h2 className="text-lg font-bold mb-6">アチーブメント・ミュージアム</h2>

      {/* Header */}
      <div className="flex items-center gap-5 mb-6 border border-border rounded-xl p-5 bg-card">
        <div className={`size-16 rounded-full flex items-center justify-center text-xl font-bold text-white ${p.color}`}>
          {p.initials}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{p.handle}</h1>
          {githubConnected ? (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-500 transition-colors mt-1">
              <GitBranch className="size-3.5" />
              GitHub連携済み · Build-er
            </a>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">Need-er として活動中</p>
          )}
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
            <p className="text-xs text-muted-foreground">形になった</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{p.stats.thanksCoffee}</p>
            <p className="text-xs text-muted-foreground">サンクス☕</p>
          </div>
        </div>
      </div>

      {/* GitHub連携バナー */}
      {!githubConnected ? (
        <div className="mb-6 border border-dashed border-primary/40 rounded-xl p-5 bg-primary/5 flex items-center gap-5">
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1">Build-er として活動する</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              GitHubアカウントを連携すると、アイデアへの制作宣言や成果物リポジトリの掲載など、Build-er向け機能が解放されます。
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 gap-2 border-border"
            onClick={() => setGithubConnected(true)}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub を連携する
          </Button>
        </div>
      ) : (
        <div className="mb-6 border border-emerald-200 rounded-xl p-4 bg-emerald-50 flex items-center gap-3">
          <div className="size-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <GitBranch className="size-4 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-emerald-700">GitHub連携済み · Build-er機能が解放されています</p>
            <p className="text-xs text-emerald-600">制作宣言・リポジトリ掲載・Build-er統計が利用できます</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* 活動グラフ */}
        <div className="border border-border rounded-xl p-4 bg-card">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">活動グラフ</p>
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

        {/* Build-er Stats */}
        <div className={`border rounded-xl p-4 bg-card relative ${!githubConnected ? 'border-dashed border-border' : 'border-border'}`}>
          {!githubConnected && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/70 z-10">
              <p className="text-xs font-medium text-muted-foreground">GitHub連携で解放</p>
            </div>
          )}
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">制作の実績（Build-er Stats）</p>
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
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">形にしたアイデア</p>
          {p.solvedIdeas.map((idea) => (
            <Link key={idea.id} href={`/ideas/${idea.id}`} className="block">
              <div className="border border-border rounded-lg p-2 hover:border-primary/50 transition-colors">
                <p className="text-xs font-medium leading-snug">{idea.title}</p>
                <p className="text-xs text-primary mt-0.5">🔥 {idea.wants} Wants</p>
                {idea.repoUrl && (
                  <a href={idea.repoUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
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
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">称号コレクション</p>
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
        </div>
      </div>

      {/* アイデアタブ */}
      <div className="border border-border rounded-xl bg-card overflow-hidden">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('posted')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'posted'
                ? 'text-foreground border-b-2 border-primary bg-background'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            投稿したアイデア
            <span className="ml-2 text-xs bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
              {p.postedIdeas.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'liked'
                ? 'text-foreground border-b-2 border-primary bg-background'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            いいねしたアイデア
            <span className="ml-2 text-xs bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
              {p.likedIdeas.length}
            </span>
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'posted' && (
            <div className="grid grid-cols-2 gap-3">
              {p.postedIdeas.map((idea) => (
                <Link key={idea.id} href={idea.isPublic ? `/ideas/${idea.id}` : '#'} className="block">
                  <div className={`border rounded-xl p-4 transition-all ${
                    idea.isPublic
                      ? 'border-border hover:border-primary/50 hover:shadow-sm'
                      : 'border-dashed border-border bg-muted/20'
                  }`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-medium leading-snug flex-1">{idea.title}</p>
                      {idea.isPublic ? (
                        <Globe className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      ) : (
                        <Lock className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">🔥 {idea.wants} Wants</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${statusStyle[idea.status]}`}>
                        {idea.status}
                      </span>
                      {!idea.isPublic && (
                        <span className="text-xs text-muted-foreground">非公開</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="grid grid-cols-2 gap-3">
              {p.likedIdeas.map((idea) => (
                <Link key={idea.id} href={`/ideas/${idea.id}`} className="block">
                  <div className="border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-sm transition-all">
                    <p className="text-sm font-medium leading-snug mb-2">{idea.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">🔥 {idea.wants} Wants</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${statusStyle[idea.status]}`}>
                        {idea.status}
                      </span>
                      <span className="text-xs text-muted-foreground">@{idea.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
