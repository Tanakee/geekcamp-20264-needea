'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Node = {
  id: string
  x: number
  y: number
  r: number
  color: string
  count: number
  ideas: { id: string; title: string; wants: number }[]
}

type Edge = {
  source: string
  target: string
  weight: number
}

const nodes: Node[] = [
  {
    id: '#仕事', x: 340, y: 265, r: 38, color: '#6366f1', count: 5,
    ideas: [
      { id: '1', title: 'Excel作業を自動化したい', wants: 124 },
      { id: '3', title: '会議の議事録を自動生成したい', wants: 201 },
      { id: '6', title: '請求書の作成を自動化したい', wants: 189 },
      { id: '7', title: 'Slackの通知を整理してくれるAIがほしい', wants: 143 },
      { id: '8', title: '会議のアジェンダを自動で作ってほしい', wants: 97 },
    ],
  },
  {
    id: '#AI', x: 560, y: 195, r: 32, color: '#0ea5e9', count: 4,
    ideas: [
      { id: '3', title: '会議の議事録を自動生成したい', wants: 201 },
      { id: '7', title: 'Slackの通知を整理してくれるAIがほしい', wants: 143 },
      { id: '8', title: '会議のアジェンダを自動で作ってほしい', wants: 97 },
      { id: '9', title: '勉強の記録を自動でまとめてほしい', wants: 74 },
    ],
  },
  {
    id: '#学習', x: 595, y: 390, r: 26, color: '#10b981', count: 2,
    ideas: [
      { id: '2', title: 'TODOアプリよりもものを作りたい', wants: 56 },
      { id: '9', title: '勉強の記録を自動でまとめてほしい', wants: 74 },
    ],
  },
  {
    id: '#自動化', x: 195, y: 155, r: 26, color: '#6366f1', count: 2,
    ideas: [
      { id: '1', title: 'Excel作業を自動化したい', wants: 124 },
      { id: '6', title: '請求書の作成を自動化したい', wants: 189 },
    ],
  },
  {
    id: '#会議', x: 455, y: 95, r: 26, color: '#6366f1', count: 2,
    ideas: [
      { id: '3', title: '会議の議事録を自動生成したい', wants: 201 },
      { id: '8', title: '会議のアジェンダを自動で作ってほしい', wants: 97 },
    ],
  },
  {
    id: '#Excel', x: 95, y: 265, r: 20, color: '#6366f1', count: 1,
    ideas: [{ id: '1', title: 'Excel作業を自動化したい', wants: 124 }],
  },
  {
    id: '#経理', x: 175, y: 390, r: 20, color: '#6366f1', count: 1,
    ideas: [{ id: '6', title: '請求書の作成を自動化したい', wants: 189 }],
  },
  {
    id: '#通知', x: 685, y: 120, r: 20, color: '#0ea5e9', count: 1,
    ideas: [{ id: '7', title: 'Slackの通知を整理してくれるAIがほしい', wants: 143 }],
  },
  {
    id: '#ポートフォリオ', x: 730, y: 340, r: 20, color: '#10b981', count: 1,
    ideas: [{ id: '2', title: 'TODOアプリよりもものを作りたい', wants: 56 }],
  },
  {
    id: '#メモ', x: 695, y: 460, r: 20, color: '#10b981', count: 1,
    ideas: [{ id: '9', title: '勉強の記録を自動でまとめてほしい', wants: 74 }],
  },
  {
    id: '#通勤', x: 305, y: 460, r: 20, color: '#f59e0b', count: 1,
    ideas: [{ id: '5', title: '電車の遅延をリアルタイムで通知してほしい', wants: 312 }],
  },
  {
    id: '#交通', x: 130, y: 455, r: 20, color: '#f59e0b', count: 1,
    ideas: [{ id: '5', title: '電車の遅延をリアルタイムで通知してほしい', wants: 312 }],
  },
]

const edges: Edge[] = [
  { source: '#仕事', target: '#Excel', weight: 1 },
  { source: '#仕事', target: '#自動化', weight: 2 },
  { source: '#仕事', target: '#AI', weight: 3 },
  { source: '#仕事', target: '#会議', weight: 2 },
  { source: '#仕事', target: '#経理', weight: 1 },
  { source: '#仕事', target: '#通知', weight: 1 },
  { source: '#Excel', target: '#自動化', weight: 1 },
  { source: '#AI', target: '#会議', weight: 2 },
  { source: '#AI', target: '#通知', weight: 1 },
  { source: '#AI', target: '#学習', weight: 1 },
  { source: '#AI', target: '#メモ', weight: 1 },
  { source: '#学習', target: '#ポートフォリオ', weight: 1 },
  { source: '#学習', target: '#メモ', weight: 1 },
  { source: '#自動化', target: '#経理', weight: 1 },
  { source: '#通勤', target: '#交通', weight: 1 },
]

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))

