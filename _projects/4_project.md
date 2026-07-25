---
layout: page
title: 七系统源码调研
description: 七个主流开源 Agent 系统的源码级比较分析 / Source-code-level comparative analysis of seven mainstream open-source agent systems
img: assets/img/papers/长程实践_CN_单次闭合vs长程实践对比.png
alt: 七系统源码调研：原核收敛 · 真核分水岭 · 皮层接入
importance: 4
category: work
related_publications: true
---

> **解决什么**：用源码级证据定位 Agent 系统的真正分水岭（治理基础设施）。
> **当前状态**：调研完成，结论为黑圣杯与令咒系统论文支撑；见 [research / 研究]({{ '/research/' | relative_url }})。
> **入口**：调研论文共三篇，源代码可参照 [GitHub](https://github.com/jopsammy/eukaryon_project)。

### 七系统源码调研（Seven-System Source Code Survey）

#### 调研范围（Survey Scope）

对七个主流开源 Agent 系统进行了源码级的系统性调研（systematic source-code-level survey）：

1. **AutoGPT** — 自主任务分解与执行（autonomous task decomposition and execution）
2. **LangChain** — LLM 应用开发框架（LLM application development framework）
3. **CrewAI** — 多 Agent 协作框架（multi-agent collaboration framework）
4. **MetaGPT** — 多角色协作编码（multi-role collaborative coding）
5. **OpenAI Swarm** — 轻量多 Agent 编排（lightweight multi-agent orchestration）
6. **Semantic Kernel** — 企业级 AI 编排（enterprise AI orchestration）
7. **Dify** — LLMOps 平台（LLMOps platform）

#### 核心发现：原核收敛（Proto Nucleus Convergence）

调研的最重要发现是：**模型调用协议（原核，Proto Nucleus）已在 ±20 行代码内收敛**（converged within ±20 lines of code）。无论系统规模多大、功能多复杂，其核心的 LLM 调用逻辑都可以被压缩到大约 20 行代码以内。这意味着"怎么调用模型"已经不是一个工程问题（"how to call the model" is no longer an engineering problem）。

#### 真正的分水岭：真核（The Real Differentiator: True Nucleus）

真正的分水岭不在于模型调用层，而在于**治理基础设施（真核，True Nucleus）**。包括：

- 状态管理和持久化策略（state management and persistence strategies）
- 错误恢复和回退机制（error recovery and rollback mechanisms）
- 跨 session 上下文传递（cross-session context handoff）
- 权限和审计（permission and auditing）
- 多 Agent 协调协议（multi-agent coordination protocols）

这些才是决定一个 Agent 系统能否完成长程工程任务的关键（what determine whether an Agent system can complete long-horizon engineering tasks）。

#### 三层同心模型（Three-Layer Concentric Model）

调研结果被抽象为一个三层同心模型（three-layer concentric model）：

- **原核（内层，Proto Nucleus）**：模型调用，已在 ±20 行代码内收敛
- **真核（中层，True Nucleus）**：治理基础设施，是系统间真正的区分因素（the true differentiating factor between systems）
- **皮层（外层，Cortex）**：应用交互，接入层多样化（diverse access layer）

#### 结论（Conclusion）

治理不是工程选项，是**结构必需品**（governance is not an engineering option, it is a structural necessity）。缺乏治理基础设施的 Agent 系统，无论单次能力多强，都无法可靠地完成长程工程任务（cannot reliably complete long-horizon engineering tasks）。这也验证了长程实践理论的核心判断：单次能力不蕴含长程能力（single-step capability does not imply long-horizon capability）。
