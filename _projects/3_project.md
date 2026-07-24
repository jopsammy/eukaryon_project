---
layout: page
title: 长程实践理论
description: 超越单次能力的结构下限理论 / Structural Lower Bounds Beyond Single-Step Capability
img: assets/img/papers/长程实践_CN_三层结构下限全景.png
importance: 3
category: work
related_publications: true
---

{% tabs lh %}
{% tab lh 中文 %}

### 长程实践理论

长程实践（Long-Horizon Practice）是本文作者提出的一种关于 LLM 工程能力的形式化理论框架。

#### 形式定义

长程不是"时间更久"，而是**关键信息必须在推进过程中逐步生成**——起始 prompt 中蕴含的信息不足以支撑任务完成，中间步骤的产出物本身是后续步骤的必需输入。

这与传统"单次闭合"任务有根本区别：单次闭合任务的所有关键信息在开始时已全部给定，LLM 只需一次性推理即可完成。

#### 三段非蕴含链

长程实践理论的核心是揭示了三段逻辑非蕴含关系：

1. **单次能力 不蕴含 长程能力**：一个模型单次回答正确，不代表它能在多步推进中保持方向
2. **短程记忆 不蕴含 长程记忆**：能记住上一步的输出，不代表能维持 k 步前的工程上下文
3. **局部最优 不蕴含 全局最优**：每一步选择当前最优解，不代表整条路径最优

#### 三层结构下限体系

长程实践理论提出了一个三层下限体系：

- **运载前提**（1 条）：LLM 必须能够接收和输出足够长度的结构化信息
- **逻辑必要条件**（6 条）：包括状态连续性、契约可检验性、回退可达性等
- **工程补偿条件**（7 条）：包括锚点冗余、审查独立性、并行对冲等

这 14 条共同构成"长程实践可行的结构下限"——缺少任何一条，长程工程任务都会在统计意义上失败。

#### 与现有评测框架的根本错位

现有主流评测（MMLU, HumanEval, GSM8K 等）全部测量的是**单次闭合能力**，而非长程实践能力。一个模型可能在所有标准评测中达到 SOTA，但在长程工程任务中完全失效——反之亦然。这种错位解释了为何"强评测"与"弱工程"可以同时存在于同一模型。

{% endtab %}

{% tab lh English %}

### Long-Horizon Practice Theory

Long-Horizon Practice is a formal theoretical framework proposed by the author about LLM engineering capabilities.

#### Formal Definition

Long-Horizon does not mean "taking more time" — it means **critical information must be progressively generated during the process**. The information contained in the initial prompt is insufficient to complete the task; the output of intermediate steps is itself a required input for subsequent steps.

This is fundamentally different from traditional "single-shot closure" tasks: in single-shot closure tasks, all critical information is given at the start, and the LLM only needs one-shot reasoning to complete the task.

#### Three Non-Implication Chains

The Long-Horizon Practice Theory reveals three logical non-implication relationships:

1. **Single-step capability does not imply long-horizon capability**: A model answering correctly once does not mean it can maintain direction across multi-step progression
2. **Short-term memory does not imply long-term memory**: Remembering the last step's output does not mean maintaining engineering context from k steps ago
3. **Local optimum does not imply global optimum**: Choosing the optimal solution at each step does not mean the entire path is optimal

#### Three-Layer Lower Bound System

The Long-Horizon Practice Theory proposes a three-layer lower bound system:

- **Carrier Premise** (1): The LLM must be able to receive and output sufficiently long structured information
- **Logical Necessary Conditions** (6): Including state continuity, contract verifiability, rollback reachability, etc.
- **Engineering Compensation Conditions** (7): Including anchor redundancy, review independence, parallel hedging, etc.

Together, these 14 conditions constitute the "structural lower bound for feasible long-horizon practice" — missing any one, long-horizon engineering tasks will statistically fail.

#### Fundamental Misalignment with Existing Benchmarks

Existing mainstream benchmarks (MMLU, HumanEval, GSM8K, etc.) all measure **single-shot closure capabilities**, not long-horizon practice capabilities. A model may achieve SOTA on all standard benchmarks yet completely fail at long-horizon engineering tasks — and vice versa. This misalignment explains why "strong benchmarks" and "weak engineering" can coexist in the same model.

{% endtab %}

{% endtabs %}
