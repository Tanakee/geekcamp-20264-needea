'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, GitBranch, Play, ImageIcon, Video } from 'lucide-react'
import { Button } from '@/libs/shadcn/assets/ui/button'
import { Textarea } from '@/libs/shadcn/assets/ui/textarea'

const mockSolutions: Record<string, {
  ideaTitle: string
  solutionName: string
  description: string
  features: string[]
  techStack: string[]
  builderName: string
  builderInitials: string
  builderColor: string
  repoUrl: string
  demoUrl?: string
  wants: number
}> = {
  '1': {
    ideaTitle: 'Excel作業を自動化したい',
    solutionName: 'EasyExcel',
    description: 'CSVまたはExcelファイルをアップロードするだけで、自動集計・グラフ生成・月次レポートのPDF出力まで一括で行えるWebアプリです。',
    features: [
      'Excelファイルのドラッグ＆ドロップアップロード',
      '部署別・月別の売上を自動集計',
      '棒グラフ・折れ線グラフを自動生成',
      '集計結果をPDFでエクスポート',
      '複数シートの一括処理に対応',
    ],
    techStack: ['Python', 'FastAPI', 'pandas', 'openpyxl', 'Next.js', 'Vercel'],
    builderName: 'dev_taro',
    builderInitials: 'D',
    builderColor: 'bg-violet-500',
    repoUrl: 'https://github.com/example/easy-excel',
    demoUrl: 'https://easy-excel.vercel.app',
    wants: 124,
  },
  '5': {
    ideaTitle: '電車の遅延をリアルタイムで通知してほしい',
    solutionName: 'TrainAlert',
    description: '登録した路線に遅延が発生した際、Push通知とメールでリアルタイムに通知します。遅延情報は5分ごとに自動更新されます。',
    features: [
      '路線・駅の登録（最大5路線）',
      '遅延発生時のPush通知',
      '遅延情報の履歴確認',
      '通知時間帯のカスタマイズ',
    ],
    techStack: ['Node.js', 'WebPush', 'Railway API', 'Supabase'],
    builderName: 'Kobayashi',
    builderInitials: 'K',
    builderColor: 'bg-emerald-500',
    repoUrl: 'https://github.com/example/train-alert',
    wants: 312,
  },
}

const badges = [
  { id: '1', name: '初期化の魔術師', emoji: '🔮', desc: '複雑な問題をシンプルに解決' },
  { id: '2', name: '爆速解決師', emoji: '⚡', desc: '3日以内に解決' },
  { id: '3', name: '社会貢献の星', emoji: '🌟', desc: '多くの人の役に立った' },
  { id: '4', name: 'AIマスター', emoji: '🤖', desc: 'AI技術を活用して解決' },
]

type Approval = 'yes' | 'no' | null

