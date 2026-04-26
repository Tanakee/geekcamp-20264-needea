'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, ExternalLink, GitBranch } from 'lucide-react'
import { Button } from '@/libs/shadcn/assets/ui/button'
import { Badge } from '@/libs/shadcn/assets/ui/badge'
import { Input } from '@/libs/shadcn/assets/ui/input'
import { Textarea } from '@/libs/shadcn/assets/ui/textarea'

type Status = '募集中' | '開発中' | '作品あり'

const mockIdeas: Record<string, {
  id: string
  title: string
  author: string
  authorInitials: string
  authorColor: string
  urgency: number
  coreProblem: string
  solution: string
  examples: string[]
  techStack: string[]
  tags: string[]
  wants: number
  solvers: number
  status: Status
  workUrl?: string
}> = {
  '1': {
    id: '1',
    title: 'Excel作業を自動化したい',
    author: 'Tanaka',
    authorInitials: 'T',
    authorColor: 'bg-violet-500',
    urgency: 7,
    coreProblem: '毎月末に数十枚のExcelシートを手作業で集計しなければならず、ミスが頻発しています。自動で集計・グラフ化してくれるツールがあれば業務効率が大幅に改善されます。',
    solution: 'CSVまたはExcelファイルをアップロードすると、自動で集計してグラフ付きのレポートを生成してくれるWebアプリがあれば解決できると思います。',
    examples: [
      '部署ごとの売上データを毎月手動でコピペしている',
      '集計ミスが原因で月次報告が遅れることがある',
      'Excelのマクロを組もうとしたが知識がなくて挫折した',
    ],
    techStack: ['Python', 'VBA', 'pandas', 'Excel API', 'AI連携'],
    tags: ['#仕事', '#Excel', '#自動化'],
    wants: 124,
    solvers: 3,
    status: '開発中',
  },
  '2': {
    id: '2',
    title: 'TODOアプリよりもものを作りたい',
    author: 'Sato',
    authorInitials: 'S',
    authorColor: 'bg-blue-500',
    urgency: 5,
    coreProblem: '技術学習のためにアプリを作ろうとすると、いつも「TODOアプリ」に行き着いてしまう。実際に誰かの役に立つものを作りたい。',
    solution: '',
    examples: [
      '何を作ればいいか思いつかない',
      'ポートフォリオに載せられる実用的なものを作りたい',
    ],
    techStack: ['Next.js', 'TypeScript'],
    tags: ['#学習', '#ポートフォリオ'],
    wants: 56,
    solvers: 1,
    status: '募集中',
  },
  '3': {
    id: '3',
    title: '会議の議事録を自動生成したい',
    author: 'Yamada',
    authorInitials: 'Y',
    authorColor: 'bg-emerald-500',
    urgency: 9,
    coreProblem: '会議中に議事録を取りながら発言するのは非常に難しく、どちらかが疎かになってしまいます。音声を録音してAIが自動で議事録を生成してくれたら、会議に集中できます。',
    solution: 'Whisper等の音声認識APIで文字起こしし、GPTで要約・アクションアイテム抽出まで自動化できると理想です。',
    examples: [
      '議事録作成に毎回30分以上かかる',
      '発言者が誰かを記録しきれない',
      'Action itemの漏れが多発している',
    ],
    techStack: ['Whisper', 'GPT-4', 'Python', 'FastAPI'],
    tags: ['#仕事', '#AI', '#会議'],
    wants: 201,
    solvers: 5,
    status: '開発中',
  },
  '5': {
    id: '5',
    title: '電車の遅延をリアルタイムで通知してほしい',
    author: 'Ito',
    authorInitials: 'I',
    authorColor: 'bg-orange-500',
    urgency: 6,
    coreProblem: '毎朝通勤中に電車が遅延していても気づかず、ホームで長時間待つことになります。',
    solution: '',
    examples: ['ホームで10分以上待つことが週3回はある'],
    techStack: ['Node.js', 'Push通知', 'API'],
    tags: ['#通勤', '#交通'],
    wants: 312,
    solvers: 2,
    status: '作品あり',
    workUrl: 'https://github.com/example/train-delay-notifier',
  },
}

const mockComments = [
  { id: '1', author: 'dev_taro', initials: 'D', text: 'PythonのopenpyxlとFastAPIで実装できそうです！週末に試作してみます。', color: 'bg-violet-500' },
  { id: '2', author: 'hacker_ai', initials: 'H', text: 'Google SheetsのAPI経由でもできますね。クラウドで動かせると便利かも。', color: 'bg-blue-500' },
]

const statusStyle: Record<Status, string> = {
  '募集中': 'bg-slate-100 text-slate-600',
  '開発中': 'bg-blue-50 text-blue-600',
  '作品あり': 'bg-emerald-50 text-emerald-600',
}

function getUrgencyColor(val: number) {
  if (val >= 8) return { bar: 'bg-red-500', text: 'text-red-400', label: '非常に切実' }
  if (val >= 4) return { bar: 'bg-yellow-500', text: 'text-yellow-400', label: '困っている' }
  return { bar: 'bg-blue-500', text: 'text-blue-400', label: '少し不便' }
}

