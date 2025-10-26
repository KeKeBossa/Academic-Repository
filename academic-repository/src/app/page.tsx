'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import ActivityFeedPanel from './components/ActivityFeedPanel';
import AdminDashboardPanel from './components/AdminDashboardPanel';
import AssetWorkflowPanel from './components/AssetWorkflowPanel';
import CollaborationPanel from './components/CollaborationPanel';
import DidAuthPanel from './components/DidAuthPanel';
import NotificationsPanel from './components/NotificationsPanel';

const features = [
  {
    title: 'ウォレット & DID 認証',
    description:
      'MetaMask などのウォレット接続と DID 署名でアクセスを制御し、学生証 VC で資格を証明します。'
  },
  {
    title: 'DAO ガバナンス',
    description:
      '提案〜投票〜実行までを一元管理し、役割に応じた投票重みとタイムロックを備えた意思決定を実現。'
  },
  {
    title: '研究資産の共有',
    description:
      'IPFS に保管した論文やデータを CID で追跡し、DAO メンバーによるレビューとコメントを促します。'
  },
  {
    title: '共同研究の促進',
    description:
      '募集掲示板とアクティビティフィードが最新の研究トピックを可視化し、ラボ間連携を加速します。'
  }
];

const checkpoints = [
  { label: '接続可能ウォレット', value: 'EVM × Solana' },
  { label: '対応 VC', value: '学生証 / 研究者証' },
  { label: 'データ保持', value: 'IPFS + Supabase' }
];

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18)_0%,_rgba(15,23,42,0)_70%)]" />
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
                Academic DAO Platform
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl">
                学術成果を DAO ガバナンスで加速させる分散型リポジトリ
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                ウォレット連携と Verifiable Credential
                で信頼性を担保し、研究成果の登録からレビュー、共同研究募集までを 1
                つの画面で運用できます。Polygon Amoy 互換のスマートコントラクトと Tailwind ベースの
                Next.js UI で、研究拠点間の連携をセキュアに支援します。
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <ConnectButton label="ウォレットを接続" />
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-600/70 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-400/80 hover:bg-slate-800/70"
                >
                  プロダクト概要を見る
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {checkpoints.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-3 text-sm text-slate-200"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base font-semibold text-indigo-200">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6 shadow-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  ハイライト
                </p>
                <ul className="mt-4 space-y-4 text-sm text-slate-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                    DID 認証、IPFS 連携、DAO 投票、募集掲示板までの MVP コンポーネントを搭載。
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                    Tailwind + RainbowKit に移行し、Chakra 依存を排除した軽量 UI 基盤。
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                    Hardhat / Prisma / Supabase の統一 TypeScript スタックでスムーズな開発体験。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-slate-800/60 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16">
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6 shadow-sm transition hover:border-indigo-500/40 hover:bg-slate-900/70"
              >
                <p className="text-sm font-semibold text-indigo-200">{feature.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-16 px-6 pb-24 pt-12">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300/80">
              Authentication
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">DID 認証デモ</h2>
            <p className="mt-2 text-sm text-slate-400">
              ウォレット署名から VC 検証までのフローを UI 上で確認できます。
            </p>
          </div>
          <DidAuthPanel />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
              Assets
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">研究資産ワークフロー</h2>
            <p className="mt-2 text-sm text-slate-400">
              IPFS アップロード、DAO 紐付け、レビューの登録をシナリオ形式で操作できます。
            </p>
          </div>
          <AssetWorkflowPanel />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
              Collaboration
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">共同研究募集</h2>
            <p className="mt-2 text-sm text-slate-400">
              募集投稿の作成、スキルフィルター、ステータス管理を UI で体験できます。
            </p>
          </div>
          <CollaborationPanel />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/80">
              Activity
            </p>
            <ActivityFeedPanel />
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300/80">
              Alerts
            </p>
            <NotificationsPanel />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300/80">
              Operations
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">管理ダッシュボード</h2>
            <p className="mt-2 text-sm text-slate-400">
              提案・研究資産・募集投稿などのメトリクスを集約し、最新のアクティビティをモニタリングします。
            </p>
          </div>
          <AdminDashboardPanel />
        </div>
      </section>
    </main>
  );
}