export default function SolutionPage() {
  const params = useParams<{ id: string }>()
  const sol = mockSolutions[params.id] ?? mockSolutions['1']

  const [approval, setApproval] = useState<Approval>(null)
  const [comment, setComment] = useState('')
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null)
  const [reactions, setReactions] = useState({ awesome: 18, thanks: 7, mind_blown: 4 })
  const [myReactions, setMyReactions] = useState({ awesome: false, thanks: false, mind_blown: false })
  const [submitted, setSubmitted] = useState(false)

  function toggleReaction(key: keyof typeof reactions) {
    setMyReactions((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      setReactions((r) => ({ ...r, [key]: r[key] + (next[key] ? 1 : -1) }))
      return next
    })
  }

  function handleSubmit() {
    if (!approval) return
    setSubmitted(true)
  }

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
      <Link href={`/ideas/${params.id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="size-4" />
        アイデア詳細へ戻る
      </Link>

      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Solution Presentation & Feedback</p>
      <h1 className="text-xl font-bold mb-1">{sol.ideaTitle}</h1>
      <p className="text-sm text-muted-foreground mb-6">解決策: <span className="text-foreground font-medium">{sol.solutionName}</span></p>

      <div className="flex gap-6">
        {/* Left: Solution detail */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Builder */}
          <div className="flex items-center gap-3 border border-border rounded-xl p-4 bg-card">
            <div className={`size-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${sol.builderColor}`}>
              {sol.builderInitials}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">@{sol.builderName}</p>
              <p className="text-xs text-muted-foreground">Solution Builder</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-primary">🔥 {sol.wants} Wants</p>
              <p className="text-xs text-muted-foreground">を解決</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">ツール詳細</h2>
            <p className="text-sm leading-relaxed border border-border rounded-xl p-4 bg-muted/20">{sol.description}</p>
          </div>

          {/* Key Features */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Features</h2>
            <ul className="space-y-2">
              {sol.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5 shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">技術スタック</h2>
            <div className="flex flex-wrap gap-2">
              {sol.techStack.map((t) => (
                <span key={t} className="text-xs bg-muted text-muted-foreground rounded-md px-2.5 py-1">#{t}</span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">成果物（Deliverables）</h2>
            <div className="flex flex-wrap gap-2">
              <a href={sol.repoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <GitBranch className="size-4" />
                  GitHub リポジトリ
                  <ExternalLink className="size-3" />
                </Button>
              </a>
              {sol.demoUrl && (
                <a href={sol.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Play className="size-4" />
                    ライブデモ
                    <ExternalLink className="size-3" />
                  </Button>
                </a>
              )}
              <Button variant="outline" size="sm" className="gap-2" disabled>
                <ImageIcon className="size-4" />
                スクリーンショット
              </Button>
              <Button variant="outline" size="sm" className="gap-2" disabled>
                <Video className="size-4" />
                動画デモ
              </Button>
            </div>
          </div>

          {/* Reactions */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">リアクション</h2>
            <div className="flex gap-3">
              {([
                { key: 'awesome' as const, emoji: '🎉', label: 'すごい！' },
                { key: 'thanks' as const, emoji: '🙏', label: 'ありがとう！' },
                { key: 'mind_blown' as const, emoji: '🤯', label: '感動した' },
              ]).map(({ key, emoji, label }) => (
                <button
                  key={key}
                  onClick={() => toggleReaction(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                    myReactions[key]
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <span className="text-lg">{emoji}</span>
                  {label}
                  <span className="font-bold">{reactions[key]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Feedback panel */}
        <aside className="w-60 shrink-0">
          <div className="sticky top-20 space-y-4">
            {submitted ? (
              <div className="border border-emerald-700 rounded-xl p-5 bg-emerald-950 text-center">
                <p className="text-2xl mb-2">🎉</p>
                <p className="text-sm font-semibold text-emerald-300">フィードバックを送信しました！</p>
                <p className="text-xs text-emerald-500 mt-1">ありがとうございます</p>
              </div>
            ) : (
              <>
                {/* Approval */}
                <div className="border border-border rounded-xl p-4 bg-card">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">解決を確認しましたか？</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setApproval('yes')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                        approval === 'yes'
                          ? 'border-emerald-500 bg-emerald-900 text-emerald-300'
                          : 'border-border text-muted-foreground hover:border-emerald-500/50'
                      }`}
                    >
                      ✓ はい
                    </button>
                    <button
                      onClick={() => setApproval('no')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                        approval === 'no'
                          ? 'border-red-500 bg-red-900 text-red-300'
                          : 'border-border text-muted-foreground hover:border-red-500/50'
                      }`}
                    >
                      ✗ いいえ
                    </button>
                  </div>
                </div>

                {/* Comment */}
                <div className="border border-border rounded-xl p-4 bg-card">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">コメント・感謝</p>
                  <Textarea
                    placeholder="エンジニアへの感謝やフィードバックを書いてください..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-20 text-sm"
                  />
                </div>

                {/* Badge */}
                <div className="border border-border rounded-xl p-4 bg-card">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">称号を贈る</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {badges.map((badge) => (
                      <button
                        key={badge.id}
                        onClick={() => setSelectedBadge(selectedBadge === badge.id ? null : badge.id)}
                        className={`border rounded-lg p-2 text-center transition-all ${
                          selectedBadge === badge.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/40'
                        }`}
                      >
                        <p className="text-xl mb-0.5">{badge.emoji}</p>
                        <p className="text-xs font-medium leading-tight">{badge.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <Button
                  className="w-full"
                  disabled={!approval}
                  onClick={handleSubmit}
                >
                  フィードバックを送る
                </Button>
                {!approval && (
                  <p className="text-xs text-muted-foreground text-center">「はい/いいえ」を選択してください</p>
                )}
              </>
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}
