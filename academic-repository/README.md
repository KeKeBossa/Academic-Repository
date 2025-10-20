# Academic Blockchain Repository

分散型の学術成果共有とDAOガバナンスを統合したMVPプラットフォームです。Polygonテストネット上のスマートコントラクト、Next.js (App Router) フロントエンド、Prisma + PostgreSQL を利用したバックエンドで構成します。

## プロジェクト構成

- `src/app` – Next.js App Router。`layout.tsx` と `providers.tsx` で Chakra UI / RainbowKit / wagmi を初期化。`page.tsx` はランディングヒーロー。
- `src/app/api` – DID認証、メンバー管理、提案、研究成果、通知向けのAPIルートのスキャフォールディング。
- `src/lib` – クライアントサイドの共有ライブラリ (`wagmi` 設定など)。
- `src/server/db` – Prisma クライアントのシングルトン初期化。
- `contracts` – LabRegistry / LabDAO / ArtifactRegistry / CredentialAnchor のベース実装。
- `ignition` / `scripts` – Hardhat のデプロイモジュールとスクリプト。
- `prisma` – `schema.prisma` にデータモデルを定義。`migrations/` は git ignore 済み。
- `plans.md` – 3ヶ月ロードマップとスプリント進捗トラッキング。

## 主要コマンド

| コマンド                          | 用途                                                                        |
| --------------------------------- | --------------------------------------------------------------------------- |
| `npm install`                     | 依存関係のインストール。`@coinbase/wallet-sdk@4.3.7` にオーバーライド済み。 |
| `npm run dev`                     | Next.js ローカル開発サーバー (Turbopack)。                                  |
| `npm run lint`                    | Next.js ESLint (App Router + TypeScript)。                                  |
| `npm run build` / `npm run start` | プロダクションビルド & サーバ起動。                                         |
| `npm run format`                  | Prettier で `src/`, `contracts/`, `prisma/` を整形。                        |
| `npm run format:check`            | Prettier フォーマットの検証のみを実行。                                     |
| `npm run compile`                 | Hardhat で Solidity コントラクトをコンパイル。                              |
| `npm run test`                    | Hardhat テストスイート。                                                    |
| `npm run prisma:generate`         | Prisma Client の生成。                                                      |
| `npm run prisma:migrate`          | Prisma Migrate (`DATABASE_URL` 要設定)。                                    |
| `npm run lint:staged`             | `lint-staged` を手動実行（Git hooks が未設定の場合に利用）。                |

## 環境変数

`.env.example` をコピーして `.env` を作成してください。

```bash
cp .env.example .env
```

重要な値：

- `DATABASE_URL` – PostgreSQL / Supabase 接続文字列。Prisma CLI と API で使用。
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` – WalletConnect V2 プロジェクトID。
- `NEXT_PUBLIC_POLYGON_AMOY_RPC_URL`, `NEXT_PUBLIC_SEPOLIA_RPC_URL` – wagmi/RainbowKit が利用するRPC。
- `SEPOLIA_RPC_URL`, `POLYGON_AMOY_RPC_URL` – Hardhat 外部ネットワーク接続。
- `SUPABASE_*` – 将来の通知/ストレージ連携用。

## API スキャフォールディング

App Router の API ルートは Prisma モデルと連動するダミー実装を提供します。

- `POST /api/auth/did` – DID/ウォレット署名準備用の nonce セッションを発行。
- `GET /api/session` – nonce で DID セッション状態を取得。
- `GET|POST /api/members` – DAO メンバー一覧/参加申請の更新。
- `POST /api/members/verify` – VC ステータスの更新。
- `GET|POST /api/proposals` – 提案一覧 / 提案作成。
- `POST /api/proposals/:id/vote` – 投票登録。
- `GET|POST /api/assets` – 研究成果一覧 / 登録。
- `GET /api/assets/:id` – 成果詳細。
- `POST /api/assets/:id/review` – レビューモデルの作成。
- `GET /api/notifications` / `POST /api/notifications/read` – 通知フェッチと既読化。

今後、署名検証やVCバリデーションロジックを差し替えるフックポイントとして利用します。

## Prisma モデル

`prisma/schema.prisma` には以下をカバーするモデルを定義しています。

- DID 認証 (`User`, `DidSession`, `Credential`)
- DAO ガバナンス (`Dao`, `DaoMembership`, `Proposal`, `Vote`)
- 研究成果管理 (`ResearchAsset`, `Review`)
- コラボレーション・通知 (`CollaborationPost`, `ActivityLog`, `Notification`)

Prisma 生成時に Postgres 配列や JSON を活用できるよう、PostgreSQL データソースを前提としています。

## 開発フローのヒント

1. `npm install` —— 初期インストール。Hardhat の `npx hardhat compile` 実行時に Solidity コンパイラのダウンロードが走ります。
2. `npm run prisma:generate` —— `DATABASE_URL` を設定した上で Prisma Client を生成。
3. `npm run dev` —— Next.js フロントエンド + API ルートをローカルで確認。
4. スマートコントラクトの変更後は `npm run compile` / `npm run test` を実行し `artifacts/` はコミット対象外です。

## Git Hooks

`core.hooksPath` を `academic-repository/.githooks` に設定し、`pre-commit` で `npm run lint:staged` が実行されるようにしました。設定が外れた場合はプロジェクト直下で `npm run setup:hooks`（権限によってはリポジトリルートで `git config core.hooksPath academic-repository/.githooks` を直接実行）すると復旧できます。権限的に `git config` が使えない環境では、コミット前に `npm run lint`, `npm run format:check`, `npx hardhat compile` を手動で実行してください。

## 今後の TODO

- VC 検証、SpruceID/Ceramic 連携の実装。
- Supabase Functions / Discord Webhook を利用した通知配信。
- Activity feed / ダッシュボード UI の構築。
- Hardhat Ignition モジュールを拡張し、LabDAO の Governor/TImelock を接続。
- CI/CD (GitHub Actions) と自動テスト整備。
