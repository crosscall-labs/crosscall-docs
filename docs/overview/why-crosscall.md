---
id: why-crosscall
title: Why CrossCall
sidebar_label: Why CrossCall
---

# Why CrossCall

## Two Infrastructure Problems

CrossCall was built to solve two compounding problems in the EVM (and non-EVM) ecosystem.

### 1. Protocol Scalability

When protocols expand to new blockchains, they inherit a brutal checklist:

- Redeploy all contracts on the new chain
- Spin up new backend infrastructure
- Bootstrap liquidity from zero
- Repeat for every chain they want to support

This is expensive, slow, and fundamentally doesn't scale. OpenSea operates on 10+ chains. Each new chain is not just a deployment — it's a full operational commitment. Smaller protocols simply can't afford to participate.

### 2. Bridge Dependency

For users, the current answer is bridging. Bridging is:

- **Slow** — confirmation times measured in minutes or hours
- **Risky** — over $2B lost to bridge exploits between 2020–2023 (and more since)
- **Operationally painful** — users need native gas tokens dripped from faucets to execute on new chains
- **Centralized** — pool-based bridges create concentrated attack surfaces

Neither protocols nor users have a good option today.

---

## The CrossCall Solution

CrossCall enables **native transaction execution on any destination blockchain** using existing protocol infrastructure.

**For protocols:** deploy once, execute anywhere. Users on any chain can interact with your protocol on your native chain without you lifting a finger.

**For users:** sign once, execute instantly. No bridging, no gas faucets, no waiting. Funds don't need to touch the destination chain.

CrossCall facilitates crosschain transactions:

- **Instantaneously** — solver-fronted execution with no confirmation delay
- **Atomically** — the entire sequence succeeds or fully reverts; no partial state
- **Peer-to-peer** — no bridge pools, no centralized intermediaries

---

## The Mechanism in Brief

CrossCall achieves this by separating *intent* from *execution*:

1. Users lock funds in an **Escrow** contract on their origin chain and sign a call intent.
2. **Solvers** monitor the CrossCall mempool, front the liquidity, and execute natively on the destination chain.
3. The **CrossCall Paymaster** uses Hyperlane to deterministically pay the solver from the user's escrow — atomically with the execution.

The solver is the liquidity provider. The Hyperlane message is the payment rail. The escrow is the trust guarantee.

No bridges. No wrapped tokens. No pre-funded wallets.
