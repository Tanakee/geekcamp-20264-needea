'use client'

import { useState, useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send } from 'lucide-react'
import { Button } from '@/libs/shadcn/assets/ui/button'
import { Input } from '@/libs/shadcn/assets/ui/input'

const mockIdeas: Record<string, { title: string; wants: number; authorName: string; authorInitials: string; authorColor: string }> = {
  '1': { title: 'Excel作業を自動化したい', wants: 124, authorName: 'Tanaka', authorInitials: 'T', authorColor: 'bg-violet-500' },
  '3': { title: '会議の議事録を自動生成したい', wants: 201, authorName: 'Yamada', authorInitials: 'Y', authorColor: 'bg-emerald-500' },
  '5': { title: '電車の遅延をリアルタイムで通知してほしい', wants: 312, authorName: 'Ito', authorInitials: 'I', authorColor: 'bg-orange-500' },
}

type Message = {
  id: string
  sender: 'me' | 'them'
  text: string
  time: string
}

const mockMessages: Message[] = [
  { id: '1', sender: 'them', text: 'はじめまして！このアイデアに興味があります。どんな形式のExcelファイルを想定していますか？', time: '14:20' },
  { id: '2', sender: 'me', text: '毎月各部署から送られてくる売上報告書（.xlsx）です。フォーマットは統一されていますが、シート数が多くて…', time: '14:23' },
  { id: '3', sender: 'them', text: 'なるほど！Pythonのopenpyxlで読み込んで、pandasで集計するアプローチが良さそうです。週末に試作してみますね。', time: '14:25' },
  { id: '4', sender: 'me', text: 'ありがとうございます！グラフ出力もできると最高です。よろしくお願いします🙏', time: '14:27' },
]

export default function MessagePage() {
  const params = useParams<{ id: string }>()
  const idea = mockIdeas[params.id] ?? mockIdeas['1']

  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage() {
    if (!input.trim()) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), sender: 'me', text: input.trim(), time },
    ])
    setInput('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 flex flex-col" style={{ height: 'calc(100vh - 56px)' }}>
      <Link href={`/ideas/${params.id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="size-4" />
        アイデア詳細へ戻る
      </Link>

      {/* Header */}
      <div className="border border-border rounded-xl p-4 bg-card mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`size-9 rounded-full flex items-center justify-center text-sm font-bold text-white ${idea.authorColor}`}>
            {idea.authorInitials}
          </div>
          <div>
            <p className="text-sm font-semibold">{idea.authorName} さんにメッセージを送る</p>
            <p className="text-xs text-muted-foreground truncate max-w-xs">アイデア: {idea.title}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">🔥 {idea.wants}</p>
          <p className="text-xs text-muted-foreground">Wants</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {msg.sender === 'them' && (
              <div className={`size-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${idea.authorColor}`}>
                {idea.authorInitials}
              </div>
            )}
            <div
              className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'me'
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-card border border-border rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{msg.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="メッセージを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={!input.trim()}>
          <Send className="size-4" />
          <span className="ml-1.5">送信する</span>
        </Button>
      </div>
    </main>
  )
}
