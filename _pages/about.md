---
layout: about
title: about
permalink: /

profile:
  enabled: false

selected_papers: false
social: false

announcements:
  enabled: false

latest_posts:
  enabled: false
---

<style>
/* ===== Eukaryon 首屏 hero（作用域样式，仅本页生效）===== */
.eu-hero {
  /* 突破 al-folio .container 宽度限制，铺满视口 */
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  padding: 4.5rem 1.5rem 3.5rem;
  text-align: center;
}
.eu-hero__kicker {
  font-size: 0.95rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-bottom: 1.1rem;
}
.eu-hero__title {
  font-size: clamp(2.1rem, 5.2vw, 3.6rem);
  line-height: 1.18;
  font-weight: 800;
  margin: 0 auto 1.4rem;
  max-width: 20em;
}
.eu-hero__lead {
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  line-height: 1.7;
  opacity: 0.82;
  max-width: 30em;
  margin: 0 auto 2.6rem;
}
.eu-hero__lead b { font-weight: 700; opacity: 1; }
.eu-hero__fig {
  max-width: 760px;
  margin: 0 auto;
}
.eu-hero__fig img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.eu-hero__cap {
  font-size: 0.9rem;
  opacity: 0.6;
  margin-top: 0.9rem;
  line-height: 1.6;
}
/* ===== 三入口 ===== */
.eu-paths {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin: 3rem 0 1rem;
}
.eu-path {
  display: block;
  padding: 1.4rem 1.5rem;
  border: 1px solid rgba(128,128,128,0.25);
  border-radius: 10px;
  text-decoration: none !important;
  transition: border-color 0.18s ease, transform 0.18s ease;
}
.eu-path:hover { border-color: var(--global-theme-color, #b509ac); transform: translateY(-2px); }
.eu-path__h { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.35rem; }
.eu-path__d { font-size: 0.92rem; opacity: 0.7; line-height: 1.55; }
.eu-join { text-align: center; margin: 2.5rem 0 1rem; font-size: 1.05rem; }
</style>

<div class="eu-hero">
  <div class="eu-hero__kicker">Eukaryon Project</div>
  <h1 class="eu-hero__title">我们想做世界上<br>最好用的 Agent</h1>
  <p class="eu-hero__lead">
    不是陪聊机器人 —— 我们要的是<b>劳动力</b>，是<b>同行者</b>
    <br>
    让智能真正干预现实、真正把事做成<br>
    我们相信 LLM 的潜力远未释放 —— <b>问题不在基座，在工程</b><br>
    为此，我们在做 <b>Eureka Agent</b>，一个为真实长程实践而生的 agent 核
  </p>
  <div class="eu-hero__fig">
    <img src="{{ '/assets/img/figures/fig01-expect-vs-reality-zh.png' | relative_url }}" alt="预期路径 vs 真实长程执行路径" />
    <div class="eu-hero__cap">
      现实是：再强的基座，在真实长程任务里也会悄悄漂移到「假闭合」<br>
      我们要做的，就是补上那道缺口
    </div>
  </div>
</div>

<div class="eu-paths">
  <a class="eu-path" href="{{ '/research/' | relative_url }}">
    <div class="eu-path__h">research / 研究</div>
    <div class="eu-path__d">长程实践理论 · AC 范式 V6 · 黑圣杯契约咒文</div>
  </a>
  <a class="eu-path" href="{{ '/projects/' | relative_url }}">
    <div class="eu-path__h">projects / 项目</div>
    <div class="eu-path__d">Eureka Agent · AC 范式 V6 · 七系统源码调研</div>
  </a>
  <a class="eu-path" href="{{ '/roadmap/' | relative_url }}">
    <div class="eu-path__h">roadmap / 路线</div>
    <div class="eu-path__d">核移植 → 解除封印 → 增强</div>
  </a>
</div>

<div class="eu-join">
  你也认同？欢迎联系 —— <a href="mailto:jop.sammy@163.com">jop.sammy@163.com</a>
</div>
