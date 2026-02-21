---
id: how-we-differ
title: How We Differ
sidebar_label: How We Differ
---

# How We Differ

## CrossCall vs. Crosschain Messaging Protocols

Axelar, Hyperlane, CCIP, LayerZero, and similar infrastructure all share the same fundamental model:

> A user initiates a message on an **origin chain** → the message triggers a transaction on a **destination chain**.

This requires the user to have funds and gas on the origin chain, and it requires the destination-side execution to be pre-funded or subsidized separately.

**CrossCall does the opposite.**

Solvers in the CrossCall network execute transactions *directly on the destination chain*, from the signer's smart contract wallet — covering execution, validation, and gas costs upfront. The crosschain messaging layer (Hyperlane) is used exclusively for the solver's *payout*, not for the user's transaction.

---

## The Key Inversion

| | Standard Crosschain Messaging | CrossCall |
|---|---|---|
| **What crosses the chain?** | The user's transaction intent | The solver's payout |
| **Who fronts execution?** | User (must have funds on destination) | Solver (repaid atomically) |
| **Liquidity model** | Bridge pools or pre-funded contracts | Solver-user atomic P2P |
| **Bridge risk exposure** | User bears bridge risk | No bridge in the user's flow |
| **Speed** | Confirmation + bridge delay | Immediate (solver-fronted) |

---

## Structural Advantages

**Decentralized liquidity.** There are no bridge pools. Every execution is a direct atomic transaction between a solver and a user. The attack surface of a centralized pool simply doesn't exist.

**No destination chain requirement.** Users never need funds, gas tokens, or a wallet presence on the destination chain. From their perspective, they're executing on their native chain.

**Instant finality.** Because solvers front execution, users don't wait for crosschain confirmations. They see their transaction execute immediately.

**Protocol-agnostic.** CrossCall is generalized. Any protocol that can express calldata can use CrossCall — DEX aggregators, NFT marketplaces, bridges, lending protocols, and more.

---

## CrossCall's Relationship with Hyperlane

CrossCall is built *on top of* Hyperlane, not *in competition* with it. Hyperlane provides the authenticated crosschain messaging layer that makes solver payouts deterministic. Without Hyperlane, CrossCall would need its own validator network. With Hyperlane, it inherits a proven, decentralized message bus.

The CrossCall Paymaster integrates with the Hyperlane IGP (Interchain Gas Paymaster) to quote and pay for message delivery atomically within the solver's bundle — so the payout message is only submitted if the user's transaction actually executed.
