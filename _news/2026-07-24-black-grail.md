---
layout: post
title: 从黑圣杯到令咒系统：Agent 治理边界 / From the Black Grail to the Command Spell System
date: 2026-07-24
news: true
related_posts: false
---

论文《从黑圣杯到令咒系统：长程实践的离散本质与 Agent 治理边界》在 Zenodo 发布。

基于七个主流开源 Agent 系统（Claude Code、Codex CLI、OpenCode、Hermes、Cline、Cherry Studio、trae-agent）的源码级调研，本文提出**三层同心模型**（原核 / 真核 / 皮层）作为分析框架。调研表明，七个系统在调用协议（原核）上仅差 ±20 行代码，却在状态持久化、权限管线、跨会话交接上走向截然不同的方向——这不是偏好，而是环境压力在工程史上留下的结构化石。

本文将治理基础设施（真核）拆解为状态治理（跨时间连续性）与权力治理（与外部世界的行动边界），论证了当关键输入无法在当前检查点被静态折叠时，离散检查点、权限闸门、结构化状态传递和机向人请示从"增强"升级为"必需"。

本文回答三篇论文体系中的第三个问题——**治理的边界在哪？**至此，理论基座（长程实践）→ 工程落地（AC 范式）→ 治理架构（黑圣杯），三篇论文构成完整闭环。

---

The paper "From the Black Grail to the Command Spell System: The Discrete Nature of Long-Horizon Practice and the Boundaries of Agent Governance" has been published on Zenodo.

Based on source-level investigation of seven mainstream open-source agent systems (Claude Code, Codex CLI, OpenCode, Hermes, Cline, Cherry Studio, trae-agent), this paper proposes a **three-layer concentric model** (Prokaryon / Eukaryon / Cortex) as an analytical framework. The investigation reveals that while the seven systems differ by only ±20 lines of code in their invocation protocols (prokaryon), they diverge dramatically in state persistence, authority pipelines, and cross-session handoffs — not a matter of preference, but structural fossils left by environmental pressures in engineering history.

The paper decomposes governance infrastructure (eukaryon) into state governance (cross-temporal continuity) and authority governance (action boundaries with the external world), arguing that when critical inputs cannot be statically folded at the current checkpoint, discrete checkpoints, authority gates, structured state transfer, and machine-to-human requests upgrade from "enhancements" to "necessities."

This paper answers the third question in our three-paper system — **where are the boundaries of governance?** With this, the theoretical foundation (Long-Horizon Practice) → engineering implementation (AC Paradigm) → governance architecture (Black Grail) form a complete closed loop.

DOI: [10.5281/zenodo.21532460](https://doi.org/10.5281/zenodo.21532460) | [论文详情与 PDF 下载 / Paper & PDF]({{ '/research/' | relative_url }})
