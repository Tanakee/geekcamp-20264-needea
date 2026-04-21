# ニーディア (Needea)

不平不満を資産に変え、開発の「種」を絶やさないエコシステム。

詳細な企画内容は [requirements.md](./requirements.md) を参照してください。

## 技術スタック

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend/BaaS:** Supabase
- **Deployment:** Vercel

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/Tanakee/geekcamp-20264-needea.git
cd geekcamp-20264-needea

# 依存パッケージをインストール
npm install

# 環境変数を設定（.env.exampleをコピーして編集）
cp .env.example .env.local

# 開発サーバーを起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いて動作確認してください。

## 開発コマンド

```bash
npm run dev    # 開発サーバー起動
npm run build  # プロダクションビルド
npm run lint   # ESLintチェック
```

## ブランチ運用

| ブランチ | 用途 |
|----------|------|
| `main` | 本番環境 |
| `develop` | 開発統合ブランチ |
| `feature/*` | 機能開発 |

作業は `feature/xxx` ブランチを切って開発し、`develop` へPRを出してください。
