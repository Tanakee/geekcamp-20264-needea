'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/libs/shadcn/assets/ui/button'
import { Plus } from 'lucide-react'

const navItems = [
  { label: 'Marketplace', href: '/', exact: true },
  { label: 'Build-ers', href: '/builders', exact: false },
  { label: 'Profile', href: '/profile', exact: false },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-foreground">
          NEEDEA
        </Link>
        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium pb-1 transition-colors ${
                  isActive
                    ? 'border-b-2 border-primary text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
        <Link href="/ideas/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            ポストする
          </Button>
        </Link>
      </div>
    </nav>
  )
}
