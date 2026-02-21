---
id: bridging
title: Bridging
sidebar_label: Bridging
---

# Bridging

## The Problem with Bridges

Bridging is the dominant crosschain primitive today — and one of the most dangerous. Bridge exploits have resulted in over $2 billion in losses between 2020 and 2023, with more since.

Structurally, bridges create risk because:
- They concentrate liquidity in pool contracts — large targets for exploits
- They require users to trust the bridge operator's security model
- They introduce long confirmation delays
- They require users to hold native gas tokens on both chains

CrossCall doesn't replace bridges by building a better pool. It eliminates the pool entirely.

---

## How CrossCall Handles Bridging

CrossCall bridges are **atomic P2P transfers** between a solver and a user.

The execution flow for a bridge request is a simple asset transfer from the signer's SCW to their EOA on the destination chain:

```
// Bridge request calldata (native asset transfer)
// Transfers from signer's SCW → user's EOA on destination chain

0xb61d27f6
  000000000000000000000000[target_address]
  [amount_in_32_bytes]
  0000000000000000000000000000000000000000000000000000000000000000
  0006
  0000000000000000000000000000000000000000000000000000000000000000
  0000
```

The solver executes this on the destination chain. The solver is then paid from the user's escrow on the origin chain via Hyperlane — atomically.

---

## Risk Profile Comparison

| | Traditional Bridge | CrossCall |
|---|---|---|
| **Liquidity model** | Pooled (centralized target) | Per-transaction solver (P2P) |
| **User risk** | Bridge pool exploit, operator risk | Solver reorg risk (borne by solver, not user) |
| **Speed** | Minutes to hours | Immediate (solver-fronted) |
| **Native token required** | Yes, on both chains | No |
| **Confirmation required** | Yes | No |

With CrossCall, the risk of a bridge exploit shifts entirely. There is no pool. The solver bears the marginal execution risk, and the solver payout is cryptographically guaranteed. Users are not exposed to hack risk.

:::note Solver Reorg Risk
Solvers are theoretically exposed to chain reorg risk — a destination chain reorg could reverse a solver's execution after the Hyperlane payout has already settled. This risk is borne by the solver, not the user, and can be managed through solver-side reorg monitoring.
:::

---

## Protocol Integration

Protocols can offer CrossCall-powered bridging by composing a bridge request and submitting it to the CrossCall API. See the [CrossCall API reference →](#) for full request format details.
