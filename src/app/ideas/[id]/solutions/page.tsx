'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, GitBranch, ExternalLink } from 'lucide-react'

const mockIdeaTitles: Record<string, string> = {
  '1': 'Excel作業を自動化したい',
  '3': '会議の議事録を自動生成したい',
  '5': '電車の遅延をリアルタイムで通知してほしい',
}

const mockSolutions: Record<string, {
  id: string
  name: string
  description: string
  techStack: string[]
  builderName: string
  builderInitials: string
  builderColor: string
  repoUrl: string
  demoUrl?: string
  reactions: { awesome: number; thanks: number; mind_blown: number }
  approved: boolean
}[]> = {
  '5': [
    {
      id: '1',
      name: 'TrainAlert',
      description: '登録した路線に遅延が発生した際、Push通知とメールでリアルタイムに通知します。遅延情報は5分ごとに自動更新されます。',
      techStack: ['Node.js', 'WebPush', 'Railway API', 'Supabase'],
      builderName: 'Kobayashi',
      builderInitials: 'K',
      builderColor: 'bg-emerald-500',
      repoUrl: 'https://github.com/example/train-alert',
      demoUrl: 'https://train-alert.vercel.app',
      reactions: { awesome: 18, thanks: 7, mind_blown: 4 },
      approved: true,
    },
    {
      id: '2',
      name: 'DelayWatch',
      description: 'LINEと連携して、登録路線の遅延を朝の通勤時間帯に自動で通知するBotです。余計な操作なしに毎朝情報が届きます。',
      techStack: ['Python', 'LINE Messaging API', 'scraping'],
      builderName: 'dev_yuki',
      builderInitials: 'Y',
      builderColor: 'bg-pink-500',
      repoUrl: 'https://github.com/example/delay-watch',
      reactions: { awesome: 9, thanks: 12, mind_blown: 2 },
      approved: false,
    },
  ],
  '1': [
    {
      id: '1',
      name: 'EasyExcel',
      description: 'CSVまたはExcelファイルをアップロードするだけで、自動集計・グラフ生成・月次レポートのPDF出力まで一括で行えるWebアプリです。',
      techStack: ['Python', 'FastAPI', 'pandas', 'Next.js'],
      builderName: 'dev_taro',
      builderInitials: 'D',
      builderColor: 'bg-violet-500',
      repoUrl: 'https://github.com/example/easy-excel',
      demoUrl: 'https://easy-excel.vercel.app',
      reactions: { awesome: 18, thanks: 7, mind_blown: 4 },
      approved: true,
    },
  ],
}

export default function SolutionsListPage() {
  const params = useParams<{ id: string }>()
  const ideaTitle = mockIdeaTitles[params.id] ?? 'アイデア'
  const solutions = mockSolutions[params.id] ?? mockSolutions['5']

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
      <Link
        href={`/ideas/${params.id}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="size-4" />
        アイデア詳細へ戻る
      </Link>

      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">NEEDEA / 作品一覧</p>
      <h1 className="text-xl font-bold mb-1">{ideaTitle}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        このアイデアで作られた作品
        <span className="ml-2 text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">{solutions.length}件</span>
      </p>

      <div className="space-y-4">
        {solutions.map((sol) => (
          <div key={sol.id} className="border border-border rounded-xl p-5 bg-card">
            <div className="flex items-start gap-4">
              <div className={`size-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${sol.builderColor}`}>
                {sol.builderInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-semibold">{sol.name}</h2>
                  {sol.approved && (
                    <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">✓ 投稿者が承認</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">@{sol.builderName}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{sol.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {sol.techStack.map((t) => (
                    <span key={t} className="text-xs bg-muted text-muted-foreground rounded-md px-2 py-0.5">#{t}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>🎉 {sol.reactions.awesome}</span>
                    <span>🙏 {sol.reactions.thanks}</span>
                    <span>🤯 {sol.reactions.mind_blown}</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={sol.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-1.5 transition-colors"
                    >
                      <GitBranch className="size-3.5" />
                      GitHub
                    </a>
                    {sol.demoUrl && (
                      <a
                        href={sol.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-1.5 transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                        デモ
                      </a>
                    )}
                    <Link
                      href={`/ideas/${params.id}/solution`}
                      className="inline-flex items-center gap-1 text-xs bg-primary text-primary-foreground rounded-lg px-3 py-1.5 hover:opacity-90 transition-opacity"
                    >
                      詳細・フィードバック
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
