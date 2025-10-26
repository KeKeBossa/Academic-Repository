# Academic Blockchain Repository

分散型の学術成果共有とDAOガバナンスを統合したMVPプラットフォームです。Polygonテストネット上のスマートコントラクト、Next.js (App Router) フロントエンド、Prisma + PostgreSQL を利用したバックエンドで構成します。

## プロジェクト構成

- `src/app` – Next.js App Router。`layout.tsx` と `providers.tsx` で Tailwind 背景・RainbowKit・wagmi を初期化。`page.tsx` はヒーロー/機能/デモ各セクションを Tailwind UI で構成。
- `src/app/api` – DID認証、メンバー管理、提案、研究成果、通知向けのAPIルートのスキャフォールディング。
- `src/lib` – クライアントサイドの共有ライブラリ (`wagmi` 設定など)。
- `src/app/components` – DID 認証/研究資産/コラボ募集/通知/ダッシュボードの Tailwind コンポーネント群。
- `src/server/db` – Prisma クライアントのシングルトン初期化。
- `contracts` – LabRegistry / LabDAO / ArtifactRegistry / CredentialAnchor のベース実装。
- `ignition` / `scripts` – Hardhat のデプロイモジュールとスクリプト。
- `prisma` – `schema.prisma` にデータモデルを定義。`migrations/` は git ignore 済み。
- `plans.md` – 3ヶ月ロードマップとスプリント進捗トラッキング。

## 主要コマンド

| コマンド                          | 用途                                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm install`                     | 依存関係のインストール。`@coinbase/wallet-sdk@4.3.7` にオーバーライド済み。                           |
| `npm run dev`                     | Next.js ローカル開発サーバー (Turbopack)。                                                            |
| `npm run lint`                    | Next.js ESLint (App Router + TypeScript)。                                                            |
| `npm run build` / `npm run start` | プロダクションビルド & サーバ起動。                                                                   |
| `npm run format`                  | Prettier で `src/`, `contracts/`, `prisma/` を整形。                                                  |
| `npm run format:check`            | Prettier フォーマットの検証のみを実行。                                                               |
| `npm run compile`                 | Hardhat で Solidity コントラクトをコンパイル。                                                        |
| `npm run test`                    | Hardhat テストスイート。                                                                              |
| `npm run prisma:generate`         | Prisma Client の生成。                                                                                |
| `npm run prisma:migrate`          | Prisma Migrate (`DATABASE_URL` 要設定)。                                                              |
| `npm run db:start`                | Docker Compose で Postgres をバックグラウンド起動。                                                   |
| `npm run db:stop`                 | Postgres コンテナを停止しネットワークリソースを解放。                                                 |
| `npm run db:logs`                 | Postgres コンテナのログをフォロー表示。                                                               |
| `npm run lint:staged`             | `lint-staged` を手動実行（Git hooks が未設定の場合に利用）。                                          |
| `npm run verify:staging`          | 本番用環境変数を検証し、ステージング RPC とコントラクト配置をチェック。                               |
| `npm run data:sync`               | ArtifactRegistry の `ArtifactRegistered` イベントを取り込み ActivityLog を更新。                      |
| `npm run storacha:bootstrap`      | Storacha Space/鍵/委譲 UCAN を発行し `.env` や Secrets に反映（`--dry-run` でテスト用ダミーを生成）。 |
| `npm run storacha:secrets`        | 取得済み Storacha 資格情報を `.env`・GitHub・AWS Secrets Manager に流し込むユーティリティ。           |
| `npm run lint:security`           | ESLint Security プラグインで API/フロントをスキャン。                                                 |
| `npm run security:contracts`      | Docker 経由で Slither を実行しコントラクト静的解析（Docker 必須）。                                   |

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
- `STORACHA_PRINCIPAL` – Storacha (旧 Web3.Storage) w3up クライアントのシークレットキー。`w3 space create` 後に CLI で取得。未設定の場合はモックアップローダーがダミー CID (`mockcid-*`) を返し、`npm run build` が通るようフォールバックします。
- `STORACHA_PROOF` – 上記スペースから発行した UCAN デリゲーション文字列。Base64（1 行）形式で保存。
- `STORACHA_SPACE_DID` – データを書き込む Storacha スペース DID (`did:key:...`)。
- `STORACHA_UPLOAD_SERVICE_URL` – アップロード先サービス URL。デフォルトは `https://up.storacha.network`。
- `ARTIFACT_REGISTRY_ADDRESS` / `ARTIFACT_REGISTRY_PRIVATE_KEY` / `ARTIFACT_REGISTRY_RPC_URL` – ArtifactRegistry コントラクトへ登録するための署名者設定。
- `CREDENTIAL_ANCHOR_ADDRESS` / `CREDENTIAL_ANCHOR_RPC_URL` – オンチェーンクレデンシャル検証に利用する CredentialAnchor の読み取り設定。
- `GOVERNOR_TIMELOCK_DELAY` / `GOVERNOR_VOTING_DELAY_BLOCKS` / `GOVERNOR_VOTING_PERIOD_BLOCKS` / `GOVERNOR_PROPOSAL_THRESHOLD` / `GOVERNOR_QUORUM_FRACTION` – `scripts/deploy.ts` で利用するガバナンスパラメータ。
- `GOVERNANCE_DEFAULT_ADMINS` / `GOVERNANCE_DEFAULT_PROPOSERS` / `GOVERNANCE_DEFAULT_EXECUTORS` – Timelock にデフォルトで割り当てたいロールのアドレスリスト（カンマ区切り）。
- `VC_ENCRYPTION_SECRET` – VC メタデータを AES-GCM で暗号化するための共有シークレット。
- `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX` – `/api/auth/did/*`、`/api/assets`、`/api/collaboration/posts` に対するレート制限のウィンドウ＆最大リクエスト数。
- `EVENT_SYNC_FROM_BLOCK` – `npm run data:sync` の初回実行時に同期を開始するブロック番号（省略時は 0）。
- `STAGING_MODE` – `local` で Hardhat プロバイダーを利用した再デプロイ検証、`dry-run` で CLI / RPC を呼ばず形式チェックのみ実施。
- `SUPABASE_*` – 将来の通知/ストレージ連携用。
- `COLLABORATION_FILTER_DEFAULT_Q`, `COLLABORATION_FILTER_DEFAULT_SKILL`, `COLLABORATION_FILTER_DEFAULT_AUTHOR` – コラボレーションフィードのデフォルト検索条件。

