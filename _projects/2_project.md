---
layout: page
title: AC 范式 V6
description: 锚点契约式人机协同工程范式的首个完整工程化实例 / First complete engineering instance of the anchor-contract paradigm
img: assets/img/papers/AC技术报告_CN_AC范式层次定位.png
alt: AC 范式 V6：锚点 · 契约 · 独立审查三层结构
importance: 2
category: work
related_publications: true
---

> **解决什么**：把长程实践的结构下限落到可执行组织结构上。
> **当前状态**：在 TRAE IDE 上的首个完整工程化实例，102 小时连续攻坚案例已验证。
> **入口**：参见 [research / 研究]({{ '/research/' | relative_url }}) 中 AC 范式 V6 技术报告。

### AC 范式 V6（AC Paradigm V6）

**AC 范式（Anchor-Contract Paradigm）** 是长程实践理论的工程化实现（engineering realization of Long-Horizon Practice Theory），当前版本 V6 是在 TRAE IDE 上的首个完整工程实例（first complete engineering instance）。

#### 三层结构（Three-Layer Structure）

AC 范式由三层核心机制构成（three core mechanisms）：

1. **锚点（Anchor）**：跨 session 的结构化状态载体（structured state carriers across sessions），确保工程上下文在切换时不断裂。锚点文件（如 spec、note、current-note.md）记录工程进度、交接状态和未闭合项。
2. **契约（Contract）**：在锚点基础上硬化的可校验边界（verifiable boundaries hardened on top of anchors）。契约是多方（人与 LLM、LLM 与 LLM、模块与模块）之间的显式约定，有明确的通过/不通过判据（clear pass/fail criteria）。
3. **审查（Review）**：独立的第三方审查机制（independent third-party review mechanism，GN-004），对产出物进行不依赖执行者的客观评价。

#### GN-004 独立审查（Independent Review）

GN-004 是 AC 范式中最具创新性的机制之一。它模拟"无知之幕"（Rawls' Veil of Ignorance）——审查者不参与执行，执行者不参与审查（the reviewer does not participate in execution, and the executor does not participate in review）。

- 审查时检查的不仅是"正确性"，更是"契约一致性"和"证据链完整性"（contract consistency and evidence chain completeness）
- 阻断性发现会触发修正循环，直到审查通过或人类裁定放行（blocking findings trigger corrective cycles）
- 审查记录是工程档案的不可篡改部分（immutable part of the engineering archive）

#### Subagent 对冲调度（Hedging Dispatch）

AC 范式引入 `parallel-sub-agent` 机制，在关键分叉点同时拉起多个独立 subagent 并行探索（launches multiple independent subagents in parallel at key divergence points），避免过早收敛到单一路径（avoid premature convergence to a single path）：

- 多方案对抗阶段（S1）强制并行生成倾向性不同的候选方案（force-parallel generation of candidate schemes with different tendencies）
- 每个 subagent 在隔离上下文中执行，不受主线程偏见影响（executes in an isolated context, free from main-thread bias）
- 失败分支自动回退到最近检查点，不污染全局状态（failed branches automatically roll back without polluting global state）

#### 实战案例：102 小时连续攻坚（102-Hour Continuous Assault）

在 DeepSeek-v4-pro 模型上，AC 范式 V6 驱动了一次 102 小时不间断的连续攻坚（102-hour uninterrupted continuous assault），成功攻克了之前被视为不可达的组合数学难题（a combinatorial mathematics problem previously deemed unreachable）。这次实践验证了：

- 长程工程能力的可复现性（reproducibility of long-horizon engineering capabilities）
- 三层结构在大语言模型上的可行性（feasibility of the three-layer structure on LLMs）
- 治理并非工程选项，而是结构必需品（governance is not an engineering option but a structural necessity）
