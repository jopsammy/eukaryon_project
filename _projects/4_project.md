---
layout: page
title: 七系统源码调研
description: 主流开源 Agent 系统比较分析 / Comparative Analysis of Open-Source Agent Systems
img: assets/img/papers/长程实践_CN_单次闭合vs长程实践对比.png
importance: 4
category: work
related_publications: true
---

{% tabs ss %}
{% tab ss 中文 %}

### 七系统源码调研

#### 调研范围

对七个主流开源 Agent 系统进行了源码级的系统性调研：

1. **AutoGPT** — 自主任务分解与执行
2. **LangChain** — LLM 应用开发框架
3. **CrewAI** — 多 Agent 协作框架
4. **MetaGPT** — 多角色协作编码
5. **OpenAI Swarm** — 轻量多 Agent 编排
6. **Semantic Kernel** — 企业级 AI 编排
7. **Dify** — LLMOps 平台

#### 核心发现：原核收敛

调研的最重要发现是：**模型调用协议（原核）已在 ±20 行代码内收敛**。无论系统规模多大、功能多复杂，其核心的 LLM 调用逻辑都可以被压缩到大约 20 行代码以内。这意味着"怎么调用模型"已经不是一个工程问题。

#### 真正的分水岭：真核

真正的分水岭不在于模型调用层，而在于**治理基础设施（真核）**。包括：

- 状态管理和持久化策略
- 错误恢复和回退机制
- 跨 session 上下文传递
- 权限和审计
- 多 Agent 协调协议

这些才是决定一个 Agent 系统能否完成长程工程任务的关键。

#### 三层同心模型

调研结果被抽象为一个三层同心模型：

```
皮层 (Cortex): 应用层、UI、工具集成
真核 (True Nucleus): 治理基础设施（真正的分水岭）
原核 (Proto Nucleus): 模型调用协议（已收敛）
```

- **原核（内层）**：模型调用，已在 ±20 行代码内收敛
- **真核（中层）**：治理基础设施，是系统间真正的区分因素
- **皮层（外层）**：应用交互，接入层多样化

#### 结论

治理不是工程选项，是**结构必需品**。缺乏治理基础设施的 Agent 系统，无论单次能力多强，都无法可靠地完成长程工程任务。这也验证了长程实践理论的核心判断：单次能力不蕴含长程能力。

{% endtab %}

{% tab ss English %}

### Seven-System Source Code Survey

#### Survey Scope

A systematic source-code-level survey of seven mainstream open-source Agent systems:

1. **AutoGPT** — Autonomous task decomposition and execution
2. **LangChain** — LLM application development framework
3. **CrewAI** — Multi-agent collaboration framework
4. **MetaGPT** — Multi-role collaborative coding
5. **OpenAI Swarm** — Lightweight multi-agent orchestration
6. **Semantic Kernel** — Enterprise AI orchestration
7. **Dify** — LLMOps platform

#### Core Finding: Proto Nucleus Convergence

The most important finding: **the model invocation protocol (Proto Nucleus) has converged within ±20 lines of code**. Regardless of system size or complexity, the core LLM invocation logic can be compressed to approximately 20 lines of code. This means "how to call the model" is no longer an engineering problem.

#### The Real Differentiator: True Nucleus

The real differentiator lies not in the model invocation layer, but in **governance infrastructure (True Nucleus)**. This includes:

- State management and persistence strategies
- Error recovery and rollback mechanisms
- Cross-session context handoff
- Permission and auditing
- Multi-agent coordination protocols

These are what determine whether an Agent system can complete long-horizon engineering tasks.

#### Three-Layer Concentric Model

The survey results were abstracted into a three-layer concentric model:

```
Cortex: Application layer, UI, tool integration
True Nucleus: Governance infrastructure (the real differentiator)
Proto Nucleus: Model invocation protocol (converged)
```

- **Proto Nucleus (inner layer)**: Model invocation, converged within ±20 lines
- **True Nucleus (middle layer)**: Governance infrastructure, the true differentiating factor between systems
- **Cortex (outer layer)**: Application interaction, diverse access layer

#### Conclusion

Governance is not an engineering option — it is a **structural necessity**. Agent systems lacking governance infrastructure, regardless of single-step capability, cannot reliably complete long-horizon engineering tasks. This validates the core judgment of Long-Horizon Practice Theory: single-step capability does not imply long-horizon capability.

{% endtab %}

{% endtabs %}
