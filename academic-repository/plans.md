# Academic Blockchain Repository – Delivery Plan

Last updated: 2025-10-20 (Session 3)

## 1. Vision Snapshot

- Build a DAO-driven academic repository that enables wallet/DID based access, proposal governance, and verifiable research asset sharing across labs.
- Deliver an MVP within three months (by 2026-01-20) that satisfies the Functional Requirements (Auth, DAO, Assets, Collaboration, Admin) and Non-Functional Requirements outlined in the specification.
- Maintain a unified TypeScript stack (Next.js, Hardhat, Prisma) and ensure Polygon Amoy testnet compatibility.

## 2. Milestones & High-Level Scope

| Milestone                              | Target Date | Goals                                                                                        | Success Criteria                                                                                                                   |
| -------------------------------------- | ----------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **M0 – Foundation Setup**              | 2025-10-27  | Scaffold full-stack workspace, configure tooling, and stub core modules for rapid iteration. | Next.js + Tailwind + RainbowKit bootstrap, Hardhat workspace with base contracts, Prisma schema skeleton, CI lint/test jobs green. |
| **M1 – Auth & DAO Core**               | 2025-11-17  | Deliver wallet+DID session flow and deploy baseline LabRegistry/LabDAO smart contracts.      | Wallet connect & DID signature verification end-to-end, LabRegistry deploy script, DAO membership UI to review & approve members.  |
| **M2 – Research Assets & Governance**  | 2025-12-15  | Implement proposal lifecycle and IPFS-backed research asset workflows.                       | Proposal create/vote/execute flow, ArtifactRegistry integration, asset upload & review UI, Supabase metadata storage live.         |
| **M3 – Collaboration & Ops Readiness** | 2026-01-20  | Finalize collaboration tools, notifications, admin dashboards, and testing hardening.        | Collaboration posts, activity feed, notification channel, admin dashboards, automated test coverage & deployment docs ready.       |

## 3. Workstreams & Leads

- **Frontend (Next.js / UI)** – wallet auth, dashboards, UX, accessibility.
- **Smart Contracts (Hardhat)** – LabRegistry, LabDAO, ArtifactRegistry, CredentialAnchor.
- **Backend & Data (API/Prisma)** – DID verification APIs, Supabase integration, queue workers.
- **DevOps & QA** – CI/CD, environment configuration, testing/tools, security scans.

## 4. Current Iteration (Sprint 2025-10-20 → 2025-10-31)

| Area          | Task                                                                                                                     | Owner | Status  | Notes                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | ----- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| Tooling       | Initialize Next.js App Router project under `src/app` with Tailwind, RainbowKit, wagmi, Chakra UI, and base layout/page. | TBD   | ✅ Done | Layout, providers, and hero landing scaffolded with wallet connect UI.                                                |
| Tooling       | Set up Hardhat project with TypeScript support, OpenZeppelin dependencies, sample contracts, and scripts structure.      | TBD   | ✅ Done | Contracts skeleton + Hardhat config, ignition module, deploy script ready.                                            |
| Tooling       | Configure Prisma schema aligned with data model, connect to Supabase/Postgres via env vars, generate migrations.         | TBD   | ✅ Done | Prisma schema established, env template updated, client generated (`npx prisma generate`).                            |
| Tooling       | Add linting, formatting, and Husky/pre-commit (ESLint, Solhint optional) to enforce code quality.                        | TBD   | ✅ Done | `core.hooksPath` points to `.githooks/pre-commit` which runs `npm run lint:staged`; fallback instructions documented. |
| Tooling       | Verify toolchain via `npm install`, `npm run lint`, and `npx hardhat compile`.                                           | TBD   | ✅ Done | Dependency tree resolves with wallet-sdk override; lint & Hardhat compile succeed.                                    |
| Documentation | Draft README sections for setup, environment variables, and development commands.                                        | TBD   | ✅ Done | README.md covers architecture, commands, env vars, API scaffolding.                                                   |

Legend: ⏳ Not Started · 🔄 In Progress · ✅ Done

## 5. Upcoming Backlog (Sequenced)

1. Wallet DID Auth: implement signature challenge, session tokens, and VC verification APIs (F-Auth-1/2/3).
2. DAO Governance: finalize contracts, voting weight logic, proposal execution with timelock (F-DAO-1→F-DAO-4).
3. Research Assets: IPFS upload service, ArtifactRegistry registration, review/comment flows (F-Asset-1→F-Asset-3).
4. Collaboration Layer: recruitment posts, activity feed, notifications (F-Collab-1→F-Collab-3).
5. Administration & Monitoring: dashboards, logging, metrics (F-Admin-1/2).
6. Security Hardening: VC storage encryption, contract audits, rate limiting, static analysis.

## 6. Risks & Mitigations

- **VC Integration Complexity** – Engage SpruceID early; mock VC flows locally before live integration.
- **Blockchain Event Indexing** – Establish queue workers and event listeners during M1; consider The Graph as stretch.
- **IPFS Reliability** – Use web3.storage with redundancy, cache metadata in Supabase.
- **Timeline Creep** – Maintain backlog grooming, keep MVP scope tight, defer non-critical features.

## 7. Deliverable Tracking

- Plans.md to be updated at the end of each working session reflecting task status changes.
- Each milestone completion requires demo, test evidence, and documentation updates per repository guidelines.