export default function MindmapPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const active = hovered ?? selected

  function connectedIds(nodeId: string): string[] {
    return edges
      .filter((e) => e.source === nodeId || e.target === nodeId)
      .map((e) => (e.source === nodeId ? e.target : e.source))
  }

  function isConnected(nodeId: string) {
    if (!active) return true
    return nodeId === active || connectedIds(active).includes(nodeId)
  }

  function isEdgeActive(edge: Edge) {
    if (!active) return false
    return edge.source === active || edge.target === active
  }

  const selectedNode = selected ? nodeMap[selected] : null

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="size-4" />
        Marketplace へ戻る
      </Link>

      <div className="flex items-baseline gap-3 mb-5">
        <h1 className="text-xl font-bold border-l-2 border-primary pl-3">タグマップ</h1>
        <span className="text-xs text-muted-foreground">タグのつながりを可視化</span>
        <span className="text-xs text-primary/70 bg-primary/5 border border-primary/20 rounded-full px-2 py-0.5">試験的機能</span>
      </div>

      <div className="flex gap-6 items-start">
        {/* SVG */}
        <div className="flex-1 border border-border rounded-2xl bg-card overflow-hidden">
          <svg viewBox="0 0 800 530" className="w-full h-auto">
            {/* Edges */}
            {edges.map((edge, i) => {
              const s = nodeMap[edge.source]
              const t = nodeMap[edge.target]
              const edgeActive = isEdgeActive(edge)
              const dim = active !== null && !edgeActive
              // slight curve via quadratic bezier
              const mx = (s.x + t.x) / 2 + (t.y - s.y) * 0.1
              const my = (s.y + t.y) / 2 - (t.x - s.x) * 0.1
              return (
                <path
                  key={i}
                  d={`M ${s.x} ${s.y} Q ${mx} ${my} ${t.x} ${t.y}`}
                  fill="none"
                  stroke={edgeActive ? s.color : '#cbd5e1'}
                  strokeWidth={edgeActive ? edge.weight * 1.5 + 0.5 : 1}
                  strokeOpacity={dim ? 0.15 : edgeActive ? 0.6 : 0.35}
                  className="transition-all duration-150"
                />
              )
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const dim = active !== null && !isConnected(node.id)
              const sel = selected === node.id
              const hov = hovered === node.id
              return (
                <g
                  key={node.id}
                  onClick={() => setSelected(selected === node.id ? null : node.id)}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  {/* glow ring for selected */}
                  {sel && (
                    <circle
                      cx={node.x} cy={node.y} r={node.r + 8}
                      fill={node.color} fillOpacity={0.15}
                      stroke={node.color} strokeWidth={1.5} strokeOpacity={0.4}
                    />
                  )}
                  <circle
                    cx={node.x} cy={node.y}
                    r={hov && !sel ? node.r + 2 : node.r}
                    fill={sel ? node.color : node.color}
                    fillOpacity={dim ? 0.06 : sel ? 0.9 : 0.12}
                    stroke={node.color}
                    strokeWidth={sel ? 2 : 1.5}
                    strokeOpacity={dim ? 0.2 : 1}
                    className="transition-all duration-150"
                  />
                  <text
                    x={node.x} y={node.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={node.r >= 30 ? 13 : node.r >= 24 ? 11 : 10}
                    fontWeight={sel ? '700' : '500'}
                    fill={dim ? '#cbd5e1' : sel ? 'white' : node.color}
                    className="select-none pointer-events-none transition-all duration-150"
                  >
                    {node.id}
                  </text>
                  {node.count > 1 && (
                    <text
                      x={node.x + node.r - 1} y={node.y - node.r + 3}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize={8} fontWeight="700"
                      fill={dim ? '#e2e8f0' : node.color}
                      fillOpacity={dim ? 0.4 : 1}
                      className="select-none pointer-events-none"
                    >
                      {node.count}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Side panel */}
        <aside className="w-64 shrink-0 sticky top-20">
          {selectedNode ? (
            <div>
              <div className="mb-4 border-l-2 pl-3" style={{ borderColor: selectedNode.color }}>
                <p className="text-base font-bold" style={{ color: selectedNode.color }}>{selectedNode.id}</p>
                <p className="text-xs text-muted-foreground">{selectedNode.count}件のアイデア</p>
              </div>

              <div className="space-y-2 mb-5">
                {selectedNode.ideas
                  .sort((a, b) => b.wants - a.wants)
                  .map((idea) => (
                    <Link key={idea.id} href={`/ideas/${idea.id}`} className="block border border-border rounded-xl p-3 hover:border-primary/40 bg-card transition-colors group">
                      <p className="text-xs font-medium leading-snug mb-1 group-hover:text-primary transition-colors">{idea.title}</p>
                      <p className="text-xs text-primary font-medium">🔥 {idea.wants} Wants</p>
                    </Link>
                  ))}
              </div>

              {connectedIds(selectedNode.id).length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">つながっているタグ</p>
                  <div className="flex flex-wrap gap-1.5">
                    {connectedIds(selectedNode.id).map((tagId) => {
                      const n = nodeMap[tagId]
                      return (
                        <button
                          key={tagId}
                          onClick={() => setSelected(tagId)}
                          className="text-xs px-2 py-0.5 rounded-full border transition-colors hover:opacity-80"
                          style={{ color: n.color, borderColor: n.color + '50', backgroundColor: n.color + '12' }}
                        >
                          {tagId}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-2xl">
              <p className="text-3xl mb-3">🏷️</p>
              <p className="text-sm leading-relaxed">タグをクリックすると<br />関連アイデアが表示されます</p>
            </div>
          )}
        </aside>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span>凡例：</span>
        {[
          { color: '#6366f1', label: '仕事・業務' },
          { color: '#0ea5e9', label: 'AI・テック' },
          { color: '#10b981', label: '学習・スキル' },
          { color: '#f59e0b', label: '生活・交通' },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full inline-block" style={{ backgroundColor: l.color }} />
            {l.label}
          </span>
        ))}
        <span className="ml-auto">ノードの大きさ＝アイデア数　線の太さ＝共起の強さ</span>
      </div>
    </main>
  )
}
