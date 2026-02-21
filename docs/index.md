---
id: index
slug: /
title: CrossCall Protocol
sidebar_label: Introduction
---

# CrossCall Protocol

CrossCall is a generalized **crosschain P2P execution layer** built on top of Hyperlane. It enables protocols and users to execute transactions natively on any destination blockchain — without bridges, without wrapped assets, and without pre-funded wallets on the destination chain.

---

## The Problem

Every multichain protocol today faces the same two walls:

**Protocol scalability.** Expanding to a new chain means redeployment, new infrastructure, and bootstrapping fresh liquidity from scratch. This is expensive, slow, and doesn't scale.

**Bridge dependency.** Bridges are the only alternative — and they're slow, risky, and require users to hold native gas tokens on every chain they want to use. Billions have been lost to bridge exploits.

---

## The CrossCall Answer

CrossCall flips the model. Instead of moving user funds to the destination chain, CrossCall sends *execution* to the destination chain, funded by a network of solvers.

| Traditional Flow | CrossCall Flow |
|---|---|
| User bridges funds → waits → executes | User signs intent → solver executes immediately |
| User needs gas token on destination | User needs nothing on destination chain |
| Bridge pool is a centralized hack target | Execution is atomic and peer-to-peer |
| Protocol redeploys per chain | Protocol uses existing infra on any chain |

---

## How It Works (in 30 seconds)

1. A user signs a **call intent** — what they want to do, on which chain, and how much they're willing to pay.
2. A **solver** picks up the intent, fronts the liquidity, and executes the transaction natively on the destination chain.
3. The **CrossCall Paymaster** deterministically pays out the solver from the user's locked funds via Hyperlane — atomically, with no trust required.

The whole flow is atomic. If any step fails, nothing settles.

---

## Where to Start

- **[Why CrossCall →](/overview/why-crosscall)** — the full problem statement and our approach
- **[Architecture →](/overview/architecture)** — system components and how they interact
- **[Call Abstraction Protocol →](/protocol/call-abstraction)** — the distilled protocol powering CrossCall
- **[Use Cases →](/use-cases/overview)** — bridging, DEX aggregation, multichain marketplaces, and more
