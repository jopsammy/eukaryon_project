---
layout: page
title: 长程实践理论
description: 定义长程实践形式结构，建立三层结构下限体系 / Formal structure of long-horizon practice and three-layer lower-bound system
img: assets/img/papers/长程实践_CN_三层结构下限全景.png
alt: 长程实践理论：运载前提 · 逻辑必要条件 · 工程补偿条件三层下限
importance: 3
category: work
related_publications: true
---

> **解决什么**：解释为何单次能力强不推出长程能力强——建立结构下限体系。
> **当前状态**：理论已发表（Zenodo DOI 见底部），作为 Eureka Agent 的理论基座。
> **入口**：理论原文见 [research / 研究]({{ '/research/' | relative_url }})。

### 长程实践理论（Long-Horizon Practice Theory）

长程实践（Long-Horizon Practice）是本文作者提出的一种关于 LLM 工程能力的形式化理论框架（formal theoretical framework about LLM engineering capabilities）。

#### 形式定义（Formal Definition）

长程不是"时间更久"（not "taking more time"），而是**关键信息必须在推进过程中逐步生成**（critical information must be progressively generated during the process）——起始 prompt 中蕴含的信息不足以支撑任务完成，中间步骤的产出物本身是后续步骤的必需输入（the output of intermediate steps is itself a required input for subsequent steps）。

这与传统"单次闭合"任务有根本区别（fundamentally different from traditional "single-shot closure" tasks）：单次闭合任务的所有关键信息在开始时已全部给定，LLM 只需一次性推理即可完成。

#### 三段非蕴含链（Three Non-Implication Chains）

长程实践理论的核心是揭示了三段逻辑非蕴含关系（three logical non-implication relationships）：

1. **单次能力不蕴含长程能力（single-step capability does not imply long-horizon capability）**：一个模型单次回答正确，不代表它能在多步推进中保持方向
2. **短程记忆不蕴含长程记忆（short-term memory does not imply long-term memory）**：能记住上一步的输出，不代表能维持 k 步前的工程上下文
3. **局部最优不蕴含全局最优（local optimum does not imply global optimum）**：每一步选择当前最优解，不代表整条路径最优

#### 三层结构下限体系（Three-Layer Lower Bound System）

长程实践理论提出了一个三层下限体系（three-layer lower bound system）：

- **运载前提（Carrier Premise，1 条）**：LLM 必须能够接收和输出足够长度的结构化信息
- **逻辑必要条件（Logical Necessary Conditions，6 条）**：包括状态连续性、契约可检验性、回退可达性等
- **工程补偿条件（Engineering Compensation Conditions，7 条）**：包括锚点冗余、审查独立性、并行对冲等

这 14 条共同构成"长程实践可行的结构下限"（structural lower bound for feasible long-horizon practice）——缺少任何一条，长程工程任务都会在统计意义上失败（statistically fail）。

#### 与现有评测框架的根本错位（Fundamental Misalignment with Existing Benchmarks）

现有主流评测（MMLU, HumanEval, GSM8K 等）全部测量的是**单次闭合能力**（single-shot closure capabilities），而非长程实践能力。一个模型可能在所有标准评测中达到 SOTA，但在长程工程任务中完全失效——反之亦然（and vice versa）。这种错位解释了为何"强评测"与"弱工程"可以同时存在于同一模型（why "strong benchmarks" and "weak engineering" can coexist）。
