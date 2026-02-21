---
id: architecture
title: System Architecture
sidebar_label: Architecture
---

# System Architecture

CrossCall is a multilayered protocol. This page walks through each component in execution order — from the moment a user signs an intent to the moment a solver is paid.

---

## Component Overview

| Component | Role |
|---|---|
| **CrossCall API** | Protocol-facing entry point; simulates transactions, returns costs and userops |
| **CrossCall Client** | Validates lock requests and userops; merges confirmed blobs into the mempool |
| **CrossCall Mempool** | Private mempool holding executable blobs for solvers |
| **CrossCall Paymaster** | ERC-4337 paymaster that deterministically routes solver payment via Hyperlane |
| **Hyperlane Mailbox** | Crosschain message bus — sends solver payout instruction from destination → origin |
| **Hyperlane IGP** | Interchain Gas Paymaster; quotes and collects gas cost for Hyperlane messages |
| **User Escrow** | Per-user create2 contract; holds locked funds and executes solver payout on receipt |

---

## Step 1 — Protocol Interaction: API

A protocol (bridge, DEX aggregator, marketplace) composes a transaction and sends it to the CrossCall API. The protocol specifies:

- Transaction calldata
- Target address and destination chain
- Signer identity
- Execution cost requirements

The CrossCall API runs a simulation on the would-be transaction and returns:

- Estimated validation cost
- Estimated execution cost
- Suggested solver bid
- Base gas fee
- A **lock request** (asking the signer to lock funds in their Escrow)
- A **userop** for the signer to sign

The signer signs both and submits them back to the CrossCall API, which forwards the blob to the CrossCall Client.

---

## Step 2 — Validation: Client

The CrossCall Client validates the incoming blob before admitting it to the mempool. It performs two checks that distinguish it from a standard ERC-4337 bundler:

1. **Lock request validation** — the lock request is executed against an RPC for the origin chain to confirm funds are actually locked.
2. **Userop simulation** — the userop is validated in an environment where execution cost and paymaster calls are treated as pre-userop. This means the simulation accounts for the solver fronting Hyperlane costs to the CrossCall Paymaster and to the signer's smart contract wallet (SCW).

Once the lock amount, lock deadline, and userop all pass validation, the full message — lock info, calldata, execution cost — is merged into the CrossCall Mempool.

---

## Step 3 — Solver Execution: Mempool

Solvers monitor the CrossCall Mempool for executable blobs. When a solver picks up a blob, it **re-validates the userop bundle** before submitting — mempool admission is not a guarantee of successful execution.

The solver executes an atomic three-part bundle in strict order:

1. **Overpay the CrossCall Paymaster** — funds the Hyperlane message for crosschain payout.
2. **Fund the signer's SCW** — adds execution cost + validation gas + execution gas to the signer's smart contract wallet.
3. **Execute the signer's userop** — the actual transaction on the destination chain.

Because all three steps are executed atomically, the CrossCall Paymaster's call to Hyperlane is entirely deterministic: it only fires if the userop executes successfully.

---

## Step 4 — Crosschain Payout: Paymaster + Hyperlane

The CrossCall Paymaster is an ERC-4337 paymaster with crosschain payout logic.

**During `preOp`:** validates the userop and decodes the `paymasterAndData` field. Constructs the Hyperlane message for later authentication on the origin chain. Appends the solver's address to the extra data.

**During `postOp`:** pays the Hyperlane IGP for message delivery, redeposits used stake to the EntryPoint, and sends residual ETH back to the solver.

```solidity
struct PaymasterAndData {
  address paymaster;
  address owner;
  uint256 chainId;
  address asset;
  uint256 amount;
}
```

Once the Hyperlane message is confirmed on the network, a Hyperlane Validator picks it up and calls the `handle` function on the signer's Escrow contract on the origin chain.

---

## Step 5 — Escrow Resolution: Payout

The Escrow contract receives the Hyperlane message and:

1. Validates the hashed data matches the original lock
2. Pays the solver: estimated user costs + the signer's original bid

The solver is made whole. The user's transaction is complete. No bridge. No wrapped tokens. No counterparty risk for the user.

---

## Data Flow Diagram

```
Protocol / User
      │
      ▼
 CrossCall API ──── simulation ──── returns: userop + lock request
      │
      ▼ (signed blob)
 CrossCall Client ── validates lock on-chain + userop simulation
      │
      ▼ (confirmed blob)
 CrossCall Mempool
      │
      ▼ (solver picks up blob)
 Solver
  ├── [1] Fund CrossCall Paymaster
  ├── [2] Fund Signer SCW
  └── [3] Execute Signer's UserOp ──► Destination Chain
                                          │
                                   CrossCall Paymaster
                                   preOp / postOp
                                          │
                                   Hyperlane Mailbox ──► Origin Chain
                                                              │
                                                       User Escrow
                                                       └── Pays Solver ✓
```