## ローカルデータベース (Docker/Postgres)

- ルートの `docker-compose.yml` で Postgres 16 を定義し、`postgres` / `postgres` 認証と `academic_repository` データベースを自動作成します。
- データ永続化は `.docker/postgres/data` にマウントしており、Git には含めません。
- 初期化用の SQL / シェルスクリプトは `.docker/postgres/init/` に配置すると初回起動時に実行されます。
- 起動・停止は `npm run db:start` / `npm run db:stop`、ログ確認は `npm run db:logs` で行えます（いずれも Docker Desktop もしくは `docker` CLI が必要）。
- `.env` の `DATABASE_URL` が `postgresql://postgres:postgres@localhost:5432/academic_repository` となっていることを確認し、初回は `npm run prisma:migrate` でテーブルを適用してください。
- Prisma Studio やアプリケーションから接続する際は `localhost:5432` を利用します。別ポートに変更する場合は `docker-compose.yml` と `.env` を同時に更新してください。

## API スキャフォールディング

App Router の API ルートは Prisma モデルと連動するダミー実装を提供します。

- `POST /api/auth/did/challenge` – DID署名チャレンジ（SIWEメッセージ）を生成。
- `POST /api/auth/did/verify` – ウォレット署名を検証しセッショントークンを払い出し。
- `POST /api/auth/did/credentials` – Verifiable Credential の検証・保存。
- `GET /api/session` – nonce で DID セッション状態を取得。
- `GET|POST /api/members` – DAO メンバー一覧/参加申請の更新。
- `POST /api/members/verify` – VC ステータスの更新。
- `GET|POST /api/proposals` – 提案一覧 / 提案作成。
- `POST /api/proposals/:id/vote` – 投票登録。
- `POST /api/assets/upload` – Storacha (w3up) を利用した IPFS アップロード。

### Storacha (w3up) 設定ワークフロー

1. CLI をインストール：`npm install -g @storacha/cli` を実行し `storacha` コマンドを有効化します。
2. Space と署名鍵を準備：`storacha space create` で Space を作成し、`storacha key create --json` の `key` を `STORACHA_PRINCIPAL`、`did` を `STORACHA_SPACE_DID` に登録します。
3. アップロード権限を委譲：`storacha delegation create <Spaceにアクセスさせたいdid> -c space/blob/add -c space/index/add -c filecoin/offer -c upload/add --base64` の出力を `STORACHA_PROOF` として保存します（CI では `storacha space add $STORACHA_PROOF` を実行）。
4. `npm run storacha:bootstrap -- --env .env --json tmp/storacha.json --github-env staging` を使うと、Space/鍵/委譲の生成から Secrets 反映まで一括実行できます（CLI 利用が難しい環境は `--dry-run` を付与してダミー値を生成するか、`npm run storacha:secrets -- ...` で手動登録）。詳細は `docs/runbooks/storacha-cli.md` を参照。
5. Next.js/CI では上記 3 つの環境変数と任意で `STORACHA_UPLOAD_SERVICE_URL` を設定した上で API を呼び出してください。
6. 実環境の値を投入後は `npm run verify:staging:record` を実行し、`logs/verify-staging/` に検証ログを残しておくと監査や引き継ぎが容易です。

