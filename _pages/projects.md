---
layout: page
title: projects / 项目
permalink: /projects/
description: Eukaryon Project 的核心组件与前置工作 / Core components and prior work of the Eukaryon Project
nav: true
nav_order: 2
---

<!-- _pages/projects.md -->

<style>
/* ===== Eukaryon projects 卡片（作用域样式，仅本页生效）===== */
.eu-projects {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  margin: 1.5rem 0 2rem;
}
.eu-proj {
  display: grid;
  grid-template-columns: minmax(200px, 280px) 1fr;
  gap: 1.6rem;
  padding: 1.6rem;
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 12px;
  transition: border-color 0.18s ease, transform 0.18s ease;
}
.eu-proj--link:hover {
  border-color: var(--global-theme-color, #b509ac);
  transform: translateY(-2px);
}
.eu-proj--coming {
  opacity: 0.78;
  border-style: dashed;
}
@media (max-width: 720px) {
  .eu-proj { grid-template-columns: 1fr; }
  .eu-proj__fig { max-width: 460px; margin: 0 auto; }
}
.eu-proj__fig {
  margin: 0;
}
.eu-proj__fig img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid rgba(128, 128, 128, 0.18);
}
.eu-proj__figcap {
  font-size: 0.82rem;
  opacity: 0.6;
  line-height: 1.5;
  margin-top: 0.5rem;
}
.eu-proj__num {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 0.35rem;
}
.eu-proj__t {
  font-size: 1.3rem;
  font-weight: 800;
  line-height: 1.3;
  margin: 0 0 0.2rem;
}
.eu-proj__t--en {
  font-size: 1.02rem;
  font-weight: 600;
  opacity: 0.66;
  line-height: 1.4;
  margin: 0 0 0.8rem;
}
.eu-proj__desc {
  font-size: 0.95rem;
  line-height: 1.65;
  opacity: 0.82;
  margin-bottom: 1.2rem;
}
.eu-proj__desc b { font-weight: 700; opacity: 1; }
.eu-proj__desc--en {
  opacity: 0.62;
  font-size: 0.9rem;
  font-style: italic;
  margin-top: -0.5rem;
}
.eu-proj__gh {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(128, 128, 128, 0.35);
  border-radius: 6px;
  text-decoration: none !important;
  color: inherit !important;
  transition: background 0.18s ease;
}
.eu-proj__gh:hover {
  background: rgba(128, 128, 128, 0.12);
}
.eu-proj__badge {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: 4px;
  margin-left: 0.35rem;
  opacity: 0.65;
  border: 1px solid rgba(128, 128, 128, 0.3);
}
.eu-proj__coming {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--global-theme-color, #b509ac);
  border: 1px solid var(--global-theme-color, #b509ac);
  border-radius: 4px;
  margin-bottom: 0.6rem;
}
</style>

<div class="eu-projects">

  <!-- ===== 00 Eureka Agent · Coming Soon ===== -->
  <div class="eu-proj eu-proj--coming">
    <figure class="eu-proj__fig">
      <img src="{{ '/assets/img/figures/fig01-expect-vs-reality-zh.png' | relative_url }}" alt="预期路径 vs 真实长程执行路径" />
      <figcaption class="eu-proj__figcap">
        长程实践：预期路径 vs 真实漂移——Eureka Agent 要补上的那道缺口
      </figcaption>
    </figure>
    <div class="eu-proj__body">
      <div class="eu-proj__coming">Coming Soon</div>
      <h3 class="eu-proj__t">Eureka Agent</h3>
      <div class="eu-proj__t eu-proj__t--en">An agent kernel born for real long-horizon practice</div>
      <div class="eu-proj__desc">
        为真实长程实践而生的 agent 核。将 AC 范式 V6 在 TRAE 上验证过的锚点—契约—审查三层结构及其治理基础设施，从宿主 IDE 中剥离为独立运行时——让 Agent 摆脱单一平台束缚，在真实长程任务里持续闭合。
      </div>
      <div class="eu-proj__desc eu-proj__desc--en">
        An agent kernel born for real long-horizon practice. Extracts the anchor—contract—review structure and governance infrastructure validated in AC Paradigm V6 on TRAE into a standalone runtime — freeing the Agent from single-platform coupling and sustaining closure across real long-horizon tasks.
      </div>
    </div>
  </div>

  <!-- ===== 01 SpaceBasedAI ===== -->
  <a class="eu-proj eu-proj--link" href="https://github.com/jopsammy/SpaceBasedAIComputingFeasibilityAnalysis" target="_blank" rel="noopener" style="text-decoration: none; color: inherit;">
    <figure class="eu-proj__fig">
      <img src="{{ '/assets/img/projects/space-based-ai.png' | relative_url }}" alt="轨道 AI 数据中心：卫星概念与 10 年 TCO 11.8× 对比" />
      <figcaption class="eu-proj__figcap">
        轨道 AI 数据中心——物理可行、工程脆弱、商业以场景分层
      </figcaption>
    </figure>
    <div class="eu-proj__body">
      <div class="eu-proj__num">01 · 前置研究</div>
      <h3 class="eu-proj__t">轨道 AI 数据中心可行性研究</h3>
      <div class="eu-proj__t eu-proj__t--en">Space-Based AI Computing Feasibility Analysis</div>
      <div class="eu-proj__desc">
        <b>物理可行、工程脆弱、商业以场景分层。</b>以 SpaceX AI1 轨道 AI 数据中心为锚点的硬核量化分析：Stefan-Boltzmann 散热物理链、GB300 NVL72 bottom-up 质量推导、三分支 10 年 TCO 评估（\$765M/MW，地面 11.8 倍）。47 参数四档证据体系，全链路由 AC 范式 V6 驱动——是 AC 范式长程能力的下游存在性证据。
      </div>
      <div class="eu-proj__desc eu-proj__desc--en">
        <b>Physically feasible, engineeringly fragile, commercially scenario-dependent.</b> Hardcore quantitative analysis anchored on SpaceX's AI1 orbital AI data center. Full physics-to-economics chain with 47-parameter four-tier evidence system. Built entirely on AC Paradigm V6 — a downstream existence proof of AC Paradigm's long-horizon capability.
      </div>
      <span class="eu-proj__gh">GitHub</span>
    </div>
  </a>

  <!-- ===== 02 deploy-ac-v6 ===== -->
  <a class="eu-proj eu-proj--link" href="https://github.com/jopsammy/AC-skill-deploy-ac-v6-components" target="_blank" rel="noopener" style="text-decoration: none; color: inherit;">
    <figure class="eu-proj__fig">
      <img src="{{ '/assets/img/figures/fig04-v6-pipeline-zh.png' | relative_url }}" alt="AC 范式层次定位：三层结构与生态全景" />
      <figcaption class="eu-proj__figcap">
        AC 范式 V6 层次定位——三层核心 + 全景路线图
      </figcaption>
    </figure>
    <div class="eu-proj__body">
      <div class="eu-proj__num">02 · 基础设施</div>
      <h3 class="eu-proj__t">AC 范式 V6 一键部署</h3>
      <div class="eu-proj__t eu-proj__t--en">AC Paradigm V6 One-Click Deploy</div>
      <div class="eu-proj__desc">
        TRAE 中输入一句话，全套 AC 范式 V6 组件自动部署。8 条 Rules、12 个 Skills、核文件、Pipeline 共 <b>178 文件</b>，一键就位。MD5 完整性校验，四层降级保障（Python → LLM 逐文件 → CLI 手工 → 渐进引导）。自包含、可移植、零外部依赖。
      </div>
      <div class="eu-proj__desc eu-proj__desc--en">
        Type one sentence in TRAE — the full AC Paradigm V6 stack deploys automatically. <b>178 files</b> (8 Rules, 12 Skills, core docs, pipeline) with MD5 integrity verification and four-layer degradation assurance. Self-contained, portable, zero external dependencies.
      </div>
      <span class="eu-proj__gh">GitHub</span>
      <span class="eu-proj__badge">6 ★</span>
    </div>
  </a>

  <!-- ===== 03 kerrigan ===== -->
  <a class="eu-proj eu-proj--link" href="https://github.com/jopsammy/acp-traetune-kerrigan-s-tex-marp-necklace" target="_blank" rel="noopener" style="text-decoration: none; color: inherit;">
    <figure class="eu-proj__fig">
      <img src="{{ '/assets/img/projects/kerrigan-necklace.png' | relative_url }}" alt="AC 范式层次定位" />
      <figcaption class="eu-proj__figcap">
        结构定位——项链不替代本体，但让表达得宜
      </figcaption>
    </figure>
    <div class="eu-proj__body">
      <div class="eu-proj__num">03 · 排版载体</div>
      <h3 class="eu-proj__t">凯瑞甘的 TeX-Marp 项链</h3>
      <div class="eu-proj__t eu-proj__t--en">Kerrigan's TeX-Marp Necklace</div>
      <div class="eu-proj__desc">
        通用 LaTeX / Marp 排版表达载体 Skill。<b>28+ 注册问题类型</b>的格式诊断与修复，format_guard.py 硬闸门校验。覆盖从零撰写、增量修改、故障修复、结构治理四路径。最大克制的工程哲学——<b>「这只是条项链」</b>。
      </div>
      <div class="eu-proj__desc eu-proj__desc--en">
        General-purpose LaTeX &amp; Marp typesetting Skill. <b>28+ registered problem types</b>, automated format guard gate with machine-readable JSON evidence. Four paths: from-scratch, modify, fix, govern. Maximal restraint philosophy — <b>"This is just a necklace."</b>
      </div>
      <span class="eu-proj__gh">GitHub</span>
    </div>
  </a>

  <!-- ===== 04 readme-skill ===== -->
  <a class="eu-proj eu-proj--link" href="https://github.com/jopsammy/acp-traetune-readme-skill" target="_blank" rel="noopener" style="text-decoration: none; color: inherit;">
    <figure class="eu-proj__fig">
      <img src="{{ '/assets/img/projects/readme-skill.png' | relative_url }}" alt="README 自动生成：深度扫描 → 人格识别 → 产品级 README" />
      <figcaption class="eu-proj__figcap">
        深度扫描 → 理解项目人格 → 生成产品级 README——7 种人格 × 4 种视觉模式
      </figcaption>
    </figure>
    <div class="eu-proj__body">
      <div class="eu-proj__num">04 · 工程工具</div>
      <h3 class="eu-proj__t">README 自动生成 Skill</h3>
      <div class="eu-proj__t eu-proj__t--en">README Auto-Generation Skill</div>
      <div class="eu-proj__desc">
        <b>深度扫描 → 理解项目人格 → 生成产品级 README。</b>不是模板填充器——先读懂你的仓库（技术栈、结构、健康度、Git 历史），再按 7 种项目人格 + 4 种视觉模式生成。更新时 Merge（保留手写）或 Regenerate（从零重建），TRAE + AC 范式深度适配。
      </div>
      <div class="eu-proj__desc eu-proj__desc--en">
        <b>Deep scan → understand project personality → generate product-quality README.</b> Not a template filler — reads your repo first (tech stack, structure, health, Git history), then generates with 7 project personalities × 4 visual modes. Update-aware: Merge (preserve hand-written sections) or Regenerate.
      </div>
      <span class="eu-proj__gh">GitHub</span>
    </div>
  </a>

</div>
