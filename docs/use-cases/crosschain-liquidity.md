---
id: crosschain-liquidity
title: Crosschain Liquidity
sidebar_label: Crosschain Liquidity
---

# Crosschain Liquidity

## The Fragmentation Problem

Liquidity today is fragmented across chains. Warp routes and canonical bridges address this by burning tokens on a native chain to mint synthetic equivalents on a target chain (see OHM, canonical USDC). This is inefficient: liquidity is diluted, synthetic assets carry depeg risk, and the system requires constant rebalancing.

CrossCall doesn't wrap or warp assets. It keeps liquidity where it's deepest and routes execution to it.

---

## DEX Aggregation Across Chains

DEX aggregators like SushiSwap unify liquidity across multiple DEXes on the same chain. With CrossCall, this model extends across chains — while maintaining the same atomic execution guarantees.

A user on Chain A wanting the best execution for a swap can have CrossCall route their order to the deepest liquidity on Chain B, Chain C, or any supported chain — atomically, with a single signature.

**Orderflow aggregators** like CoW Protocol or Coinbase's RFQ system can similarly expand their price matching to cover liquidity across more chains, offering users better fill prices without requiring them to be on the chain where liquidity lives.

---

## Isolated Bridge Markets

Some chains have active liquidity on CEXes but are only accessible via obscure or illiquid bridges (Wanchain, for example). CrossCall enables instant atomic P2P transfers into and out of these chains without using the bridge at all.

The solver fronts execution. The signer pays from their escrow. No bridge pool, no confirmation delay, no bridge operator risk.

---

## Liquidity Concentration

Rather than fragmenting liquidity across chains via synthetic assets, protocols can concentrate real liquidity on a single chain and use CrossCall to route all user execution there — regardless of which chain the user is on.

This is strictly more capital efficient than warp routes because:
- No liquidity is locked in bridge pools
- No synthetic assets depeg risk
- Deeper pools = better execution prices for users
- Rebalancing overhead is eliminated
