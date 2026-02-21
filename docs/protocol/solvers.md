---
id: solvers
title: Solvers
sidebar_label: Solvers
---

# Solvers

Solvers are the execution layer of CrossCall. They are permissionless actors who monitor the CrossCall mempool, front liquidity for users, and execute transactions natively on destination chains.

---

## What Solvers Do

When a signer submits a call intent to CrossCall, a solver picks it up from the mempool and executes a three-step atomic bundle on the destination chain:

**Step 1 — Fund the CrossCall Paymaster**
The solver sends enough ETH to the CrossCall Paymaster to cover the Hyperlane IGP cost for the crosschain payout message.

**Step 2 — Fund the Signer's Smart Contract Wallet**
The solver deposits the execution cost, validation gas, and execution gas into the signer's SCW. This is what allows the signer's userop to execute without the signer having any funds on the destination chain.

**Step 3 — Execute the Signer's UserOp**
The solver submits the signer's signed userop to the ERC-4337 EntryPoint on the destination chain.

All three steps are executed atomically. If the userop fails, neither of the prior funding steps settle, and no Hyperlane message is sent.

---

## Solver Economics

Solvers earn the signer's original **bid** plus any **residual** from the Hyperlane cost estimation.

The bid is set by the signer during intent creation and is visible in the mempool blob. Solvers can filter and prioritize blobs by bid profitability.

The payout is guaranteed: the CrossCall Paymaster constructs the payout message deterministically in `preOp` and delivers it via Hyperlane in `postOp`. The solver receives funds from the signer's Escrow on the origin chain.

:::caution Reorg Risk
Solvers should be aware that they are theoretically exposed to chain reorg risk. If a destination chain reorgs after a solver's bundle is included, the solver's execution could be reversed — but the Hyperlane message might still settle, paying the solver for an execution that no longer exists. This is a known edge case in the solver model and a consideration for solver risk management.
:::

---

## Mempool Blob Format

Solvers read `ExecutableBlob` structs from the CrossCall Mempool. Each blob contains an execution specification and the signer's signed userop.

```go
type ExecutableBlob struct {
    ExecutionRequest ExecutionData `json:"execution"`
    UserOp           UserOperation `json:"userop"`
}

type ExecutionData struct {
    DestinationChain string `json:"destinationChain"`
    TargetAddress    string `json:"targetAddress"`
    Asset            string `json:"asset"`
    Amount           string `json:"amount"`
    Calldata         string `json:"calldata"`
}

type UserOperation struct {
    Sender                string `json:"sender"`
    Nonce                 string `json:"nonce"`
    InitCode              string `json:"initCode"`
    CallData              string `json:"callData"`
    CallGasLimit          string `json:"callGasLimit"`
    VerificationGasLimit  string `json:"verificationGasLimit"`
    PreVerificationGas    string `json:"preVerificationGas"`
    MaxFeePerGas          string `json:"maxFeePerGas"`
    MaxPriorityFeePerGas  string `json:"maxPriorityFeePerGas"`
    PaymasterAndData      string `json:"paymasterAndData"`
    Signature             string `json:"signature"`
}
```

:::note Mempool Validation vs. Execution Validity
Admission to the CrossCall Mempool does not guarantee that the userop bundle will succeed at execution time. Solvers are expected to **re-validate the userop bundle** before submitting it to the EntryPoint.
:::

---

## Becoming a Solver

🚧 Coming soon — the CrossCall solver network is moving toward a permissionless, reward-based model. Solver onboarding documentation will be published here.
