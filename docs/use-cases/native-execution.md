---
id: native-execution
title: Native Execution
sidebar_label: Native Execution
---

# Native Execution (Multi-Chain)

## The Redeployment Problem

Protocols like OpenSea (10+ chains) and Magic Eden spend enormous resources just to exist on each new chain. Expanding to a new chain means:

- Redeploying all contracts
- Modifying backend infrastructure
- Re-indexing and re-integrating
- Bootstrapping new liquidity

And the burden compounds with each new chain. CrossCall provides an exit.

---

## How It Works

With CrossCall, a protocol doesn't need to deploy on a new chain for users on that chain to interact with it. Instead:

1. The user on the new chain signs a call intent targeting the protocol's **existing** contract on the protocol's **native** chain.
2. A CrossCall solver executes the transaction natively on the protocol's chain, as if the user were a local participant.
3. The user's funds on their origin chain pay for it — without ever touching the destination.

From the user's perspective, they're using their wallet on their chain. From the protocol's perspective, they received a standard native transaction. CrossCall is invisible.

---

## Example: NFT Marketplace

A user on Dogechain wants to buy an NFT listed on Magic Eden's Polygon market. Prices are shown in DOGE, but the NFT and the orderbook live on Polygon.

Without CrossCall:
- User bridges DOGE → Polygon (slow, risky, requires MATIC for gas)
- User executes the purchase on Polygon
- User bridges back if they want funds on Dogechain again

With CrossCall:
- User signs a call intent on Dogechain targeting Magic Eden's Polygon contract
- Solver executes the purchase natively on Polygon
- User's DOGE escrow on Dogechain pays the solver
- NFT is delivered. Done. No bridging.

The protocol (Magic Eden) doesn't change anything. They never deployed on Dogechain. But Dogechain users can buy their listings.

---

## Applicability

This same pattern applies to any protocol interaction that can be expressed as calldata:

- **Lending protocols** — users on Chain A can open positions on a lending protocol deployed on Chain B
- **Perpetuals** — users can trade on any perp protocol from any chain
- **Launchpads** — users on any chain can participate in IDOs on the launchpad's native chain
- **DAOs** — governance participation without bridging to the DAO's native chain