- `GET|POST /api/assets` – 研究成果一覧 / 登録。
- `GET /api/assets/:id` – 成果詳細。
- `POST /api/assets/:id/review` – レビューモデルの作成。
- `GET|POST /api/assets/:id/comments` – 成果に紐づくコメントの取得・投稿。
- `GET|POST /api/collaboration/posts` – コラボレーション募集の一覧・作成。
- `PATCH /api/collaboration/posts/:id` – 募集ステータスの更新。
- `GET /api/collaboration/posts?q=&skill=&authorId=` – DAO/キーワード/スキル/投稿者でフィードをフィルタ。
- `GET /api/daos` – DAO とメンバー/提案/資産のメタデータを取得。
- `GET /api/users` – DAO フィルタ付きでユーザーを検索。
- `GET /api/auth/did/credentials` – 検証済み VC を一覧取得。
- `GET /api/activity` – DAO 内の最新アクティビティを取得。
- `GET /api/notifications` / `POST /api/notifications/read` – 通知フェッチと既読化。
- `GET /api/metrics` – Prometheus 互換のメトリクスエクスポート。

今後、署名検証やVCバリデーションロジックを差し替えるフックポイントとして利用します。

### ステージング用シードデータ

`ensureSeedData()` を API レイヤーで呼び出すことで、DAO・メンバー・VC・研究資産のサンプルレコードが自動投入されます。`GOVERNANCE_DEFAULT_ADMINS` などを設定すると、シードのウォレット/DID がそのアドレスを基準に生成され、DID 認証/資産パネルが初期状態でも有意なレコードを表示します。

`npm run verify:staging` は `.env` の値を検証し、`STAGING_MODE=local` の場合は Hardhat ネットワークに対してガバナンス/レジストリ一式を再デプロイしてアドレスが一致することまで確認します。`STAGING_MODE=dry-run` に設定すると CLI や RPC を呼び出さず形式チェックのみに絞ることができます。

`npm run data:sync` を実行すると、`ArtifactRegistered` イベントを取得し `ActivityLog` にオンチェーン由来のレコードを追加します。`EVENT_SYNC_FROM_BLOCK` を利用して同期開始ブロックを調整してください。

### 本番デプロイチェックリスト

1. `.env.production` に以下を必ず設定する：
   - `VC_ENCRYPTION_SECRET`（32 文字以上を推奨）
   - `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX`（API 負荷に応じて調整）
   - コラボレーションフィード調整用に DAO ごとの `q` / `skill` / `authorId` クエリをアプリ設定やデプロイ先の環境変数で定義
   - ベースとなるテンプレートは `.env.production.template` を利用（本番値で上書き）
2. `ARTIFACT_REGISTRY_*` と `CREDENTIAL_ANCHOR_*` を本番アドレス・RPC に更新し、`npm run verify:staging` で整合性を確認。
3. デプロイ前に `npm run lint` / `npm run compile` / `npm run test` を必ず実行し、CI ワークフロー（`.github/workflows/ci.yml`）が成功することを確認。

### 監視・セキュリティ計画

- 監視指標と統合ロードマップは `docs/monitoring-plan.md` にまとめています。Prometheus/Supabase 統合、Grafana ダッシュボード、Slither/Eslint security を順次導入する計画です。

### セキュリティ

- VC メタデータは `VC_ENCRYPTION_SECRET` を用いた AES-256-GCM で暗号化され、API レスポンス時に復号されます。シークレット未設定時はエラーを返します。
- `/api/auth/did/*`、`/api/assets`、`/api/collaboration/posts` に対して IP ベースのレート制限（デフォルト 60 秒で 30 リクエスト）を適用しています。値は `RATE_LIMIT_WINDOW_MS` と `RATE_LIMIT_MAX` で調整してください。
- コラボレーションフィードは `q`（タイトル・本文）、`skill`（requiredSkills 配列）、`authorId`（投稿者）のフィルターを備えており、本番 DAO の要件に応じてクエリをカスタマイズできます。

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
- Web3Modal / WalletConnect の本番連携（現在はビルド時に API レスポンスをスタブして回避）。
- Hardhat Ignition モジュールを拡張し、LabDAO の Governor/TImelock を接続。
- CI/CD (GitHub Actions) と自動テスト整備。
