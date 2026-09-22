---
layout: page
title: progress / 工程进展
permalink: /progress/
description: Eureka Agent 工程进展树——按支线分组的节点快照 / Engineering progress tree of the Eureka Agent
nav: true
nav_order: 4
---

<!-- _pages/progress.md -->

<style>
/* ===== 工程进展树（作用域样式，仅本页生效）===== */
.eu-pt {
  margin: 1.5rem 0 2rem;
}

/* --- 数据截至徽章 --- */
.eu-pt__badge-row {
  margin: 0.5rem 0 1.6rem;
}
.eu-pt__badge {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px dashed rgba(128, 128, 128, 0.5);
  opacity: 0.75;
}

/* --- 动效挂载点（无 JS 时显示静态清单） --- */
.eu-pt__tree {
  position: relative;
  min-height: 8rem;
}

/* --- 静态降级清单：lane 分组 --- */
.eu-pt-lane {
  margin-bottom: 1.8rem;
}
.eu-pt-lane__name {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.5;
  margin: 0 0 0.7rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.22);
}
.eu-pt-lane__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.6rem;
}
.eu-pt-node {
  padding: 0.6rem 0.85rem;
  border: 1px solid rgba(128, 128, 128, 0.22);
  border-radius: 8px;
  border-left: 3px solid rgba(128, 128, 128, 0.35);
}
.eu-pt-node--closed {
  border-left-color: var(--global-theme-color, #b509ac);
}
.eu-pt-node--open {
  border-left-color: rgba(255, 165, 0, 0.7);
}
.eu-pt-node--unknown {
  border-left-style: dashed;
}
.eu-pt-node__label {
  display: block;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.5;
}
.eu-pt-node__meta {
  display: block;
  font-size: 0.78rem;
  opacity: 0.6;
  line-height: 1.5;
  margin-top: 0.15rem;
}
.eu-pt-node__marks {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--global-theme-color, #b509ac);
  margin-left: 0.3rem;
}

/* --- hover 浮层 / click 下钻面板（Task 3 动效接管） --- */
.eu-pt__tooltip {
  position: absolute;
  z-index: 30;
  max-width: 320px;
  padding: 0.6rem 0.8rem;
  font-size: 0.85rem;
  line-height: 1.55;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 8px;
  background: var(--global-bg-color, #fff);
  pointer-events: none;
}
.eu-pt__detail {
  margin-top: 1.4rem;
  padding: 1.2rem 1.4rem;
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 12px;
}
.eu-pt__tooltip[hidden],
.eu-pt__detail[hidden] {
  display: none;
}
</style>

<div class="eu-pt">

  <!-- ===== 数据截至徽章 ===== -->
  <div class="eu-pt__badge-row">
    <span class="eu-pt__badge">数据截至 {{ site.data.progress.data_as_of }}</span>
  </div>

  <!-- ===== 动效挂载点（Task 3 由 assets/js/progress-tree.js 接管渲染） ===== -->
  <div id="progress-tree" class="eu-pt__tree">
    <!-- 无 JS 降级：静态节点清单（按 lane 分组），JS 加载后可整体替换 -->
    {% assign lanes = site.data.progress.nodes | group_by: "lane" %}
    {% for lane in lanes %}
    <section class="eu-pt-lane">
      <h3 class="eu-pt-lane__name">{{ lane.name }}</h3>
      <ul class="eu-pt-lane__list">
        {% for node in lane.items %}
        {% case node.status %}
        {% when "已闭合" %}
        {% assign st = "eu-pt-node--closed" %}
        {% when "未闭合" %}
        {% assign st = "eu-pt-node--open" %}
        {% else %}
        {% assign st = "eu-pt-node--unknown" %}
        {% endcase %}
        <li class="eu-pt-node {{ st }}" data-node-id="{{ node.id }}">
          <span class="eu-pt-node__label">{{ node.label }}{% if node.marks.size > 0 %}<span class="eu-pt-node__marks">{{ node.marks | join: " " }}</span>{% endif %}</span>
          <span class="eu-pt-node__meta">{% if node.date %}{{ node.date }}{% else %}日期待定{% endif %} · {{ node.status }}</span>
        </li>
        {% endfor %}
      </ul>
    </section>
    {% endfor %}
  </div>

  <!-- ===== hover 浮层 / click 下钻抽屉容器（progress-tree.js 填充） ===== -->
  <div id="progress-tooltip" class="eu-pt__tooltip" hidden></div>
  <div id="progress-detail" class="eu-pt__detail" hidden></div>

</div>

<!-- ===== 数据管线（R16）+ 降级清单预隐藏（R26）=====
     唯一真相源 = _data/progress.json；构建期吐出 /assets/data/progress.json，JS 运行时 fetch。
     内联同步脚本在容器解析完成点立即隐藏静态降级清单（早于首帧绘制，消除「标签框半秒闪现」）；
     fetch/初始化失败时由 progress-tree.js 恢复清单可见（boot catch 兜底）。 -->
<script>
  window.PROGRESS_DATA_URL = "{{ '/assets/data/progress.json' | relative_url }}";
  (function () {
    if (typeof fetch !== "function" || !window.PROGRESS_DATA_URL) return;
    var lanes = document.querySelectorAll("#progress-tree .eu-pt-lane");
    for (var i = 0; i < lanes.length; i++) lanes[i].hidden = true;
  })();
</script>
<script src="{{ '/assets/js/progress-tree.js' | relative_url }}" defer></script>
