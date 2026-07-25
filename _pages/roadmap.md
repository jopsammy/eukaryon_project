---
layout: page
title: roadmap / 路线
permalink: /roadmap/
description: Eureka Agent 三阶段工程路线 / Three-phase engineering roadmap of the Eureka Agent
nav: true
nav_order: 3
---

<!-- _pages/roadmap.md -->

<style>
/* ===== Eureka Agent 路线图（作用域样式，仅本页生效）===== */
.eu-rm {
  margin: 1.5rem 0 2rem;
}

/* --- 使命宣言 --- */
.eu-rm__mission {
  margin: 0.5rem 0 3rem;
  padding: 1.8rem 2rem;
  border-left: 3px solid var(--global-theme-color, #b509ac);
  background: rgba(128, 128, 128, 0.06);
  border-radius: 0 12px 12px 0;
}
.eu-rm__mission-cn {
  font-size: 1.18rem;
  font-weight: 700;
  line-height: 1.7;
  margin: 0 0 0.5rem;
}
.eu-rm__mission-en {
  font-size: 0.92rem;
  font-style: italic;
  line-height: 1.6;
  opacity: 0.6;
  margin: 0;
}

/* --- 时间线 --- */
.eu-rm__timeline {
  position: relative;
  padding-left: 1.6rem;
}
.eu-rm__timeline::before {
  content: "";
  position: absolute;
  left: 0.35rem;
  top: 0.6rem;
  bottom: 0.6rem;
  width: 2px;
  background: rgba(128, 128, 128, 0.25);
}
.eu-rm-phase {
  position: relative;
  margin-bottom: 2.2rem;
}
.eu-rm-phase:last-child {
  margin-bottom: 0;
}
.eu-rm-phase__node {
  position: absolute;
  left: -1.6rem;
  top: 1.9rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.45);
  transform: translateX(0.15rem);
}
.eu-rm-phase--active .eu-rm-phase__node {
  background: var(--global-theme-color, #b509ac);
  box-shadow: 0 0 0 5px rgba(181, 9, 172, 0.18);
}
.eu-rm-phase__card {
  padding: 1.6rem 1.8rem;
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 12px;
}
.eu-rm-phase--active .eu-rm-phase__card {
  border-color: var(--global-theme-color, #b509ac);
  background: rgba(181, 9, 172, 0.04);
}
.eu-rm-phase__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.eu-rm-phase__num {
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.5;
}
.eu-rm-phase__status {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
}
.eu-rm-phase__status--active {
  color: var(--global-theme-color, #b509ac);
  border: 1px solid var(--global-theme-color, #b509ac);
}
.eu-rm-phase__status--queued {
  opacity: 0.55;
  border: 1px dashed rgba(128, 128, 128, 0.5);
}
.eu-rm-phase__t {
  font-size: 1.45rem;
  font-weight: 800;
  line-height: 1.3;
  margin: 0 0 0.15rem;
}
.eu-rm-phase__t--en {
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.62;
  margin-bottom: 0.9rem;
}
.eu-rm-phase__desc {
  font-size: 0.95rem;
  line-height: 1.65;
  opacity: 0.82;
  margin: 0 0 0.35rem;
}
.eu-rm-phase__desc--en {
  font-size: 0.88rem;
  font-style: italic;
  opacity: 0.58;
  margin-bottom: 0;
}

/* --- 阶段一：有序步骤 --- */
.eu-rm-steps {
  list-style: none;
  counter-reset: rmstep;
  padding: 0;
  margin: 1.3rem 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.eu-rm-steps li {
  counter-increment: rmstep;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.75rem 0.9rem;
  border: 1px solid rgba(128, 128, 128, 0.22);
  border-radius: 8px;
  background: rgba(128, 128, 128, 0.04);
}
.eu-rm-steps li::before {
  content: counter(rmstep, decimal-leading-zero);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--global-theme-color, #b509ac);
  line-height: 1.5;
  flex-shrink: 0;
}
.eu-rm-steps .cn {
  display: block;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.5;
}
.eu-rm-steps .en {
  display: block;
  font-size: 0.8rem;
  opacity: 0.55;
  line-height: 1.45;
  margin-top: 0.1rem;
}

/* --- 阶段二/三：清单网格 --- */
.eu-rm-items {
  list-style: none;
  padding: 0;
  margin: 1.3rem 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 0.7rem;
}
.eu-rm-items li {
  padding: 0.65rem 0.85rem;
  border: 1px solid rgba(128, 128, 128, 0.22);
  border-radius: 8px;
  border-left: 3px solid rgba(128, 128, 128, 0.35);
}
.eu-rm-items .cn {
  display: block;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.5;
}
.eu-rm-items .en {
  display: block;
  font-size: 0.8rem;
  opacity: 0.55;
  line-height: 1.45;
  margin-top: 0.1rem;
}

/* --- 收尾 --- */
.eu-rm__closing {
  margin-top: 3rem;
  padding-top: 1.8rem;
  border-top: 1px solid rgba(128, 128, 128, 0.25);
  text-align: center;
}
.eu-rm__closing-cn {
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.7;
  margin: 0 0 0.4rem;
}
.eu-rm__closing-en {
  font-size: 0.88rem;
  font-style: italic;
  opacity: 0.6;
  margin: 0;
}
.eu-rm__closing a {
  text-decoration: none;
}

@media (max-width: 720px) {
  .eu-rm-steps { grid-template-columns: 1fr; }
  .eu-rm__mission { padding: 1.3rem 1.4rem; }
  .eu-rm-phase__card { padding: 1.2rem 1.3rem; }
}
</style>

<div class="eu-rm">

  <!-- ===== 使命宣言 ===== -->
  <div class="eu-rm__mission">
    <p class="eu-rm__mission-cn">把在 TRAE 里长出来的能力，移植为独立的 Agent 运行时核——然后解除封印，然后增强。路线会演化，但每一步都有明确的工程落点。</p>
    <p class="eu-rm__mission-en">Port the capabilities grown inside TRAE into a standalone agent runtime kernel — then unseal, then enhance. The route evolves; every step lands on concrete engineering.</p>
  </div>

  <!-- ===== 三阶段时间线 ===== -->
  <div class="eu-rm__timeline">

    <!-- 阶段一：核移植 -->
    <div class="eu-rm-phase eu-rm-phase--active">
      <span class="eu-rm-phase__node"></span>
      <div class="eu-rm-phase__card">
        <div class="eu-rm-phase__head">
          <span class="eu-rm-phase__num">Phase 01</span>
          <span class="eu-rm-phase__status eu-rm-phase__status--active">进行中 · In Progress</span>
        </div>
        <h3 class="eu-rm-phase__t">核移植</h3>
        <div class="eu-rm-phase__t--en">Kernel Porting</div>
        <p class="eu-rm-phase__desc">把 AC 范式 V6 在 TRAE 上验证过的工程能力，复刻为独立 Agent 运行时核，并接通真实编辑器链路。</p>
        <p class="eu-rm-phase__desc eu-rm-phase__desc--en">Replicate the AC Paradigm V6 capabilities validated on TRAE into a standalone agent runtime kernel, wired into real editor loops.</p>
        <ol class="eu-rm-steps">
          <li><div><span class="cn">考虑架构设计</span><span class="en">Architecture design</span></div></li>
          <li><div><span class="cn">复刻 agent 核 → 接上 Cherry</span><span class="en">Replicate the agent kernel, connect Cherry</span></div></li>
          <li><div><span class="cn">vscode ↔ agent 核 ↔ Cherry</span><span class="en">Wire vscode ↔ kernel ↔ Cherry</span></div></li>
          <li><div><span class="cn">移植 AC 范式 V6（项目与全局、tool、plan 与 spec、多 OS 调优）</span><span class="en">Port AC Paradigm V6 — project &amp; global layers, tools, plan &amp; spec, multi-OS tuning</span></div></li>
          <li><div><span class="cn">叉开行动模式与工作台模式</span><span class="en">Split action mode from workbench mode</span></div></li>
          <li><div><span class="cn">制作「狂奔模式」</span><span class="en">Build the "Gallop Mode"</span></div></li>
        </ol>
      </div>
    </div>

    <!-- 阶段二：解除已知封印 -->
    <div class="eu-rm-phase">
      <span class="eu-rm-phase__node"></span>
      <div class="eu-rm-phase__card">
        <div class="eu-rm-phase__head">
          <span class="eu-rm-phase__num">Phase 02</span>
          <span class="eu-rm-phase__status eu-rm-phase__status--queued">待启动 · Queued</span>
        </div>
        <h3 class="eu-rm-phase__t">解除已知封印</h3>
        <div class="eu-rm-phase__t--en">Unsealing the Known Constraints</div>
        <p class="eu-rm-phase__desc">系统性解除宿主平台上已确认的封印——嵌套、工具、状态、回滚，逐项解放。</p>
        <p class="eu-rm-phase__desc eu-rm-phase__desc--en">Systematically lift the constraints confirmed on the host platform — nesting, tools, state, rollback.</p>
        <ul class="eu-rm-items">
          <li><span class="cn">真核规则梳理</span><span class="en">True-nucleus rule consolidation</span></li>
          <li><span class="cn">subagent 嵌套解放</span><span class="en">Liberate subagent nesting</span></li>
          <li><span class="cn">subagent tool 约束解放</span><span class="en">Liberate subagent tool constraints</span></li>
          <li><span class="cn">agent 台账持久化</span><span class="en">Agent ledger persistence</span></li>
          <li><span class="cn">硬回滚功能稳定</span><span class="en">Stabilize hard rollback</span></li>
        </ul>
      </div>
    </div>

    <!-- 阶段三：增强已知能力 -->
    <div class="eu-rm-phase">
      <span class="eu-rm-phase__node"></span>
      <div class="eu-rm-phase__card">
        <div class="eu-rm-phase__head">
          <span class="eu-rm-phase__num">Phase 03</span>
          <span class="eu-rm-phase__status eu-rm-phase__status--queued">待启动 · Queued</span>
        </div>
        <h3 class="eu-rm-phase__t">增强已知能力</h3>
        <div class="eu-rm-phase__t--en">Enhancing the Known Capabilities</div>
        <p class="eu-rm-phase__desc">在解封后的内核之上，把已验证有效的能力逐项增强到产品级。</p>
        <p class="eu-rm-phase__desc eu-rm-phase__desc--en">On the unsealed kernel, push each proven capability to product grade.</p>
        <ul class="eu-rm-items">
          <li><span class="cn">「一键换装」系统</span><span class="en">One-click re-skin system</span></li>
          <li><span class="cn">Hermes 系记忆植入行动模式</span><span class="en">Hermes-series memory implanted into action mode</span></li>
          <li><span class="cn">压缩系优化</span><span class="en">Compression-system optimization</span></li>
          <li><span class="cn">长固定模式线管自压缩</span><span class="en">Self-compression for long fixed-mode pipelines</span></li>
          <li><span class="cn">搜索框架压测与优化</span><span class="en">Search framework stress-test &amp; optimization</span></li>
          <li><span class="cn">移动端遥控模式</span><span class="en">Mobile remote-control mode</span></li>
          <li><span class="cn">RAG 与知识库系优化</span><span class="en">RAG &amp; knowledge-base optimization</span></li>
        </ul>
      </div>
    </div>

  </div>

  <!-- ===== 收尾 ===== -->
  <div class="eu-rm__closing">
    <p class="eu-rm__closing-cn">路线会演化，不会一次性设计——治理不是工程可选项，是结构必需品。当前处于阶段一 · 核移植，欢迎在 <a href="https://github.com/jopsammy/eukaryon_project" target="_blank" rel="noopener">GitHub</a> 上同行。</p>
    <p class="eu-rm__closing-en">The route evolves; it is never designed in one shot — governance is not an engineering option but a structural necessity. We are in Phase 1. Join us on GitHub.</p>
  </div>

</div>
