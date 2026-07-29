---
layout: post
title: 真核原生固化：EurekaAgent 路线定稿 / Eukaryotic Hardening — The EurekaAgent Roadmap Decision
date: 2026-07-29
news: true
related_posts: false
---

Eukaryon Project 的核心工程分支 EurekaAgent 今日完成了一项根本性路线决策：**以真核原生固化长程实践为主轴做 AC 范式 V7 组件嵌入，辅以少量平台浅度适配分叉弱化版。**简而言之——自建，不做依附。

---

EurekaAgent, the core engineering branch of Eukaryon Project, finalized a fundamental roadmap decision today: **AC Paradigm V7 components will be embedded with eukaryotic hardening of long-horizon practice as the primary axis, supplemented by a thin layer of shallow platform-adaptation forks for select platforms.** In short — build our own, no dependency.

---

## 结构性矛盾

决策的起点是一个工程事实：可迁移化与真核能力固化从根源上是矛盾的。

以 GN-004 的编排权力层级为例——它在任何 Agent 系统中只能以两种方式之一运行：tool 调用注入（可迁移），或规则性 hook 与特例化 subagent 召回（真核固化）。二者选其一，否则产生左右脑互搏的内耗。AC 范式 v6 是一个在 TRAE 特定配置下的妥协结果，表面可迁移，实质是因为在约束下优化到极致才具备了轻量化迁移的可能。**极致的实践 Agent 与妥协版本的轻量化 rules，从根源上不可能同时做。**

---

## The Structural Contradiction

The decision starts from an engineering fact: portability and eukaryotic capability hardening are fundamentally contradictory.

Take GN-004's orchestration authority layer as an example — in any agent system, it can only operate in one of two modes: tool-call injection (portable), or rule-level hooks with specialized subagent recall (eukaryotic hardening). Choose one, or face internal conflict between the two modes. AC Paradigm V6 was a compromise under TRAE's specific constraints — it appears portable because it was optimized to the limit under those constraints. **A maximal practice agent and a compromise-level lightweight ruleset cannot coexist at the root level.**

---

## 依附策略全景分析

为辅助决策，我们对历史上从弱势到成名的依附路径做了七维全景调研——API 依附、基建依附、代码基依附、分发依附、商业模式依附、供应链依附、人才依附。核心结论是：

> **"依附"不是策略，是窗口期。**你用依附换时间，如果在窗口期内没有完成逃脱（被收购、形成自身网络效应、建立品牌壁垒），窗口关闭你就死了。

NVIDIA 从依附 DirectX 到用 CUDA 反杀、Valve 借 Windows 起家后用 Steam 建立网络效应——成功者不是"依附成功"，而是在窗口关闭前完成了逃脱。而 Tweetbot、Apollo、Shopify 450+ 应用开发者的死亡，证明了平台经济不是道德问题，是结构性规律。

关键发现：最危险的依附，是靠近大公司核心利益的依附。你的依附是否危险，不取决于你多依赖对方，而取决于你的存在占用了对方多在乎的资源。

---

## Full-Spectrum Dependency Analysis

To inform the decision, we conducted a seven-dimensional full-spectrum investigation into historical dependency paths from weakness to prominence — API dependency, infrastructure dependency, codebase dependency, distribution dependency, business model dependency, supply chain dependency, and talent dependency. The core finding:

> **"Dependency" is not a strategy — it is a window.** You trade dependency for time. If you fail to escape before the window closes — through acquisition, building network effects, or establishing brand moats — the window closing kills you.

NVIDIA went from depending on DirectX to dominating with CUDA. Valve leveraged Windows to build Steam's network effects. The winners did not "succeed at dependency" — they escaped before the window closed. The deaths of Tweetbot, Apollo, and 450+ Shopify app developers prove that platform economics is structural, not moral.

Key finding: the most dangerous dependency is one that sits near a large company's core interests. The danger of your dependency is not measured by how much you depend on them, but by how much of their attention your existence occupies.

---

## 无知之幕下的四问

