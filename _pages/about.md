---
layout: about
title: about
permalink: /
subtitle: "为真实长程实践造 Agent — building agents for real long-horizon practice"

selected_papers: true
social: true

announcements:
  enabled: true
  scrollable: true
  limit: 5

latest_posts:
  enabled: false
---

## 使命 / Mission

**做世界上最好用的 Agent 系统。** _Building the most usable agent system for real long-horizon practice._

我们相信 LLM 的潜力远未被真实长程实践（real long-horizon practice）所释放——瓶颈不在基座模型的智能，而在治理结构（the bottleneck is governance, not intelligence）。当任务存在不可预计算的顺序依赖（non-precomputable order dependencies）时，单次能力强，并不推出跨检查点的持续推进（single-step capability does not imply long-horizon capability）。

## 问题 / Problem

在长程实践的真实检验中（under real long-horizon scrutiny），反复浮现的不是模型能力问题，而是治理基础设施的缺位——状态在切换中断裂，契约在传递中漂移，回退不可达，审查缺失独立性。从七系统源码调研到 102 小时连续攻坚，七份主流开源 Agent 系统（seven mainstream open-source agent systems）的源码级比较证实：模型调用协议（proto-nucleus）已在 ±20 行代码内收敛，真正的分水岭是治理基础设施（the true differentiator is governance infrastructure, the true nucleus）。

治理不是工程可选项，是结构必需品（governance is not an engineering option but a structural necessity）。

## 三篇核心论文 / Core Papers

我们的思考已经形成三篇核心论文，从理论、治理到工程实现层层递进——长程实践不靠单次能力，而靠结构下限（structural lower bounds, not single-shot capability）。下方 selected papers 列表由站点自动渲染；完整论文索引见 [research / 研究]({{ '/research/' | relative_url }})。

## 工程路线 / Roadmap

Eureka Agent 三阶段路线——从核移植（kernel porting）、解除封印（unleashing），到增强能力（enhancement）。每阶段都有明确的里程碑与依赖前提。

完整路线图与阶段展开见 [roadmap / 路线]({{ '/roadmap/' | relative_url }})。

## 加入我们 / Join Us

如果你认同这些判断——LLM 的潜力远未被真实释放（the potential is far from released），Agent 系统需要治理优先的架构设计（governance-first architecture），长程实践需要结构性的工程保障（structural engineering guarantees）——欢迎加入我们。

Eukaryon Project 是一个开源、开放的项目。我们在 GitHub 上等你：[Eukaryon Project](https://github.com/jopsammy/eukaryon_project)
