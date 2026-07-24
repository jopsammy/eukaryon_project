---
layout: page
title: AC 范式 V6
description: 锚点契约式人机协同工程范式 / Anchor-Contract Human-Machine Collaborative Engineering Paradigm
img: assets/img/papers/AC技术报告_CN_AC范式层次定位.png
importance: 2
category: work
related_publications: true
---

{% tabs %}

{% tab 中文 %}

### AC 范式 V6

**AC 范式（Anchor-Contract Paradigm）** 是长程实践理论的工程化实现，当前版本 V6 是在 TRAE IDE 上的首个完整工程实例。

#### 三层结构

AC 范式由三层核心机制构成：

1. **锚点（Anchor）**：跨 session 的结构化状态载体，确保工程上下文在切换时不断裂。锚点文件（如 spec、note、current-note.md）记录工程进度、交接状态和未闭合项。
2. **契约（Contract）**：在锚点基础上硬化的可校验边界。契约是多方（人与 LLM、LLM 与 LLM、模块与模块）之间的显式约定，有明确的通过/不通过判据。
3. **审查（Review）**：独立的第三方审查机制（GN-004），对产出物进行不依赖执行者的客观评价。

#### GN-004 独立审查

GN-004 是 AC 范式中最具创新性的机制之一。它模拟"无知之幕"（Rawls' Veil of Ignorance）——审查者不参与执行，执行者不参与审查。

- 审查时检查的不仅是"正确性"，更是"契约一致性"和"证据链完整性"
- 阻断性发现会触发修正循环，直到审查通过或人类裁定放行
- 审查记录是工程档案的不可篡改部分

#### Subagent 对冲调度

AC 范式引入 `parallel-sub-agent` 机制，在关键分叉点同时拉起多个独立 subagent 并行探索，避免过早收敛到单一路径：

- 多方案对抗阶段（S1）强制并行生成倾向性不同的候选方案
- 每个 subagent 在隔离上下文中执行，不受主线程偏见影响
- 失败分支自动回退到最近检查点，不污染全局状态

#### 实战案例：102 小时连续攻坚

在 DeepSeek-v4-pro 模型上，AC 范式 V6 驱动了一次 102 小时不间断的连续攻坚，成功攻克了之前被视为不可达的组合数学难题。这次实践验证了：

- 长程工程能力的可复现性
- 三层结构在大语言模型上的可行性
- 治理并非工程选项，而是结构必需品

{% endtab %}

{% tab English %}

### AC Paradigm V6

**AC Paradigm (Anchor-Contract Paradigm)** is the engineering realization of Long-Horizon Practice Theory. Version V6 is the first complete engineering instance running on the TRAE IDE.

#### Three-Layer Structure

The AC Paradigm consists of three core mechanisms:

1. **Anchor**: Structured state carriers across sessions, ensuring engineering context doesn't break when switching. Anchor files (such as spec, note, current-note.md) record engineering progress, handoff status, and open items.
2. **Contract**: Verifiable boundaries hardened on top of anchors. Contracts are explicit agreements between parties (human and LLM, LLM and LLM, module and module) with clear pass/fail criteria.
3. **Review**: Independent third-party review mechanism (GN-004) providing objective evaluation of outputs independent of the executor.

#### GN-004 Independent Review

GN-004 is one of the most innovative mechanisms in the AC Paradigm. It simulates the "Veil of Ignorance" (Rawls' Veil of Ignorance) — the reviewer does not participate in execution, and the executor does not participate in review.

- Reviews check not just "correctness" but "contract consistency" and "evidence chain completeness"
- Blocking findings trigger corrective cycles until review passes or human adjudication permits
- Review records are an immutable part of the engineering archive

#### Subagent Hedging Dispatch

The AC Paradigm introduces a `parallel-sub-agent` mechanism that launches multiple independent subagents in parallel at key divergence points to avoid premature convergence to a single path:

- Multi-scheme confrontation phase (S1) force-parallel generation of candidate schemes with different tendencies
- Each subagent executes in an isolated context, free from main-thread bias
- Failed branches automatically roll back to the nearest checkpoint without polluting global state

#### Case Study: 102-Hour Continuous Assault

On the DeepSeek-v4-pro model, AC Paradigm V6 drove a 102-hour uninterrupted continuous assault, successfully conquering a combinatorial mathematics problem previously deemed unreachable. This practice validated:

- The reproducibility of long-horizon engineering capabilities
- The feasibility of the three-layer structure on large language models
- Governance is not an engineering option but a structural necessity

{% endtab %}

{% endtabs %}