从无知之幕的视角审视依附路径，需要回答四个问题：

1. **自己要做什么，依附的是什么？**EurekaAgent 要做的是 Agent 系统的治理基础设施——这恰好是所有大厂"期待"的用户入口及核心利益。
2. **逃脱路线是否合理？**兼容性策略从赌伯乐来被收编的可能性极低——没见过哪家因为"到哪都能用"反而被看上的。而通过自身网络效应逃脱的难度，与完全核心自建相比几乎没区别。
3. **当前时间点是否有特定窗口？**几乎所有大厂，不管做得好不好，都已亲自下场做 Agent 层工程，且暂时无法证明大厂们已经搞砸。窗口期不在我方。
4. **起步时有没有"伯乐"？**从 GLM 产品建议、HLE 审计到 Eukaryon Project，无一例外赌不上伯乐。多次重复博弈的结果表明：大厂的行为从他们自身的视角看很合理，但我们不具备人才资源溢出带来的依附场景。

---

## Four Questions Behind the Veil of Ignorance

Examining the dependency path from behind the veil of ignorance requires answering four questions:

1. **What are we building, and what would we depend on?** EurekaAgent builds governance infrastructure for agent systems — precisely the user entry point and core interest that every major platform "expects" to own.
2. **Is the escape route viable?** The odds of being acquired through a compatibility strategy that bets on a patron are vanishingly low — no one gets acquired because their product "works everywhere." And escaping via self-generated network effects is nearly as difficult as building entirely from scratch.
3. **Is there a specific window right now?** Nearly every major platform, regardless of execution quality, has entered the agent-layer engineering space themselves, and there is no evidence yet that they have failed. The window is not on our side.
4. **Is there a "patron" at the starting line?** From GLM product advice to HLE audits to Eukaryon Project — not once have we found a patron. Repeated interactions show that major platforms act rationally from their own perspective, but we lack the talent-spillover dependency scenario that creates such relationships.

---

## 产品观：核心价值的基底

事务分析指向一个更根本的问题：**EurekaAgent 的核心价值基底到底是建立在别人上还是自己上。**这个问题无关影响力，而是项目本身的生命线。真核治理如果在早期就做成一个妥协的结果，从一开始就是一个"看脸色"的项目。

从利弊权衡看，即使全 Agent 系统薄层可迁移兼容，只要大平台本身不托举，不光无法保证用户量与影响力有增量，反而会产生巨大的全上游变更维护工作量，又不能保证长程实践的有效性。**反而是真核固化彻底自建上，性能质量可以自主把握。**

---

## Product Philosophy: Where Core Value Sits

The analysis points to a more fundamental question: **does EurekaAgent's core value foundation sit on others, or on ourselves?** This is not about influence — it is the lifeline of the project itself. If eukaryotic governance is built as a compromise from the start, it becomes a project that lives at the mercy of others from day one.

Weighing the trade-offs: even with a thin portable compatibility layer across all agent systems, without a major platform's endorsement, there is no guarantee of incremental users or influence — only massive upstream maintenance burden without ensuring the efficacy of long-horizon practice. **Conversely, with eukaryotic hardening and full self-building, performance and quality are fully under our own control.**

---

## 最终决策

**主轴**：以真核原生固化长程实践为主轴，AC 范式 V7 组件嵌入 EurekaAgent，每个落点安排到最优位置上。

**辅轴**：对于已经做了的平台（如 OpenCode、TRAE）或有恩于我们的，主动维护一份弱化版组件。其余——不邀请则不做。

这不是傲慢。这是对项目生命线的负责。

---

## Final Decision

**Primary axis**: Eukaryotic hardening of long-horizon practice as the main axis, with AC Paradigm V7 components embedded into EurekaAgent, each placement optimized to its ideal position.

**Secondary axis**: For platforms we have already built for (e.g., OpenCode, TRAE) or those that have helped us, we will proactively maintain a lightweight component fork. For the rest — no invitation, no effort.

This is not arrogance. This is taking responsibility for the project's lifeline.