export default function IdeaDetailPage() {
  const params = useParams<{ id: string }>()
  const idea = mockIdeas[params.id] ?? mockIdeas['1']

  const [wants, setWants] = useState(idea.wants)
  const [solvers, setSolvers] = useState(idea.solvers)
  const [liked, setLiked] = useState(false)
  const [solved, setSolved] = useState(idea.status === '作品あり')
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState(idea.tags)

  const urgency = getUrgencyColor(idea.urgency)

  function handleLike() {
    setLiked((prev) => !prev)
    setWants((prev) => (liked ? prev - 1 : prev + 1))
  }

  function handleSolve() {
    if (!solved) {
      setSolved(true)
      setSolvers((prev) => prev + 1)
    }
  }

  function handleComment() {
    if (!newComment.trim()) return
    setComments((prev) => [
      ...prev,
      { id: String(Date.now()), author: 'you', initials: 'Y', text: newComment.trim(), color: 'bg-emerald-500' },
    ])
    setNewComment('')
  }

  function handleTagAdd(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && tagInput.trim()) {
      const tag = tagInput.trim().startsWith('#') ? tagInput.trim() : `#${tagInput.trim()}`
      if (!tags.includes(tag)) setTags((prev) => [...prev, tag])
      setTagInput('')
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="size-4" />
        Marketplace へ戻る
      </Link>

      <p className="text-xs text-muted-foreground mb-1">NEEDEA / アイデア詳細</p>

      <div className="flex gap-6">
        {/* Left */}
        <div className="flex-1 min-w-0 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[idea.status]}`}>
                {idea.status}
              </span>
            </div>
            <h1 className="text-2xl font-bold leading-snug mb-4">{idea.title}</h1>
            <div className="flex items-center gap-3 mb-5">
              <div className={`size-9 rounded-full flex items-center justify-center text-sm font-bold text-white ${idea.authorColor}`}>
                {idea.authorInitials}
              </div>
              <span className="text-sm font-medium text-muted-foreground">@{idea.author}</span>
            </div>

            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">困り度</span>
              <span className={`text-sm font-bold ${urgency.text}`}>{idea.urgency}/10</span>
              <span className={`text-xs ${urgency.text}`}>（{urgency.label}）</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${urgency.bar}`}
                style={{ width: `${idea.urgency * 10}%` }}
              />
            </div>
          </div>

          {/* Problem */}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
              なぜ苦しているか（Problem / Needs）
            </h2>
            <div className="border border-border rounded-xl p-4 bg-muted/20 text-sm leading-relaxed">
              {idea.coreProblem}
            </div>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
              こんな風に作れるかも
            </h2>
            <div className="border border-border rounded-xl p-4 bg-muted/20 text-sm leading-relaxed text-muted-foreground">
              {idea.solution || '（アイデア未定 — 作る人のインスピレーションにお任せ！）'}
            </div>
            {idea.workUrl && (
              <a
                href={idea.workUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <GitBranch className="size-3.5" />
                作品を見る
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>

          {/* Examples */}
          {idea.examples.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">具体例</h2>
              <ul className="space-y-2">
                {idea.examples.map((ex, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Comments */}
          <div>
            <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">コメント</h2>
            <div className="space-y-3 mb-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white ${c.color}`}>
                    {c.initials}
                  </div>
                  <div className="flex-1 border border-border rounded-xl p-3 bg-muted/20">
                    <p className="text-xs text-muted-foreground mb-1">@{c.author}</p>
                    <p className="text-sm">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="コメントを入力..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-0 h-10 resize-none py-2"
              />
              <Button size="icon" onClick={handleComment}>
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Build Panel */}
        <aside className="w-56 shrink-0">
          <div className="sticky top-20 space-y-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">このアイデアに共感したら</p>

            {/* Wants counter */}
            <div className="border border-border rounded-xl p-4 bg-card text-center">
              <p className="text-xs text-muted-foreground mb-1">共感した人の数</p>
              <p className="text-4xl font-bold text-primary">🔥 {wants}</p>
              <p className="text-sm text-muted-foreground mb-3">Wants</p>
              <Button
                className="w-full"
                variant={liked ? 'default' : 'outline'}
                onClick={handleLike}
              >
                {liked ? '✓ 共感した！' : '欲しい！ 共感する'}
              </Button>
            </div>

            {/* Solve this! */}
            <div className="border border-border rounded-xl p-4 bg-card">
              <p className="text-xs text-muted-foreground mb-1">このアイデアで作っている人</p>
              <p className="text-xl font-bold mb-3">{solvers}人</p>
              <Button
                className="w-full mb-2"
                variant={solved ? 'secondary' : 'default'}
                onClick={handleSolve}
                disabled={solved}
              >
                {solved ? '制作中 ✓' : 'このアイデアで作る！'}
              </Button>
              <Link href={`/messages/${idea.id}`} className="block">
                <Button variant="outline" className="w-full" size="sm">
                  💬 メッセージを送る
                </Button>
              </Link>
            </div>

            {/* Feedback (解決済みのみ) */}
            {idea.status === '作品あり' && (
              <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50">
                <p className="text-xs text-emerald-700 font-semibold mb-2">✓ 作品あり</p>
                <Link href={`/ideas/${idea.id}/solutions`} className="block">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white" size="sm">
                    作品を見てみる
                  </Button>
                </Link>
              </div>
            )}

            {/* Tech Stack */}
            <div className="border border-border rounded-xl p-4 bg-card">
              <h3 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">必要な技術スタック</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {idea.techStack.map((tech) => (
                  <span key={tech} className="text-xs bg-muted text-muted-foreground rounded-md px-2 py-0.5">
                    {tech}
                  </span>
                ))}
              </div>
              <h3 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">タグ</h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => removeTag(tag)}
                    className="inline-flex items-center gap-1 text-xs bg-muted hover:bg-destructive/20 hover:text-destructive rounded-full px-2 py-0.5 transition-colors"
                  >
                    {tag}
                    <span className="text-[10px]">×</span>
                  </button>
                ))}
              </div>
              <Input
                placeholder="タグを追加..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                className="h-7 text-xs"
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
