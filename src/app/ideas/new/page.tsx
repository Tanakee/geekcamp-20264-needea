'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import { Button } from '@/libs/shadcn/assets/ui/button'
import { Input } from '@/libs/shadcn/assets/ui/input'
import { Textarea } from '@/libs/shadcn/assets/ui/textarea'

function getUrgencyColor(val: number) {
  if (val >= 8) return { cls: 'text-red-400 border-red-700 bg-red-950', bar: 'bg-red-500', label: '緊急・切実' }
  if (val >= 4) return { cls: 'text-yellow-400 border-yellow-700 bg-yellow-950', bar: 'bg-yellow-500', label: '要注意' }
  return { cls: 'text-blue-400 border-blue-700 bg-blue-950', bar: 'bg-blue-500', label: '穏やか' }
}

const recentIdeas = [
  'Excelの集計を自動化したい',
  '会議の議事録を自動生成したい',
  '電車の遅延をリアルタイムで通知してほしい',
  '冷蔵庫の中身からレシピを提案してほしい',
]

export default function NewIdeaPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [urgency, setUrgency] = useState(5)
  const [problem, setProblem] = useState('')
  const [solution, setSolution] = useState('')
  const [details, setDetails] = useState(['', ''])
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
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
          日常の『あったらいいな』を世界へポストする
        </h1>
      </div>

      {submitted && (
        <div className="mb-6 rounded-xl border border-emerald-700 bg-emerald-950 p-4 text-center text-sm text-emerald-300">
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
              placeholder="例：Excelの集計を自動化したい"
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
              日常の不満（Problem） <span className="text-destructive">*</span>
            </label>
            <Textarea
              placeholder="「こんなのがあったらなあ」という理想と、現状の不満を書いてください。"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Solution */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              解決策のProposal
              <span className="text-muted-foreground font-normal text-xs ml-2">（もしくはSolution — 未定でも可）</span>
            </label>
            <Textarea
              placeholder="理想の解決策のイメージがあれば書いてください。わからなくても大丈夫です。"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="min-h-20"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium mb-1">具体的な内容</label>
            <p className="text-xs text-muted-foreground mb-2">書けば書くほど解決される確率が上がります</p>
            <div className="space-y-2">
              {details.map((d, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <span className="text-xs text-muted-foreground w-5 shrink-0">{i + 1}.</span>
                  <Input
                    placeholder={`具体例 ${i + 1}`}
                    value={d}
                    onChange={(e) => updateDetail(i, e.target.value)}
                  />
                  {details.length > 2 && (
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
            {details.length < 10 && (
              <button
                onClick={addDetail}
                className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="size-3.5" />
                項目を追加
              </button>
            )}
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

          {/* Submit */}
          <div className="pt-2">
            <Button
              className="w-full h-11 text-base"
              disabled={!isValid || submitted}
              onClick={handleSubmit}
            >
              {submitted ? '投稿中...' : 'ポストする'}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              あなたのアイデアが何人の「欲しい！」を集めるか？
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
                <li>✅ 具体的なシーンを書く</li>
                <li>✅ 「誰が」困っているか明記</li>
                <li>✅ タグで技術スタックを示す</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
