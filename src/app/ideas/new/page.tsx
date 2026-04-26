'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, Globe, Lock } from 'lucide-react'
import { Button } from '@/libs/shadcn/assets/ui/button'
import { Input } from '@/libs/shadcn/assets/ui/input'
import { Textarea } from '@/libs/shadcn/assets/ui/textarea'

function getUrgencyColor(val: number) {
  if (val >= 8) return { cls: 'text-red-600 border-red-200 bg-red-50', bar: 'bg-red-400', label: '緊急・切実' }
  if (val >= 4) return { cls: 'text-yellow-700 border-yellow-200 bg-yellow-50', bar: 'bg-yellow-400', label: '要注意' }
  return { cls: 'text-blue-600 border-blue-200 bg-blue-50', bar: 'bg-blue-400', label: '穏やか' }
}

const recentIdeas = [
  '冷蔵庫の中身からレシピを提案してほしい',
  '子どもの予定を家族全員で共有したい',
  '電車の遅延をリアルタイムで知りたい',
  '読んだ本の内容を忘れないようにしたい',
]

export default function NewIdeaPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [urgency, setUrgency] = useState(5)
  const [problem, setProblem] = useState('')
  const [solution, setSolution] = useState('')
  const [scene, setScene] = useState('')
  const [currentSolution, setCurrentSolution] = useState('')
  const [targetUser, setTargetUser] = useState('')
  const [details, setDetails] = useState([''])
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [isPublic, setIsPublic] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const isValid = title.trim().length > 0 && problem.trim().length > 0
  const urgencyStyle = getUrgencyColor(urgency)

  function addDetail() {
    if (details.length < 10) setDetails((prev) => [...prev, ''])
  }

  function updateDetail(i: number, value: string) {
    setDetails((prev) => prev.map((d, idx) => (idx === i ? value : d)))
  }

  function removeDetail(i: number) {
    setDetails((prev) => prev.filter((_, idx) => idx !== i))
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ' ') && tagInput.trim()) {
      e.preventDefault()
      const tag = tagInput.trim().startsWith('#') ? tagInput.trim() : `#${tagInput.trim()}`
      if (!tags.includes(tag)) setTags((prev) => [...prev, tag])
      setTagInput('')
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  function handleSubmit() {
    if (!isValid) return
    setSubmitted(true)
    setTimeout(() => {
      router.push('/ideas/1')
    }, 1500)
  }

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
      <div className="mb-8 text-center">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Post your Need</p>
        <h1 className="text-2xl font-bold">
          日常の「あったらいいな」を、ツイートするように投稿しよう
        </h1>
        <p className="text-sm text-muted-foreground mt-2">技術知識は不要。あなたの目線からしか気づけないことが、誰かの作品になる。</p>
      </div>

      {submitted && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm text-emerald-700">
          ✈️ 世界へポストされました！
        </div>
      )}

      <div className="flex gap-8">
        {/* Form */}
        <div className="flex-1 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              タイトルを磨こう！ <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="例：冷蔵庫の食材からレシピを提案してほしい"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 50))}
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">{title.length}/50</p>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium mb-1.5">困り度</label>
            <div className="flex items-center gap-4">
              <select
                className={`h-8 rounded-lg border px-2.5 text-sm font-medium outline-none ${urgencyStyle.cls}`}
                value={urgency}
                onChange={(e) => setUrgency(Number(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((v) => (
                  <option key={v} value={v} className="bg-card text-foreground">{v}</option>
                ))}
              </select>
              <span className={`text-sm font-medium ${urgencyStyle.cls.split(' ')[0]}`}>
                {urgencyStyle.label}
              </span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${urgencyStyle.bar}`}
                  style={{ width: `${urgency * 10}%` }}
                />
              </div>
            </div>
          </div>

          {/* Problem */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              どんな「あったらいいな」？ <span className="text-destructive">*</span>
            </label>
            <Textarea
              placeholder="「こんなのがあったらなあ」という気持ちを、そのまま書いてください。技術的な知識は不要です。"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Solution */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              こんな風に作れるかも
              <span className="text-muted-foreground font-normal text-xs ml-2">（未定・わからなくて全然OK）</span>
            </label>
            <Textarea
              placeholder="「こんなアプリがあれば」というイメージがあれば書いてください。なくても投稿できます。"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="min-h-20"
            />
          </div>

          {/* 言語化サポート：ガイド付き質問 */}
          <div className="space-y-4 border border-border rounded-xl p-4 bg-muted/20">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                アイデアを言語化しよう
                <span className="font-normal ml-2 normal-case">（答えられるものだけでOK）</span>
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">📍 いつ、どんな場面で？</label>
              <Input
                placeholder="例：毎朝通勤中に電車を待っているとき"
                value={scene}
                onChange={(e) => setScene(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">🔄 今はどうやって対処してる？</label>
              <Input
                placeholder="例：駅の掲示板を見るか、あきらめて待っている"
                value={currentSolution}
                onChange={(e) => setCurrentSolution(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">👥 自分以外にも困ってそうな人は？</label>
              <Input
                placeholder="例：毎日電車で通勤している人たち"
                value={targetUser}
                onChange={(e) => setTargetUser(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">💬 その他・追加で伝えたいこと</label>
              <div className="space-y-2">
                {details.map((d, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input
                      placeholder="自由に書いてください"
                      value={d}
                      onChange={(e) => updateDetail(i, e.target.value)}
                    />
                    {details.length > 1 && (
                      <button
                        onClick={() => removeDetail(i)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {details.length < 5 && (
                <button
                  onClick={addDetail}
                  className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="size-3.5" />
                  追加する
                </button>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1.5">タグ</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => removeTag(tag)}
                  className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground hover:bg-destructive/20 hover:text-destructive rounded-full px-2.5 py-1 transition-colors"
                >
                  {tag}
                  <X className="size-3" />
                </button>
              ))}
            </div>
            <Input
              placeholder="タグ入力後 Enter（例：仕事）"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
          </div>

          {/* 公開設定 */}
          <div>
            <label className="block text-sm font-medium mb-2">公開設定</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsPublic(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  isPublic
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                <Globe className="size-4" />
                公開
              </button>
              <button
                type="button"
                onClick={() => setIsPublic(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  !isPublic
                    ? 'border-slate-400 bg-slate-50 text-slate-600'
                    : 'border-border text-muted-foreground hover:border-slate-300'
                }`}
              >
                <Lock className="size-4" />
                非公開（自分だけ）
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              {isPublic
                ? 'Timelineに表示され、みんなが共感できます。'
                : 'プロフィールにのみ保存されます。あとから公開に変更できます。'}
            </p>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              className="w-full h-11 text-base"
              disabled={!isValid || submitted}
              onClick={handleSubmit}
            >
              {submitted ? '投稿中...' : (isPublic ? 'ポストする' : '非公開で保存する')}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              あなたの「あったらいいな」が、誰かを動かすかもしれない。
            </p>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="w-56 shrink-0">
          <div className="sticky top-20 space-y-4">
            <div className="border border-border rounded-xl p-4 bg-card">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">最近の投稿</p>
              <ul className="space-y-2">
                {recentIdeas.map((idea, i) => (
                  <li key={i} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer leading-snug">
                    {idea}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border rounded-xl p-4 bg-card">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">投稿のコツ</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>✅ 技術知識ゼロでOK</li>
                <li>✅ 具体的なシーンを書く</li>
                <li>✅ 「誰が」困っているか書く</li>
                <li>✅ 解決策は未定でも投稿できる</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
