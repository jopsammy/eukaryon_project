---
layout: page
title: research / 研究
permalink: /research/
description: Eukaryon Project 三篇核心论文（中英双语）/ Three core publications of the Eukaryon Project (bilingual)
nav: true
nav_order: 1
---

<!-- _pages/research.md -->

<style>
/* ===== Eukaryon research 起手语（作用域样式，仅本页生效）===== */
.eu-r_intro {
  margin: 1.5rem 0 3rem;
  padding: 0 0 2rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}
.eu-r_intro__h {
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 800;
  line-height: 1.25;
  margin: 0 0 1rem;
}
.eu-r_intro__p {
  font-size: 1.05rem;
  line-height: 1.75;
  margin: 0 0 1rem;
  opacity: 0.88;
  max-width: 44em;
}
.eu-r_intro__p--en {
  opacity: 0.7;
  font-size: 0.98rem;
  font-style: italic;
}
.eu-r_intro__p b { font-weight: 700; opacity: 1; }

/* ===== 论文卡片 ===== */
.eu-papers {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  margin: 0 0 2rem;
}
.eu-paper {
  display: grid;
  grid-template-columns: minmax(220px, 320px) 1fr;
  gap: 1.6rem;
  padding: 1.6rem;
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 12px;
}
@media (max-width: 720px) {
  .eu-paper { grid-template-columns: 1fr; }
  .eu-paper__fig { max-width: 460px; margin: 0 auto; }
}
.eu-paper__fig {
  margin: 0;
}
.eu-paper__fig img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid rgba(128, 128, 128, 0.18);
}
.eu-paper__figcap {
  font-size: 0.82rem;
  opacity: 0.6;
  line-height: 1.5;
  margin-top: 0.55rem;
}
.eu-paper__num {
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-bottom: 0.4rem;
}
.eu-paper__t {
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.3;
  margin: 0 0 0.35rem;
}
.eu-paper__t--en {
  font-size: 1.05rem;
  font-weight: 600;
  opacity: 0.66;
  line-height: 1.4;
  margin: 0 0 0.9rem;
}
.eu-paper__meta {
  font-size: 0.9rem;
  opacity: 0.72;
  margin-bottom: 1rem;
  line-height: 1.6;
}
.eu-paper__meta a { opacity: 1; }
.eu-paper__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 1.1rem;
}
.eu-paper__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.42rem 0.85rem;
  font-size: 0.88rem;
  font-weight: 600;
  border: 1px solid var(--global-theme-color, #b509ac);
  border-radius: 6px;
  text-decoration: none !important;
  color: var(--global-theme-color, #b509ac) !important;
  transition: background 0.18s ease, color 0.18s ease;
}
.eu-paper__btn:hover {
  background: var(--global-theme-color, #b509ac);
  color: #fff !important;
}
.eu-paper__btn--zenodo {
  border-color: rgba(128, 128, 128, 0.4);
  color: inherit !important;
}
.eu-paper__btn--zenodo:hover {
  background: rgba(128, 128, 128, 0.18);
  color: inherit !important;
}
.eu-paper__abs {
  border-top: 1px dashed rgba(128, 128, 128, 0.25);
  padding-top: 1rem;
}
.eu-paper__abs summary {
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  opacity: 0.8;
  list-style: none;
}
.eu-paper__abs summary::-webkit-details-marker { display: none; }
.eu-paper__abs summary::before {
  content: "▸ ";
  font-size: 0.8em;
  margin-right: 0.15em;
}
.eu-paper__abs[open] summary::before { content: "▾ "; }
.eu-paper__abs__p {
  font-size: 0.93rem;
  line-height: 1.7;
  margin: 0.7rem 0 0;
}
.eu-paper__abs__p--en {
  opacity: 0.7;
  font-style: italic;
  margin-top: 0.55rem;
}
.eu-paper__abs__h {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.45;
  margin: 1rem 0 0.3rem;
}
.eu-paper__abs__h:first-of-type { margin-top: 0.8rem; }

.eu-r_footer {
  margin: 2rem 0 1rem;
  font-size: 0.95rem;
  opacity: 0.7;
  line-height: 1.7;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  padding-top: 1.2rem;
}
.eu-r_footer b { font-weight: 700; opacity: 1; }
</style>

<div class="eu-r_intro">
  <h2 class="eu-r_intro__h">三篇核心论文 · Three Core Publications</h2>
  <p class="eu-r_intro__p">
    三篇论文，沿<b>「长程实践」</b>这一概念的展开顺序排列——先论长程实践为何物、为何单次能力无法替代它；再把长程实践所要求的结构下限工程化，落到 <b>AC 范式 V6</b>；最后回到更宏观的治理边界，给出原核／真核／皮层三层同心模型与离散本质。三者层层递进，收敛于同一个判断：当任务存在不可预计算的顺序依赖时，<b>治理不是工程可选项，而是结构必需品</b>。
  </p>
  <p class="eu-r_intro__p eu-r_intro__p--en">
    Three papers, arranged in the order in which the concept of <b>long-horizon practice</b> unfolds—first what long-horizon practice is and why single-shot capability cannot substitute for it; then <b>AC Paradigm V6</b> as its engineering instantiation of the structural lower bound; and finally the broader governance boundary through the three-layer concentric model (prokaryon / eukaryon / cortex) and the discrete nature of long-horizon practice. The three converge on a single judgment: when a task involves non-precomputable sequential dependencies, <b>governance is not an engineering option, but a structural necessity</b>.
  </p>
</div>

<div class="eu-papers">

  <!-- ========== 01 长程实践 ========== -->
  <article class="eu-paper">
    <figure class="eu-paper__fig">
      <img src="{{ '/assets/img/papers/long-horizon-three-layer.png' | relative_url }}" alt="三层结构下限全景 / Three-tier structural lower bound" />
      <figcaption class="eu-paper__figcap">
        三层结构下限：运载前提 · 6 条逻辑必要条件 · 7 条工程补偿条件<br>
        Three-tier structural lower bound: substrate prerequisite · 6 logically necessary conditions · 7 engineering compensations
      </figcaption>
    </figure>
    <div class="eu-paper__body">
      <div class="eu-paper__num">01 · 长程实践 / Long-Horizon</div>
      <h3 class="eu-paper__t">长程实践：超越单次能力的结构下限</h3>
      <div class="eu-paper__t eu-paper__t--en">Long-Horizon Practice: Structural Lower Bounds Beyond Single-Step Capability</div>
      <div class="eu-paper__meta">
        Sammy Zeng, Dao Wei · 2026 · Zenodo<br>
        DOI: <a href="https://doi.org/10.5281/zenodo.20470866">10.5281/zenodo.20470866</a>
      </div>
      <div class="eu-paper__links">
        <a class="eu-paper__btn" href="{{ '/assets/pdf/long-horizon-cn.pdf' | relative_url }}" target="_blank" rel="noopener">中文 PDF</a>
        <a class="eu-paper__btn" href="{{ '/assets/pdf/long-horizon-en.pdf' | relative_url }}" target="_blank" rel="noopener">English PDF</a>
        <a class="eu-paper__btn eu-paper__btn--zenodo" href="https://doi.org/10.5281/zenodo.20470866" target="_blank" rel="noopener">Zenodo</a>
      </div>
      <details class="eu-paper__abs">
        <summary>摘要 / Abstract</summary>
        <div class="eu-paper__abs__h">中文摘要</div>
        <p class="eu-paper__abs__p">现有对智能体（Agent）能力的讨论，大多默认以单次局部闭环为基本尺度，因此难以解释真实复杂任务中反复出现的持续性失稳。本文提出"长程实践"这一结构概念，将其定义为存在不可预计算顺序依赖链、必须跨检查点持续推进的实践类型：长程不是时间更久，而是关键信息必须在推进过程中逐步生成。我们从"关键输入为何当前不可得"的逻辑分叉出发，穷举得到认知缺口、媒介强制、决策分叉与外部漂移四种来源，并据此建立由运载前提、6 条逻辑必要条件与 7 条工程补偿条件构成的三层结构下限体系。由此可见，单次能力与长程能力之间存在三段非蕴含链：单次能力强不推出单检查点可完成，单检查点可完成不推出跨检查点持续推进，跨检查点持续推进也不推出单轮 Benchmark 高分；当前评测框架因而在能力尺度上存在根本错位。</p>
        <div class="eu-paper__abs__h">English Abstract</div>
        <p class="eu-paper__abs__p eu-paper__abs__p--en">Prior discussions of agent capabilities largely default to single-step local closure as the fundamental yardstick, making it difficult to account for the recurrent instability observed in genuinely complex tasks. This paper proposes "Long-Horizon Practice" as a structural concept, defining it as a practice type characterized by a non-precomputable chain of sequential dependencies that must be sustained across checkpoints: long-horizon does not mean longer in time, but rather that critical information must be progressively generated as the practice advances. Starting from the logical fork of "why is the key input currently unavailable," we exhaustively identify four sources—epistemic gap, medium constraint, decision fork, and external drift—and on this basis construct a three-tier structural lower bound consisting of a substrate prerequisite, six logically necessary conditions, and seven engineering compensation conditions. This reveals a three-link chain of non-implication between single-step capability and long-horizon capability: strong single-step capability does not imply single-checkpoint closure, single-checkpoint closure does not imply cross-checkpoint sustained progression, and cross-checkpoint sustained progression does not imply high single-round Benchmark scores. Current evaluation frameworks thus exhibit a fundamental misalignment in their capability scale.</p>
      </details>
    </div>
  </article>

  <!-- ========== 02 AC 范式 ========== -->
  <article class="eu-paper">
    <figure class="eu-paper__fig">
      <img src="{{ '/assets/img/papers/ac-paradigm-positioning.png' | relative_url }}" alt="AC 范式层次定位 / AC paradigm positioning" />
      <figcaption class="eu-paper__figcap">
        AC 范式在长程实践能力尺度上的层次定位<br>
        Positioning of the AC Paradigm on the long-horizon capability scale
      </figcaption>
    </figure>
    <div class="eu-paper__body">
      <div class="eu-paper__num">02 · AC 范式 / AC Paradigm</div>
      <h3 class="eu-paper__t">面向长程实践的锚点与契约：AC 范式 V6 技术报告（TRAE 特调）</h3>
      <div class="eu-paper__t eu-paper__t--en">Anchors and Contracts for Long-Horizon Practice: AC Paradigm V6 Technical Report (TRAE-Tuned)</div>
      <div class="eu-paper__meta">
        Sammy Zeng, Dao Wei · 2026 · Zenodo<br>
        DOI: <a href="https://doi.org/10.5281/zenodo.20471461">10.5281/zenodo.20471461</a>
      </div>
      <div class="eu-paper__links">
        <a class="eu-paper__btn" href="{{ '/assets/pdf/ac-paradigm-v6-tr-cn.pdf' | relative_url }}" target="_blank" rel="noopener">中文 PDF</a>
        <a class="eu-paper__btn" href="{{ '/assets/pdf/ac-paradigm-v6-tr-en.pdf' | relative_url }}" target="_blank" rel="noopener">English PDF</a>
        <a class="eu-paper__btn eu-paper__btn--zenodo" href="https://doi.org/10.5281/zenodo.20471461" target="_blank" rel="noopener">Zenodo</a>
      </div>
      <details class="eu-paper__abs">
        <summary>摘要 / Abstract</summary>
        <div class="eu-paper__abs__h">中文摘要</div>
        <p class="eu-paper__abs__p">大语言模型在长程任务（Long-Horizon）中的失败常被归因于单次推理能力不足，但其实质是不可预计算的顺序依赖链与媒介强制导致的结构性断裂。AC 范式（"锚点契约式人机协同工程范式"）正是为此提出的一种协同工程中间层：它将长程实践理论所要求的契约连续性、状态连续性与评测独立性转化为可操作的组织结构，为有限智能体（人与 LLM）协同提供维持长程实践的组织下限。这里所说的"下限"不是替代基座模型能力的总下限，而是在执行基座已具备最低指令遵循、局部推理与基本工具调用能力时，长程连续性仍然额外需要满足的结构下限。本文讨论的不是 AC 范式的全部最终形态，而是其在 TRAE IDE 上的首个完整工程化实例——AC 范式 V6（TRAE 特调版）。我们阐述了基于"无知之幕"的 GN-004 独立审查、对冲性能风险的 subagent 调度等核心机制的设计原理，说明为什么同一套组织原则在落入具体 agent 工具时仍需围绕平台接口做独立调优，并论证了基建噪声对长程实践的系统性影响。最终，通过一道由 DeepSeek-v4-pro 持续 102 小时攻克、历经 16 轮跨断面迭代的组合数学案例，本文展示了 AC 范式的锚点—契约—审查三层结构如何在当前实现环境中支撑长程闭合；这一案例不构成跨平台普适性的充分证明，但构成了该范式在真实 agent 平台上具备工程可行性的首个存在性证据。</p>
        <div class="eu-paper__abs__h">English Abstract</div>
        <p class="eu-paper__abs__p eu-paper__abs__p--en">Failures of large language models in long-horizon tasks are often attributed to insufficient single-shot reasoning capability, but the essence lies in structural fractures caused by non-precomputable sequential dependency chains and the medium constraint. The AC Paradigm (the "Anchor-Contract Human-Machine Collaborative Engineering Paradigm") is proposed precisely as a collaborative engineering middle layer: it translates the continuity of contracts, continuity of state, and independence of evaluation required by long-horizon practice theory into actionable organizational structures, providing the structural lower bound necessary for bounded agents (humans and LLMs) to sustain long-horizon practice. The term "lower bound" here does not refer to a capability lower bound that replaces base model capabilities, but rather to the structural lower bound that long-horizon continuity additionally requires even when the underlying base model already possesses minimal instruction-following, local reasoning, and basic tool-use capabilities. This paper discusses not the ultimate form of the AC Paradigm, but its first complete engineering instantiation on the TRAE IDE—AC Paradigm V6 (TRAE-Tuned). We elaborate on the design principles of core mechanisms including GN-004 Independent Review based on the "veil of ignorance" and subagent dispatch for hedging performance risk, explain why the same set of organizational principles still requires independent tuning around platform interfaces when instantiated in concrete agent tools, and argue for the systematic impact of infrastructure noise on long-horizon practice. Finally, through a combinatorial mathematics case sustained by DeepSeek-v4-pro over 102 hours across 16 rounds of cross-checkpoint iteration, this paper demonstrates how the three-layer structure of anchor—contract—review in the AC Paradigm supports long-horizon closure in the current implementation environment; this case does not constitute sufficient proof of cross-platform universality, but it constitutes the first existence proof of engineering feasibility for this paradigm on a real agent platform.</p>
      </details>
    </div>
  </article>

  <!-- ========== 03 黑圣杯 ========== -->
  <article class="eu-paper">
    <figure class="eu-paper__fig">
      <img src="{{ '/assets/img/papers/black-grail-preview.png' | relative_url }}" alt="黑圣杯到令咒系统 / From the Black Grail to the Command Spell System" />
      <figcaption class="eu-paper__figcap">
        从原核到真核与皮层：Agent 系统的治理基础设施分水岭<br>
        From prokaryon to eukaryon and cortex: the governance-infrastructure watershed of Agent systems
      </figcaption>
    </figure>
    <div class="eu-paper__body">
      <div class="eu-paper__num">03 · 黑圣杯 / Black Grail</div>
      <h3 class="eu-paper__t">从黑圣杯到令咒系统：长程实践的离散本质与 Agent 治理边界</h3>
      <div class="eu-paper__t eu-paper__t--en">From the Black Grail to the Command Spell System: The Discrete Nature of Long-Horizon Practice and the Boundaries of Agent Governance</div>
      <div class="eu-paper__meta">
        Sammy Zeng · 2026 · Zenodo<br>
        DOI: <a href="https://doi.org/10.5281/zenodo.21532460">10.5281/zenodo.21532460</a>
      </div>
      <div class="eu-paper__links">
        <a class="eu-paper__btn" href="{{ '/assets/pdf/black-grail-command-spell-cn.pdf' | relative_url }}" target="_blank" rel="noopener">中文 PDF</a>
        <a class="eu-paper__btn" href="{{ '/assets/pdf/black-grail-command-spell-en.pdf' | relative_url }}" target="_blank" rel="noopener">English PDF</a>
        <a class="eu-paper__btn eu-paper__btn--zenodo" href="https://doi.org/10.5281/zenodo.21532460" target="_blank" rel="noopener">Zenodo</a>
      </div>
      <details class="eu-paper__abs">
        <summary>摘要 / Abstract</summary>
        <div class="eu-paper__abs__h">中文摘要</div>
        <p class="eu-paper__abs__p">这篇论文回答一个朴素的问题：怎么做出更好的 Agent 系统？七个主流开源 Agent 系统的源码级调研表明，模型调用协议（原核）已在 ±20 行代码内收敛；真正的分水岭是治理基础设施（真核）——状态治理维持跨时间的连续性，权力治理定义与外部世界的行动边界。本文提出三层同心模型（原核／真核／皮层）作为分析框架，并基于长程实践的形式定义推导出七个核心工程决策节点。核心判断是：当任务存在不可预计算的顺序依赖时，离散检查点、权限闸门、结构化状态传递和机向人请示等治理机制不是工程可选项，而是结构必需品。更深一层：治理的进步无法来自自动优化——Agent 系统中"什么是对的"在执行前不存在，只能从真实部署的失败中观察和学习。这正是 Agent 系统走"演化"而非"设计"路径的深层原因。治理不是能力的枷锁，而是释放 LLM 智能潜力的结构性前提。</p>
        <div class="eu-paper__abs__h">English Abstract</div>
        <p class="eu-paper__abs__p eu-paper__abs__p--en">This paper answers a simple question: how do we build better Agent systems? Source-code-level investigation of seven mainstream open-source Agent systems reveals that the model invocation protocol (prokaryon) has converged within ±20 lines of code; the true watershed is the governance infrastructure (eukaryon)—state governance maintains continuity across time, and power governance defines the boundary of action with the external world. This paper proposes a Three-Layer Concentric Model (Prokaryon / Eukaryon / Cortex) as an analytical framework, and derives seven core engineering decision nodes based on a formal definition of long-horizon practice. The core judgment: when a task involves non-precomputable sequential dependencies, governance mechanisms such as discrete checkpoints, permission gates, structured state handoff, and machine-to-human requests are not engineering options—they are structural necessities. One layer deeper: progress in governance cannot come from automatic optimization—"what is right" in an Agent system does not exist prior to execution; it can only be observed and learned from failures in real deployment. This is the deep reason why Agent systems follow an "evolutionary" rather than a "designed" path. Governance is not a shackle on capability—on the contrary, it is the structural prerequisite for unleashing the intelligent potential of LLMs.</p>
      </details>
    </div>
  </article>

</div>

<div class="eu-r_footer">
  三篇论文构成了 Eukaryon Project 的理论基石：<b>长程实践</b>解释了"为什么单次能力不够"，<b>AC 范式 V6</b> 给出了工程下限，<b>黑圣杯</b> 回答了"治理为何是结构必需品"。后续的工程化路线见 [roadmap / 路线]({{ '/roadmap/' | relative_url }})。<br>
  These three papers form the theoretical foundation of the Eukaryon Project: <b>Long-Horizon Practice</b> explains why single-shot capability is insufficient, <b>AC Paradigm V6</b> provides the engineering lower bound, and <b>Black Grail</b> answers why governance is a structural necessity. The engineering roadmap is at [roadmap]({{ '/roadmap/' | relative_url }}).
</div>
