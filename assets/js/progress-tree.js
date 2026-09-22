/* ============================================================================
 * 工程进展树 · progress-tree.js
 * spec: add-progress-tree-page · 阶段 G 第六轮回执修正（R27–R31，2026-09-20）
 *
 * 本版形态（D5 样张工程化 + 六轮回执）：
 *   - 主线 = S 系列八块方碑（S0→S5，基座 + 加厚碑体 + 脊线轨道），其余全部降级为支线墙
 *   - 节点层级（R19）：门柱（支线入口，大立方 32）→ 内部子任务砌块（inner:"sub" 墙，
 *     13）→ 主线关键分支墙节点（S45 墙，22）→ 主线碑（方碑）；读图一眼可分工程层级
 *   - 主线内部任务展开（R27）：S0/S1/S2/S2-b/S3a/S3b/S5 各挂一面「内部任务墙」
 *     （gate:false + inner:"sub" + step:38 + climb 低 + fixedPsi:45）——主线 T 不再
 *     只藏在抽屉里；方向钉死在脊线**另一侧**（屏幕正下方），与支线梳齿互为镜像，
 *     因锚距 150 天然分属不同竖直带 ⇒ 与支线零扇面竞争（原「同侧窄带」实测与
 *     idem / popper / t-s5 等产生 22 对交叠，故改为确定性落位）
 *   - 支线的子支线（R28）：墙锚点可以是支线节点；波普尔之剑 = 一父墙 + 三子墙
 *     （剑骨架 / coding 域 / agent 域），子墙自父墙末节点扇开
 *   - 归并示意（R22）：confluence 声明（S3a/S3b → S4.5）渲染为空中汇流弧 +
 *     末端空心菱形印记，随 S4.5 碑生长显现——表达「残余连同原 S4 行统一归并」
 *   - 几何语义：[V] 悬浮菱形印记 + 引线 / 当前断点赤色信标线（全页唯一赤）/
 *     未开始半高虚线 / 前夜墙暗色降饱和 / 不可判定半透明；节点立柱线已删（R20：
 *     地面投影即接地表达，不再叠加第二种链接语义）
 *   - 图例已整体移除（R23）：构筑规范固化于 spec「图例构筑规范（R23）」
 *   - 宏观视野零文字（R14）：画布无任何常驻文字，信息全部下沉至 hover / click
 *   - 信息分层（R15 + R21 + R30）：hover = 定位；click = 叙事抽屉（导语 → 三步
 *     来龙去脉 → 内部构成清单 → 工程口径（默认折叠）→ 交叉引用），密度受控、
 *     留白分区；抽屉打开期间镜头锁定特写该节点，关闭后释放
 *   - 数据管线（R16）：运行时 fetch 构建期产物 /assets/data/progress.json
 *     （唯一真相源 _data/progress.json）；fetch/初始化失败 → 恢复 Liquid 静态降级清单
 *
 * 保留的既有机制：等轴测 2.5D 投影 / 真实日期序生长（▶/⏸/↺ + 滚动推进）/
 *   自适应拟合视野 + 悬停锚定聚焦镜头 / 舞台高度贴合视口 / L1 暖调深色背景 +
 *   屏幕空间漂浮立方块（唯一常驻循环层）/ 舞台级 pointermove 统一驱动 hover。
 *   播放节奏（R24/R31/R40）：76200ms / 126 节点 ≈ 0.605s·节点⁻¹（第二轮 R1 认可节奏）。
 *
 * 渲染路线：纯 SVG + 原生 JS，零依赖（沿用 D1/D5 样张）。
 * ========================================================================== */
window.ProgressTree = (function () {
  "use strict";

  /* ==========================================================================
   * 模块段 0 · 常量与调色板（D1 语义色；赤色全页唯一，仅 break 态使用）
   * ======================================================================== */
  var RED = "#c0392b"; // 全系统唯一赤色：只允许出现在 break（当前断点）语义上
  var INK = "#e8e4dc";
  var INK_DIM = "#8a857c";
  var PANEL_BG = "#12100b"; // 画布底色：暖调深色（微米黄偏暗），非纯黑

  var DEG = Math.PI / 180;
  var COS30 = Math.cos(30 * DEG);
  var SIN30 = Math.sin(30 * DEG);
  var SV2 = Math.SQRT1_2;

  // 场景常量（D5 样张形态）
  var TRUNK_SPACING = 150; // 主线碑间距（地面单位，等距排布）
  var H_BASE = 26; // 支线节点最低高度
  var WALL_STEP = 74; // 支线相邻节点默认间距（墙可用 step 覆盖）
  var WALL_FRONT = 26; // 节点串沿"朝观众"方向前移量
  var WALL_U0 = 88; // 墙身起跳距离（径向错层在此基础上叠加）
  var WALL_U_END_PAD = 52; // 墙尾余量
  var WALL_TOP_PAD = 40; // 薄片高出最高节点
  var WALL_T = 14; // 薄片厚度
  var CUBE = 22; // 支线节点立方体边长（主线关键分支墙 S45 用此档，R19）
  var CUBE_SUB = 13; // 支线内部子任务砌块边长（inner:"sub" 墙的非门柱节点，R19）
  var GATE = 32; // 支线门柱（首节点）立方体边长
  var STELE_BASE = 48; // 碑基座边长
  var STELE_BASE_H = 5; // 碑基座厚度
  var STELE = 34; // 碑体边长
  var STELE_H = 30; // 碑体高度（未开始减半）
  var RAIL_TAIL = 110; // 脊线轨道在末碑之后的延伸量

  var TRUNK_LANE = "主干";

  // 三值 status → 五视觉态（D1 语义）：
  //   closed=已闭合(实心) / active=未闭合·进行中(描边) / notstarted=未开始(虚线半高)
  //   unknown=当前不可判定(半透明独立视觉，不得伪装成闭合) / break=当前断点(唯一赤色)
  var STATUS_CN = {
    closed: "已闭合",
    active: "未闭合 · 进行中",
    notstarted: "未开始",
    unknown: "当前不可判定",
    break: "当前断点",
  };

  /* ==========================================================================
   * 模块段 1 · data —— 解析 fetch 到的 JSON、归一化、五态映射、生长序
   * ======================================================================== */
  var DATA_AS_OF = null;
  var NODES = [];
  var byId = {};
  var STELE_IDS = []; // 主线碑（S 系列，唯一主线）
  var WALL_DEFS = []; // 支线墙声明（求解器输入）
  var WALL_BY_KEY = {}; // 墙 key → 声明
  var NODE_WALL = {}; // 节点 id → {wall, j}（子墙锚点定位用）
  var CONFLUENCE = null; // 归并声明（R22）：from 碑残余统一归并 to 碑
  var ORDER = [];

  function visualStatus(n) {
    if (n.isBreak) return "break";
    if (n.statusRaw === "已闭合") return "closed";
    if (n.statusRaw === "当前不可判定") return "unknown";
    // 未闭合：有日期 = 进行中；无日期 = 未开始
    return n.ts != null ? "active" : "notstarted";
  }

  function loadData(raw) {
    DATA_AS_OF = raw.data_as_of || null;
    NODES = (raw.nodes || []).map(function (n, i) {
      var marks = n.marks || [];
      var node = {
        id: n.id,
        parent: n.parent || null,
        lane: n.lane || TRUNK_LANE,
        date: n.date || null,
        ts: n.date ? Date.parse(n.date) : null,
        statusRaw: n.status || "未闭合",
        label: n.label || n.id,
        gist: n.gist || "",
        story: n.story || null,
        tasks: n.tasks || null,
        detail: n.detail || "",
        links: n.links || [],
        marks: marks,
        isBreak: marks.indexOf("当前断点") >= 0,
        vMark: marks.indexOf("[V]") >= 0,
        idx: i,
      };
      node.status = visualStatus(node);
      return node;
    });
    byId = {};
    NODES.forEach(function (n) {
      byId[n.id] = n;
    });

    // 主线碑：唯一主线（R11），顺序即数据声明序
    STELE_IDS = (raw.steles || []).filter(function (id) {
      return !!byId[id];
    });
    if (!STELE_IDS.length) throw new Error("progress 数据缺少主线碑（steles）");
    var steleIdx = {};
    STELE_IDS.forEach(function (id, i) {
      steleIdx[id] = i;
    });

    // 支线墙声明 → 求解器输入；gate（门柱）= 墙内首节点（`gate:false` 的墙无门柱，
    // 用于「主线内部任务墙」——入口即碑本身）；inner:"sub" = 该墙非门柱节点按
    // 「内部子任务砌块」呈现（R19）；anchor 可为**主线碑 id 或已落位的支线节点 id**
    // （R28：子支线自父支线节点扇开，声明序保证父墙先于子墙）
    WALL_DEFS = (raw.walls || []).map(function (w) {
      var ids = (w.nodes || []).filter(function (id) {
        return !!byId[id];
      });
      var anchorIdx = steleIdx[w.anchor];
      var anchorId = null;
      if (anchorIdx == null) {
        if (!byId[w.anchor]) throw new Error("支线墙 " + w.key + " 锚点既不是主线碑、也不是已知节点：" + w.anchor);
        anchorId = w.anchor;
      }
      if (!ids.length) throw new Error("支线墙 " + w.key + " 没有有效节点");
      var hasGate = w.gate !== false;
      ids.forEach(function (id, j) {
        byId[id].wallKey = w.key;
        byId[id].gate = hasGate && j === 0;
        byId[id].innerSub = w.inner === "sub" && hasGate && j > 0;
        if (w.inner === "sub" && !hasGate) byId[id].innerSub = true;
        byId[id].wallDim = !!w.dim;
      });
      return {
        key: w.key,
        name: w.name || w.key,
        anchorIdx: anchorIdx != null ? anchorIdx : null,
        anchorId: anchorId,
        climb: w.climb != null ? w.climb : 64,
        step: w.step || WALL_STEP,
        u0: w.u0 != null ? w.u0 : WALL_U0,
        front: w.front != null ? w.front : WALL_FRONT, // 壁厚侧偏移（子墙设 0：短半径下偏移会挤压扇面）
        lockU: w.lockU != null ? w.lockU : null, // 径向位锁定（求解器不改写）
        hasGate: hasGate,
        fixedPsi: w.fixedPsi != null ? w.fixedPsi : null,
        dim: !!w.dim,
        group: w.group || null,
        innerSub: w.inner === "sub",
        ids: ids,
      };
    });
    // 墙 key → 声明（子墙按 anchorId 反查父墙）
    WALL_BY_KEY = {};
    WALL_DEFS.forEach(function (w) {
      WALL_BY_KEY[w.key] = w;
    });
    // 节点 id → 所属墙（子墙锚点定位用）
    NODE_WALL = {};
    WALL_DEFS.forEach(function (w) {
      w.ids.forEach(function (id, j) {
        NODE_WALL[id] = { wall: w, j: j };
      });
    });

    // 归并声明（R22）：from 各碑的残余连同被取代的行统一归并 to 碑（如 S3a/S3b → S4.5）
    if (raw.confluence && byId[raw.confluence.to]) {
      var froms = (raw.confluence.from || []).filter(function (id) {
        return !!byId[id];
      });
      if (froms.length) CONFLUENCE = { to: raw.confluence.to, from: froms };
    }

    // 全局生长序：date 升序（null 最后），同日按原始序 —— 禁止随机/同时淡入
    ORDER = NODES.slice()
      .sort(function (a, b) {
        return sortKey(a) - sortKey(b);
      })
      .map(function (n) {
        return n.id;
      });
  }

  function sortKey(n) {
    return (n.ts == null ? Infinity : n.ts) * 1e6 + n.idx;
  }

  /* ==========================================================================
   * 模块段 2 · projection —— 等轴测投影（保留 ang 方位角参数，镜头用）
   * ======================================================================== */
  function P(X, Z, Y, ang) {
    var c = Math.cos(ang);
    var s = Math.sin(ang);
    var a = X * c - Z * s;
    var b = X * s + Z * c;
    return { x: (a - b) * COS30, y: (a + b) * SIN30 - Y };
  }

  function rel(dX, dZ, dY, ang) {
    var c = Math.cos(ang);
    var s = Math.sin(ang);
    var a = dX * c - dZ * s;
    var b = dX * s + dZ * c;
    return { x: (a - b) * COS30, y: (a + b) * SIN30 - dY };
  }

  // 立方体三可见面（相对几何：底面中心位于原点）
  function cubeGeom(hx, hz, hgt, ang) {
    var r = function (X, Z, Y) {
      return rel(X, Z, Y, ang);
    };
    var a0 = r(-hx, -hz, 0);
    var a1 = r(hx, -hz, 0);
    var a2 = r(hx, hz, 0);
    var a3 = r(-hx, hz, 0);
    var b0 = r(-hx, -hz, hgt);
    var b1 = r(hx, -hz, hgt);
    var b2 = r(hx, hz, hgt);
    var b3 = r(-hx, hz, hgt);
    return { fx: [a1, a2, b2, b1], fz: [a2, a3, b3, b2], top: [b0, b1, b2, b3] };
  }

  function shiftGeom(g, dy) {
    // 把 cubeGeom 的三面整体上移 dy（堆叠基座用；等轴测下纯 Y 平移与方位角无关）
    ["fx", "fz", "top"].forEach(function (k) {
      g[k].forEach(function (p) {
        p.y -= dy;
      });
    });
    return g;
  }

  function ease(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function clamp01(v) {
    return Math.max(0, Math.min(1, v));
  }

  /* ==========================================================================
   * 模块段 3 · layout —— 声明式场景 + 自适应布局求解器（R18，移植 D5）
   *
   * 声明：主线碑等距脊线 + 支线墙（锚点 + 节点序列 + climb/step/dim 选项）。
   * 求解：① 同锚点墙径向错层（uShift）→ ② 按墙地面长度加权分配扇面方位角 →
   *      ③ 胶囊（墙身底边 + 顶边两条屏幕线段 + 半径）碰撞松弛（保序、保扇面边界）。
   * ======================================================================== */
  function trunkPos(i) {
    var s = i * TRUNK_SPACING;
    return { X: s * SV2, Z: -s * SV2 };
  }

  function wallGeom(w) {
    var n = w.ids.length;
    var base = w.u0 != null ? w.u0 : WALL_U0;
    var u0 = base + (w.uShift || 0); // uShift：同锚点墙的径向错层（求解器分配）
    var uEnd = u0 + (n - 1) * w.step + WALL_U_END_PAD;
    var H = H_BASE + w.climb + WALL_TOP_PAD;
    return { step: w.step, n: n, u0: u0, uEnd: uEnd, climb: w.climb, H: H };
  }

  // 墙在屏幕上的占用：墙身（不含锚点引线段）底边 + 顶边两条线段（胶囊半径另算）。
  // anchorPos 由落位阶段写入（主线碑 → trunkPos；支线节点 → 父墙节点位置，R28）
  function wallCapsule(w, ang) {
    var g = wallGeom(w);
    var A = w.anchorPos;
    var th = w.psi * DEG;
    var d = { X: Math.cos(th), Z: Math.sin(th) };
    var uS = g.u0 - 30;
    var S = { X: A.X + d.X * uS, Z: A.Z + d.Z * uS };
    var E = { X: A.X + d.X * g.uEnd, Z: A.Z + d.Z * g.uEnd };
    var Hm = g.H * 0.62;
    // 半径按墙地面长度缩放：82 长的 1 节点墙（一个门柱）不需要 36 的碰撞半径——
    // 定长 36 会让短墙在扇面里"虚胖"，把可用缝全部堵死（实测三面短墙同格叠死）
    var len = g.uEnd - g.u0;
    var r = Math.max(20, Math.min(44, Math.round(len * 0.18)));
    return {
      a0: P(S.X, S.Z, 0, ang),
      b0: P(E.X, E.Z, 0, ang),
      a1: P(S.X, S.Z, Hm, ang),
      b1: P(E.X, E.Z, Hm, ang),
      r: r,
    };
  }

  function segSegDist(p1, p2, p3, p4) {
    function ptSeg(p, a, b) {
      var dx = b.x - a.x;
      var dy = b.y - a.y;
      var L2 = dx * dx + dy * dy;
      var t = L2 ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / L2 : 0;
      t = Math.max(0, Math.min(1, t));
      var x = a.x + t * dx;
      var y = a.y + t * dy;
      return Math.sqrt((p.x - x) * (p.x - x) + (p.y - y) * (p.y - y));
    }
    function orient(a, b, c) {
      return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    }
    var d1 = orient(p3, p4, p1);
    var d2 = orient(p3, p4, p2);
    var d3 = orient(p1, p2, p3);
    var d4 = orient(p1, p2, p4);
    if (d1 > 0 !== d2 > 0 && d3 > 0 !== d4 > 0) return 0;
    return Math.min(ptSeg(p1, p3, p4), ptSeg(p2, p3, p4), ptSeg(p3, p1, p2), ptSeg(p4, p1, p2));
  }

  function pairClearance(ca, cb) {
    var d = Math.min(
      segSegDist(ca.a0, ca.b0, cb.a0, cb.b0),
      segSegDist(ca.a1, ca.b1, cb.a1, cb.b1),
      segSegDist(ca.a0, ca.b0, cb.a1, cb.b1),
      segSegDist(ca.a1, ca.b1, cb.a0, cb.b0)
    );
    return d - (ca.r + cb.r);
  }

  // 扇面：随舞台宽高比伸缩（越宽 → 越向水平两翼展开）。
  // 安全带约束（2026-09-20 实测修正）：主干脊线在屏幕上呈水平走向（反向 = 135°、
  // 正向 = 315°），扇面两缘必须与两个轨道锥各留 ≥25° 余量，否则长墙会贴着脊线回扫
  // （idem 墙距脊线实测仅 2 单位的碰撞即由此产生）→ 可用扇面收在 [约163°, 约297°]。
  function sectorForStage() {
    var w = stage && stage.clientWidth ? stage.clientWidth : 1200;
    var h = stage && stage.clientHeight ? stage.clientHeight : 800;
    var asp = w / h;
    if (asp > 1.7) return [163, 297];
    if (asp > 1.3) return [166, 292];
    return [172, 284];
  }

  // 墙长分级边界：长墙严格安全带（不回扫主干脊线，见 sectorForStage 注释）；
  // 短墙回扫幅度小（墙尾横距 sinθ·len 仍 > 25 余量），允许向轨道锥方向外扩换角距。
  // 叠加锚点分区：S0/S3b 的左锚墙限在扇面左带 —— 若放开全扇面，松弛会把它们推向
  // 右侧（实测 idem 被推到 308° 反戳 S4.5 簇门柱，clearance −80）；S4.5 簇（11 面）
  // 起点右移避开左带。组内交错 + 径向错层双分离（2026-09-20 取证：纯角向需 ≥230°，
  // 扇面给不出；首版全局加权挤在 5° 内产生 23 对交叠）
  function boundsFor(w) {
    var s = sectorForStage();
    // 碑序列：S0=0,S1=1,S2=2,S2-b=3,S3a=4,S3b=5,S4.5=6,S5=7 —— 分区线必须按实际 idx
    if (w.anchorIdx === 0) return [s[0] - 12, s[0] + 15]; // S0 带（prelude 前夜墙，朝左翼）
    if (w.anchorIdx === 5) return [s[0] + 17, s[0] + 32]; // S3b 带（idem 幂等墙）
    var len = wallGeom(w).uEnd;
    // 540 档让 f8(len 526) 落中档边界 [188,305]：与长墙档 [196,297] 顶界错开，
    // 避免两面长墙双双顶在同一右界贴死（实测 f7/f8 同顶 297°、净距 −84）
    var ex = len > 540 ? 0 : len > 300 ? 8 : 12;
    return [s[0] + 33 - ex, s[1] + ex]; // S4.5 簇（9 面，idx=6）
  }

  function solvePsi(ang) {
    // 锚点位置先行钉住（wallCapsule 依赖）：主线碑锚 → trunkPos
    WALL_DEFS.forEach(function (w) {
      if (w.anchorIdx != null) w.anchorPos = trunkPos(w.anchorIdx);
    });
    // 只解「锚在主线碑上、且未声明固定方位角」的墙。
    // ① fixedPsi 墙（R27 主线内部任务墙）方向由数据钉死——它们是等角平行梳齿，
    //    挂在与支线相对的另一侧，彼此与支线天然不争扇面；
    // ② 锚在支线节点上的子墙（R28）在落位阶段自父墙末端扇开
    var ws = WALL_DEFS.filter(function (w) {
      return w.anchorIdx != null && w.fixedPsi == null;
    }).map(function (w) {
      return {
        key: w.key,
        anchorIdx: w.anchorIdx,
        anchorPos: w.anchorPos,
        u0: w.u0,
        lockU: w.lockU,
        ids: w.ids,
        step: w.step,
        climb: w.climb,
        psi: 0,
        uShift: 0,
      };
    });
    // 0) 同锚点组：按墙长降序 → 交错角位 + 径向错层取档。
    //    - WEAVE 右倾序列：psi < 约 228° 时 X−Z 分量为负，长墙会向西横穿左锚墙空域
    //    - 短墙（跨度 < 220）uShift 额外 +220 外挑：径向不重叠的墙对，线段距离即端点
    //      距离，角向只需极小差 —— 径向分离是扇面饱和时最廉价的空间来源
    var STAGGER = [0, 95, 190, 285, 380, 470];
    var WEAVE = [0.22, 0.62, 0.08, 0.92, 0.45, 0.35, 0.4, 0.55, 0.82, 0.18, 0.85];
    var byAnchor = {};
    ws.forEach(function (w) {
      (byAnchor[w.anchorIdx] = byAnchor[w.anchorIdx] || []).push(w);
    });
    Object.keys(byAnchor).forEach(function (k) {
      var grp = byAnchor[k].slice().sort(function (a, b) {
        return wallGeom(b).uEnd - wallGeom(a).uEnd;
      });
      grp.forEach(function (w, i) {
        var span = (w.ids.length - 1) * w.step; // 墙的节点跨度（不含首尾余量）
        w.uShift = w.lockU != null ? w.lockU : STAGGER[i % STAGGER.length] + (span < 220 ? 220 : 0);
        var b = boundsFor(w);
        w.psi = b[0] + WEAVE[i % WEAVE.length] * (b[1] - b[0]);
      });
    });
    // 1) 碰撞松弛：能退角的退角（psi 小者向小、大者向大）；双双顶到各自边界的对
    //    → 较短墙径向退让（uShift 增量，上限 520）—— 扇面饱和时角向无解，向径向要空间
    for (var iter = 0; iter < 800; iter++) {
      var moved = 0;
      for (var i = 0; i < ws.length; i++) {
        for (var j = i + 1; j < ws.length; j++) {
          var cl = pairClearance(wallCapsule(ws[i], ang), wallCapsule(ws[j], ang));
          if (cl >= 0) continue;
          var bi = boundsFor(ws[i]);
          var bj = boundsFor(ws[j]);
          var iFree = ws[i].psi - bi[0] > 0.6 && bi[1] - ws[i].psi > 0.6;
          var jFree = ws[j].psi - bj[0] > 0.6 && bj[1] - ws[j].psi > 0.6;
          // 角度推挤量：半径 ~300 处 1° ≈ 5.2 屏幕单位
          var push = Math.max(0.15, Math.min(3.2, (-cl / 5.2) * 0.5));
          if (iFree || jFree) {
            var lo = ws[i].psi <= ws[j].psi ? ws[i] : ws[j];
            var hi = lo === ws[i] ? ws[j] : ws[i];
            if (lo === ws[i] ? iFree : jFree) lo.psi -= push * 0.5;
            if (hi === ws[i] ? iFree : jFree) hi.psi += push * 0.5;
            moved = Math.max(moved, push);
          } else {
            var shorter = wallGeom(ws[i]).uEnd <= wallGeom(ws[j]).uEnd ? ws[i] : ws[j];
            if (shorter.lockU != null) {
              // 径向位锁定的墙不做径向退让（改推另一面）
              var other = shorter === ws[i] ? ws[j] : ws[i];
              if (other.lockU == null) shorter = other;
            }
            if (shorter.lockU == null && shorter.uShift < 900) {
              shorter.uShift = Math.min(900, shorter.uShift + Math.max(4, -cl * 0.18));
              moved = Math.max(moved, 0.2);
            }
          }
        }
      }
      ws.forEach(function (w) {
        var b = boundsFor(w);
        w.psi = Math.max(b[0], Math.min(b[1], w.psi));
      });
      if (moved < 0.05) break;
    }
    var out = {};
    ws.forEach(function (w) {
      out[w.key] = { psi: w.psi, uShift: w.uShift };
    });
    return out;
  }

  // 墙内某节点在地面坐标系中的位置（要求 w.psi / w.uShift / w.anchorPos 已定）
  function wallNodePos(w, j) {
    var g = wallGeom(w);
    var A = w.anchorPos;
    var th = w.psi * DEG;
    var d = { X: Math.cos(th), Z: Math.sin(th) };
    var pp = { X: -d.Z, Z: d.X };
    if (pp.X + pp.Z <= 0) pp = { X: -pp.X, Z: -pp.Z };
    var u = g.u0 + j * g.step;
    return { X: A.X + d.X * u + pp.X * w.front, Z: A.Z + d.Z * u + pp.Z * w.front };
  }

  // 子墙扇角（R28）：候选扇角相对父墙方位角。同锚兄弟墙**联合**分配——枚举全排列取
  // 「与已落位墙 + 兄弟之间」最小净距最大的一组。逐个贪心会把后来者挤到共线
  // （实测 pp-skel / pp-agent 双双落在同一候选角，两枚门柱几乎重合）。
  // 候选角集：步长 16°、覆盖 -72°~+48°。同锚兄弟墙**联合**分配——枚举全排列取
  // 「与已落位墙 + 兄弟之间」最小净距最大的一组（8 取 3 = 336 种，落位期一次性）。
  // 逐个贪心会把后来者挤到共线（实测 pp-skel / pp-agent 双双落在同一候选角，
  // 两枚门柱几乎重合）；候选角加密是为了让求解器自己找到 S4.5 扇面里那三条净走廊
  // （父墙升到外环后，r≈1000 处实测存在 3 条 ≥30° 走廊）。
  var CHILD_DELTAS = [-72, -56, -40, -24, -8, 8, 24, 40];

  // 候选角集的 k-排列（有序不重复）：8 取 3 = 336 —— 只枚举实际用得到的长度
  function kPerms(arr, k) {
    var out = [];
    (function rec(prefix, rest) {
      if (prefix.length === k) {
        out.push(prefix.slice());
        return;
      }
      for (var i = 0; i < rest.length; i++) {
        prefix.push(rest[i]);
        rec(prefix, rest.slice(0, i).concat(rest.slice(i + 1)));
        prefix.pop();
      }
    })([], arr);
    return out;
  }

  // 单墙兜底（候选角数多于兄弟墙数时逐个取最优）
  function pickChildPsi(w, pw, placedList, ang) {
    var s = sectorForStage();
    var best = pw.psi;
    var bestCl = -1e9;
    for (var k = 0; k < CHILD_DELTAS.length; k++) {
      w.psi = Math.max(s[0], Math.min(s[1], pw.psi + CHILD_DELTAS[k]));
      var cl = 1e9;
      for (var i = 0; i < placedList.length; i++) {
        var o = placedList[i];
        if (o === pw) continue;
        cl = Math.min(cl, pairClearance(wallCapsule(w, ang), wallCapsule(o, ang)));
      }
      if (cl > bestCl) {
        bestCl = cl;
        best = w.psi;
      }
    }
    return best;
  }

  // 同锚兄弟墙联合扇角分配 → { wallKey: psi }
  function assignChildPsi(sibs, parentWall, placedList, ang) {
    var s = sectorForStage();
    var n = sibs.length;
    var out = {};
    if (n > CHILD_DELTAS.length) {
      sibs.forEach(function (w) {
        out[w.key] = pickChildPsi(w, parentWall, placedList, ang);
      });
      return out;
    }
    var best = null;
    var bestMin = -1e9;
    kPerms(CHILD_DELTAS, n).forEach(function (perm) {
      var cl = 1e9;
      sibs.forEach(function (w, i) {
        w.psi = Math.max(s[0], Math.min(s[1], parentWall.psi + perm[i]));
        for (var k = 0; k < placedList.length; k++) {
          var o = placedList[k];
          if (o === parentWall) continue; // 父墙不参与（子墙自父墙节点长出）
          cl = Math.min(cl, pairClearance(wallCapsule(w, ang), wallCapsule(o, ang)));
        }
      });
      for (var i = 0; i < n; i++) {
        for (var j = i + 1; j < n; j++) {
          cl = Math.min(cl, pairClearance(wallCapsule(sibs[i], ang), wallCapsule(sibs[j], ang)));
        }
      }
      if (cl > bestMin) {
        bestMin = cl;
        best = perm.slice(0, n);
      }
    });
    sibs.forEach(function (w, i) {
      out[w.key] = Math.max(s[0], Math.min(s[1], parentWall.psi + best[i]));
    });
    return out;
  }

  function buildLayout(ang) {
    var L = { ang: ang, nodes: {}, branches: [], trunkSegs: [], roots: [], brByKey: {} };

    // --- 主线碑：等距脊线 ---
    STELE_IDS.forEach(function (id, i) {
      var g = trunkPos(i);
      var n = byId[id];
      var h = n.status === "notstarted" ? Math.round(STELE_H / 2) : STELE_H;
      L.nodes[id] = { id: id, X: g.X, Z: g.Z, H: 0, kind: "stele", size: STELE, mh: h };
    });
    for (var i = 1; i < STELE_IDS.length; i++) {
      L.trunkSegs.push({ a: trunkPos(i - 1), b: trunkPos(i), end: STELE_IDS[i] });
    }

    // --- 支线墙：主线锚墙走全局角向松弛；子墙（R28）按声明序自父墙节点扇开 ---
    var solved = solvePsi(ang);
    var placed = [];
    var childDone = {};
    WALL_DEFS.forEach(function (w) {
      if (w.anchorIdx != null) {
        if (w.fixedPsi != null) {
          w.psi = w.fixedPsi; // R27：方向由数据钉死，不进扇面求解
          w.uShift = 0;
        } else {
          var sv = solved[w.key];
          w.psi = sv.psi;
          w.uShift = sv.uShift;
        }
      } else {
        var nw = NODE_WALL[w.anchorId];
        if (!nw) throw new Error("子墙 " + w.key + " 的锚点节点不在任何墙内：" + w.anchorId);
        if (!childDone[w.anchorId]) {
          // 首次遇到该锚点：把同锚兄弟墙一并定角（联合分配，避免逐个贪心挤到共线）
          childDone[w.anchorId] = true;
          var sibs = WALL_DEFS.filter(function (x) {
            return x.anchorId === w.anchorId;
          });
          var anchorPos = wallNodePos(nw.wall, nw.j);
          sibs.forEach(function (x) {
            x.uShift = 0;
            x.anchorPos = anchorPos;
          });
          var assign = assignChildPsi(sibs, nw.wall, placed, ang);
          sibs.forEach(function (x) {
            x.psi = assign[x.key];
          });
        }
      }
      var g = wallGeom(w);
      var A = w.anchorPos;
      var th = w.psi * DEG;
      var d = { X: Math.cos(th), Z: Math.sin(th) };
      var pp = { X: -d.Z, Z: d.X };
      if (pp.X + pp.Z <= 0) pp = { X: -pp.X, Z: -pp.Z }; // 统一朝向观众侧

      var nK = w.ids.length;
      var us = [];
      var hs = [];
      w.ids.forEach(function (id, j) {
        var u = g.u0 + j * g.step;
        var y0 = H_BASE + g.climb * (nK > 1 ? j / (nK - 1) : 0.5);
        var X = A.X + d.X * u + pp.X * w.front;
        var Z = A.Z + d.Z * u + pp.Z * w.front;
        var n = byId[id];
        // R19 三级尺寸：门柱（支线入口）> 关键分支墙节点 > 内部子任务砌块
        var size = n.gate ? GATE : n.innerSub ? CUBE_SUB : CUBE;
        var mh = n.status === "notstarted" ? Math.round(size * 0.55) : size;
        L.nodes[id] = { id: id, X: X, Z: Z, H: y0, kind: "branch", size: size, mh: mh, brKey: w.key };
        us.push(u);
        hs.push(y0);
      });

      var br = {
        key: w.key,
        name: w.name,
        dim: w.dim,
        ids: w.ids,
        us: us,
        hs: hs,
        A: A,
        d: d,
        pp: pp,
        wall: { u0: g.u0 - 30, u1: g.uEnd, H: g.H, T: WALL_T },
      };
      var w0 = { X: A.X + d.X * br.wall.u0, Z: A.Z + d.Z * br.wall.u0 };
      br.root = { a: A, b: w0 };
      L.brByKey[w.key] = br;
      L.branches.push(br);
      L.roots.push({ a: A, b: w0, first: w.ids[0] });
      placed.push(w);
    });

    return L;
  }

  function boundsFrom(L) {
    var x0 = 1e9;
    var x1 = -1e9;
    var y0 = 1e9;
    var y1 = -1e9;
    function add(p, pad) {
      x0 = Math.min(x0, p.x - pad);
      x1 = Math.max(x1, p.x + pad);
      y0 = Math.min(y0, p.y - pad);
      y1 = Math.max(y1, p.y + pad);
    }
    for (var id in L.nodes) {
      var g = L.nodes[id];
      var topH = g.kind === "stele" ? g.mh + STELE_BASE_H + 34 : g.H + g.mh + 30; // 含印记/信标线余量
      add(P(g.X, g.Z, topH, L.ang), 30);
      add(P(g.X, g.Z, 0, L.ang), 30);
      add(P(g.X + g.size / 2, g.Z + g.size / 2, topH, L.ang), 18);
      add(P(g.X - g.size / 2, g.Z - g.size / 2, topH, L.ang), 18);
    }
    L.branches.forEach(function (br) {
      var cs = [
        { X: br.A.X + br.d.X * br.wall.u0, Z: br.A.Z + br.d.Z * br.wall.u0 },
        { X: br.A.X + br.d.X * br.wall.u1, Z: br.A.Z + br.d.Z * br.wall.u1 },
      ];
      cs.forEach(function (c) {
        [-1, 1].forEach(function (sgn) {
          var q = { X: c.X + (br.pp.X * br.wall.T * sgn) / 2, Z: c.Z + (br.pp.Z * br.wall.T * sgn) / 2 };
          add(P(q.X, q.Z, 0, L.ang), 20);
          add(P(q.X, q.Z, br.wall.H, L.ang), 20);
        });
      });
      add(P(br.A.X, br.A.Z, 0, L.ang), 30);
    });
    // 脊线轨道末端延伸
    var tail = STELE_IDS.length - 1;
    var tp = trunkPos(tail);
    add(P(tp.X + RAIL_TAIL * SV2, tp.Z - RAIL_TAIL * SV2, 0, L.ang), 24);
    // 归并汇流弧顶点余量（R22）：弧在碑顶连线上方上拱，需计入包围盒防裁剪
    if (CONFLUENCE && L.nodes[CONFLUENCE.to]) {
      var gT = L.nodes[CONFLUENCE.to];
      var topT = gT.kind === "stele" ? gT.mh + STELE_BASE_H : gT.H + gT.mh;
      var cT2 = P(gT.X, gT.Z, topT + 26, L.ang);
      CONFLUENCE.from.forEach(function (fid) {
        var gf = L.nodes[fid];
        if (!gf) return;
        var topF = gf.kind === "stele" ? gf.mh + STELE_BASE_H : gf.H + gf.mh;
        var cF2 = P(gf.X, gf.Z, topF + 14, L.ang);
        add({ x: (cF2.x + cT2.x) / 2, y: (cF2.y + cT2.y) / 2 - 60 }, 26);
      });
    }
    return { x0: x0, x1: x1, y0: y0, y1: y1 };
  }

  /* ==========================================================================
   * 模块段 4 · renderL2 —— SVG 结构构建 + 进度驱动绘制
   * （L1 背景层挂载点：layerFloor / layerGrid，见模块段 4b）
   * ======================================================================== */
  var NS = "http://www.w3.org/2000/svg";

  function mk(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function pts(arr) {
    var s = "";
    for (var i = 0; i < arr.length; i++) s += arr[i].x.toFixed(1) + "," + arr[i].y.toFixed(1) + " ";
    return s.trim();
  }

  // 五态立方体面色（唯一赤色入口：仅 status === "break"；dim = 前夜墙暗色降饱和）
  function styleCubeFaces(fz, fx, ft, status, dim) {
    var faces = [fz, fx, ft];
    faces.forEach(function (f) {
      f.setAttribute("fill", "none");
      f.setAttribute("stroke", "none");
    });
    var o = dim ? "0.5" : "1";
    if (status === "closed") {
      ft.setAttribute("fill", "#f0ece3");
      ft.setAttribute("fill-opacity", o);
      fx.setAttribute("fill", "#cdc8bd");
      fx.setAttribute("fill-opacity", o);
      fz.setAttribute("fill", "#a4a096");
      fz.setAttribute("fill-opacity", o);
    } else if (status === "active") {
      faces.forEach(function (f) {
        f.setAttribute("stroke", INK);
        f.setAttribute("stroke-width", "1.25");
        f.setAttribute("stroke-linejoin", "round");
      });
    } else if (status === "notstarted") {
      faces.forEach(function (f) {
        f.setAttribute("stroke", INK_DIM);
        f.setAttribute("stroke-width", "1.05");
        f.setAttribute("stroke-dasharray", "2.6 3");
        f.setAttribute("stroke-linejoin", "round");
      });
    } else if (status === "unknown") {
      ft.setAttribute("fill", "rgba(232,228,220,0.24)");
      ft.setAttribute("stroke", "rgba(232,228,220,0.45)");
      ft.setAttribute("stroke-width", "0.8");
      fx.setAttribute("fill", "rgba(232,228,220,0.15)");
      fx.setAttribute("stroke", "rgba(232,228,220,0.35)");
      fx.setAttribute("stroke-width", "0.8");
      fz.setAttribute("fill", "rgba(232,228,220,0.09)");
      fz.setAttribute("stroke", "rgba(232,228,220,0.3)");
      fz.setAttribute("stroke-width", "0.8");
    } else if (status === "break") {
      ft.setAttribute("fill", RED);
      fx.setAttribute("fill", RED);
      fx.setAttribute("fill-opacity", "0.72");
      fz.setAttribute("fill", RED);
      fz.setAttribute("fill-opacity", "0.48");
    }
  }

  // 碑基座面色（中性暖灰 + 细描边：轮廓可辨识的「石基座」，而非混入背景的黑块；不参与五态）
  function styleBaseFaces(fz, fx, ft) {
    [fz, fx, ft].forEach(function (f) {
      f.setAttribute("stroke", "rgba(232,228,220,0.24)");
      f.setAttribute("stroke-width", "0.8");
      f.setAttribute("stroke-linejoin", "round");
    });
    ft.setAttribute("fill", "rgba(232,228,220,0.16)");
    fx.setAttribute("fill", "rgba(232,228,220,0.09)");
    fz.setAttribute("fill", "rgba(232,228,220,0.06)");
  }

  var LAYOUT = null;
  var BOUNDS = null;
  var PROG = {};
  var progress = 0;
  var DOM = null;
  var svg = null;
  var stage = null;
  var ui = {};

  function build(ang) {
    LAYOUT = buildLayout(ang);
    var b = boundsFrom(LAYOUT);
    var PADL = 70;
    var PADR = 70;
    var PADT = 80;
    var PADB = 140;
    BOUNDS = { x: b.x0 - PADL, y: b.y0 - PADT, w: b.x1 - b.x0 + PADL + PADR, h: b.y1 - b.y0 + PADT + PADB };

    while (svg.firstChild) svg.removeChild(svg.firstChild);
    // 自适应视野：SVG 撑满舞台，viewBox 由镜头（模块段 4b）按已生长节点包围盒动态拟合
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("viewBox", Math.round(BOUNDS.x) + " " + Math.round(BOUNDS.y) + " " + Math.round(BOUNDS.w) + " " + Math.round(BOUNDS.h));
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "工程进展树（等轴测生长图），数据截至 " + (DATA_AS_OF || "未知"));

    var defs = mk("defs"); // L1 渐变/遮罩定义

    var svgRoot = mk("g");
    var layerFloor = mk("g", { class: "eu-ptx-floor" }); // L1 背景层：地面暖色光池
    var layerGrid = mk("g", { class: "eu-ptx-grid" }); // L1 背景层：等轴测网格
    var layerRail = mk("g");
    var layerRoot = mk("g");
    var layerShade = mk("g");
    var layerWall = mk("g");
    var layerMerge = mk("g"); // 归并汇流弧（R22）：空中弧线，画在节点层之下
    var layerNode = mk("g");

    // ---- 主干脊线轨道（随碑的生长逐段铺开，枕木随段内位置显影；末段含延伸） ----
    var nrm = { X: SV2, Z: SV2 };
    var railSegs = [];
    var lastPos = trunkPos(STELE_IDS.length - 1);
    var railAll = LAYOUT.trunkSegs.concat([
      {
        a: lastPos,
        b: { X: lastPos.X + RAIL_TAIL * SV2, Z: lastPos.Z - RAIL_TAIL * SV2 },
        end: STELE_IDS[STELE_IDS.length - 1], // 延伸段随末碑一起出现
      },
    ]);
    railAll.forEach(function (seg) {
      var w = 15;
      var poly = mk("polygon", { class: "eu-ptx-rail" });
      var e1 = mk("line", { class: "eu-ptx-rail-edge" });
      var e2 = mk("line", { class: "eu-ptx-rail-edge" });
      layerRail.appendChild(poly);
      layerRail.appendChild(e1);
      layerRail.appendChild(e2);
      var sl = [];
      var dx = seg.b.X - seg.a.X;
      var dz = seg.b.Z - seg.a.Z;
      var dist = Math.sqrt(dx * dx + dz * dz);
      var nSl = Math.max(1, Math.round(dist / 48));
      for (var i = 1; i < nSl; i++) {
        var t = i / nSl;
        var bx = seg.a.X + dx * t;
        var bz = seg.a.Z + dz * t;
        var q1 = P(bx - nrm.X * w * 0.85, bz - nrm.Z * w * 0.85, 0, ang);
        var q2 = P(bx + nrm.X * w * 0.85, bz + nrm.Z * w * 0.85, 0, ang);
        var ln = mk("line", { class: "eu-ptx-sleeper", x1: q1.x, y1: q1.y, x2: q2.x, y2: q2.y, opacity: 0 });
        layerRail.appendChild(ln);
        sl.push({ t: t, el: ln });
      }
      railSegs.push({ seg: seg, w: w, poly: poly, e1: e1, e2: e2, sleep: sl });
    });

    // ---- 支线"根部"地面轨道（锚点碑 → 薄片起点） ----
    var rootPolys = [];
    LAYOUT.roots.forEach(function (rt) {
      var w = 11;
      var perp = { X: -(rt.b.Z - rt.a.Z), Z: rt.b.X - rt.a.X };
      var len = Math.sqrt(perp.X * perp.X + perp.Z * perp.Z) || 1;
      perp.X = (perp.X / len) * w;
      perp.Z = (perp.Z / len) * w;
      var c = [
        { X: rt.a.X - perp.X, Z: rt.a.Z - perp.Z },
        { X: rt.b.X - perp.X, Z: rt.b.Z - perp.Z },
        { X: rt.b.X + perp.X, Z: rt.b.Z + perp.Z },
        { X: rt.a.X + perp.X, Z: rt.a.Z + perp.Z },
      ].map(function (q) {
        return P(q.X, q.Z, 0, ang);
      });
      var el = mk("polygon", { class: "eu-ptx-root", points: pts(c) });
      layerRoot.appendChild(el);
      rootPolys.push({ el: el, first: rt.first });
    });

    // ---- 节点地面投影（等轴测菱形；半径随节点尺寸缩放，R19） ----
    var shadows = [];
    NODES.forEach(function (n) {
      var g = LAYOUT.nodes[n.id];
      if (!g) return;
      var r = g.kind === "stele" ? 26 : Math.round(g.size * 0.6);
      var off = g.kind === "stele" ? 0 : g.H * 0.16;
      var c = [
        P(g.X + off - r, g.Z + off, 0, ang),
        P(g.X + off, g.Z + off + r, 0, ang),
        P(g.X + off + r, g.Z + off, 0, ang),
        P(g.X + off, g.Z + off - r, 0, ang),
      ];
      var el = mk("polygon", { class: "eu-ptx-shadow", points: pts(c), opacity: 0 });
      layerShade.appendChild(el);
      shadows.push({ el: el, id: n.id });
    });

    // ---- 支线竖向薄片（墙体） ----
    var walls = [];
    var wallByKey = {};
    LAYOUT.branches.forEach(function (br) {
      var grp = mk("g", { opacity: 0 });
      var cap = mk("polygon", { class: "eu-ptx-wallcap" });
      var front = mk("polygon", { class: "eu-ptx-wallfront" });
      var top = mk("polygon", { class: "eu-ptx-walltop" });
      var rim = mk("polyline", { class: "eu-ptx-wallrim" });
      grp.appendChild(cap);
      grp.appendChild(front);
      grp.appendChild(top);
      grp.appendChild(rim);
      layerWall.appendChild(grp);
      var rec = { key: br.key, cap: cap, front: front, top: top, rim: rim };
      walls.push(rec);
      wallByKey[br.key] = rec;
    });

    // ---- 节点（主线方碑 = 基座 + 碑体 / 支线悬臂立方体 + 门柱） ----
    var nodeEls = [];
    var nodeElsById = {};
    NODES.forEach(function (n) {
      var g = LAYOUT.nodes[n.id];
      if (!g) return;
      var grp = mk("g", { class: "eu-ptx-cube", "data-node-id": n.id, "data-status": n.status, opacity: 0 });
      var topY; // 立方体顶面高度（局部坐标，印记/信标线定位用）
      if (g.kind === "stele") {
        // 基座（中性低亮度）+ 碑体（五态）
        var bg = cubeGeom(STELE_BASE / 2, STELE_BASE / 2, STELE_BASE_H, ang);
        var bfz = mk("polygon", { class: "f-z f-base", points: pts(bg.fz) });
        var bfx = mk("polygon", { class: "f-x f-base", points: pts(bg.fx) });
        var bft = mk("polygon", { class: "f-top f-base", points: pts(bg.top) });
        styleBaseFaces(bfz, bfx, bft);
        grp.appendChild(bfz);
        grp.appendChild(bfx);
        grp.appendChild(bft);
        var sg = shiftGeom(cubeGeom(STELE / 2, STELE / 2, g.mh, ang), STELE_BASE_H);
        var fz = mk("polygon", { class: "f-z", points: pts(sg.fz) });
        var fx = mk("polygon", { class: "f-x", points: pts(sg.fx) });
        var ft = mk("polygon", { class: "f-top", points: pts(sg.top) });
        styleCubeFaces(fz, fx, ft, n.status, false);
        grp.appendChild(fz);
        grp.appendChild(fx);
        grp.appendChild(ft);
        topY = STELE_BASE_H + g.mh;
      } else {
        var geom = cubeGeom(g.size / 2, g.size / 2, g.mh, ang);
        var fz2 = mk("polygon", { class: "f-z", points: pts(geom.fz) });
        var fx2 = mk("polygon", { class: "f-x", points: pts(geom.fx) });
        var ft2 = mk("polygon", { class: "f-top", points: pts(geom.top) });
        styleCubeFaces(fz2, fx2, ft2, n.status, n.wallDim);
        grp.appendChild(fz2);
        grp.appendChild(fx2);
        grp.appendChild(ft2);
        topY = g.mh;
      }
      var hit = mk("circle", { class: "eu-ptx-hit", cx: 0, cy: -topY * 0.6, r: Math.max(16, g.size * 0.95) });
      grp.appendChild(hit);
      // [V] 人类裁决印记：引线 + 悬浮空心菱形（中性色，非赤色）
      if (n.vMark) {
        var vy = -topY;
        grp.appendChild(mk("line", { class: "eu-ptx-vmk-lead", x1: 0, y1: vy - 2, x2: 0, y2: vy - 15 }));
        var d = 6.5;
        var dy = vy - 22;
        grp.appendChild(
          mk("polygon", {
            class: "eu-ptx-vmk",
            points: "0," + (dy - d) + " " + d + "," + dy + " 0," + (dy + d) + " " + -d + "," + dy,
          })
        );
      }
      // 当前断点信标线：赤色引线 + 实心菱形（全页唯一赤的延伸）
      if (n.isBreak) {
        var by = -topY;
        grp.appendChild(mk("line", { class: "eu-ptx-beacon-lead", x1: 0, y1: by, x2: 0, y2: by - 44 }));
        var bd = 4;
        var bdy = by - 50;
        grp.appendChild(
          mk("polygon", {
            class: "eu-ptx-beacon",
            points: "0," + (bdy - bd) + " " + bd + "," + bdy + " 0," + (bdy + bd) + " " + -bd + "," + bdy,
          })
        );
      }
      layerNode.appendChild(grp);
      var rec = { id: n.id, grp: grp, g: g };
      nodeEls.push(rec);
      nodeElsById[n.id] = rec;
    });

    // ---- 归并汇流弧（R22）：from 各碑顶 → to 碑顶的空中虚线弧，随 to 碑生长显现 ----
    var mergeArcs = [];
    if (CONFLUENCE && LAYOUT.nodes[CONFLUENCE.to]) {
      var gTo = LAYOUT.nodes[CONFLUENCE.to];
      var topTo = gTo.kind === "stele" ? STELE_BASE_H + gTo.mh : gTo.H + gTo.mh;
      var cTo = P(gTo.X, gTo.Z, topTo + 26, ang);
      CONFLUENCE.from.forEach(function (fid) {
        var gf = LAYOUT.nodes[fid];
        if (!gf) return;
        var topF = gf.kind === "stele" ? STELE_BASE_H + gf.mh : gf.H + gf.mh;
        var cF = P(gf.X, gf.Z, topF + 14, ang);
        var cx = (cF.x + cTo.x) / 2;
        var cy = (cF.y + cTo.y) / 2 - 78; // 控制点上拱：弧顶约在碑顶连线上方 39
        var arcEl = mk("path", {
          class: "eu-ptx-merge",
          opacity: 0,
          d:
            "M" +
            cF.x.toFixed(1) +
            "," +
            cF.y.toFixed(1) +
            " Q" +
            cx.toFixed(1) +
            "," +
            cy.toFixed(1) +
            " " +
            cTo.x.toFixed(1) +
            "," +
            cTo.y.toFixed(1),
        });
        layerMerge.appendChild(arcEl);
        mergeArcs.push({ el: arcEl, to: CONFLUENCE.to });
      });
      // 归并末端印记：一枚空心菱形（多弧同汇一点，印记只画一次）
      var md = 5.5;
      var mkEl = mk("polygon", {
        class: "eu-ptx-merge-mark",
        opacity: 0,
        points: "0," + -md + " " + md + ",0 0," + md + " " + -md + ",0",
        transform: "translate(" + cTo.x.toFixed(1) + "," + (cTo.y + 9).toFixed(1) + ")",
      });
      layerMerge.appendChild(mkEl);
      mergeArcs.mark = mkEl;
    }

    buildL1(defs, layerFloor, layerGrid, ang); // L1：地面暖色光池 + 等轴测网格

    svgRoot.appendChild(layerFloor);
    svgRoot.appendChild(layerGrid);
    svgRoot.appendChild(layerRail);
    svgRoot.appendChild(layerRoot);
    svgRoot.appendChild(layerShade);
    svgRoot.appendChild(layerWall);
    svgRoot.appendChild(layerMerge);
    svgRoot.appendChild(layerNode);
    svg.appendChild(defs);
    svg.appendChild(svgRoot);

    DOM = {
      railSegs: railSegs,
      rootPolys: rootPolys,
      shadows: shadows,
      walls: walls,
      wallByKey: wallByKey,
      mergeArcs: mergeArcs,
      nodeEls: nodeEls,
      nodeElsById: nodeElsById,
    };
    bindInteract(); // L3：节点交互绑定（rebuild 后重挂）
    draw(progress);
  }

  // 进度 p ∈ [0,1] → 按 date 升序依次生长（无随机缓动、无同时淡入）
  function draw(p) {
    if (!LAYOUT || !DOM) return;
    var ang = LAYOUT.ang;
    var N = ORDER.length;
    var head = p * N;
    var i;
    for (i = 0; i < N; i++) {
      PROG[ORDER[i]] = ease(clamp01(head - i));
    }

    // 主干脊线轨道逐段铺开
    var nrmR = { X: SV2, Z: SV2 };
    DOM.railSegs.forEach(function (rs) {
      var f = PROG[rs.seg.end];
      var A = rs.seg.a;
      var B = rs.seg.b;
      var w = rs.w;
      var n = nrmR;
      var p1 = { X: A.X + (B.X - A.X) * f, Z: A.Z + (B.Z - A.Z) * f };
      var q0 = P(A.X - n.X * w, A.Z - n.Z * w, 0, ang);
      var q1 = P(p1.X - n.X * w, p1.Z - n.Z * w, 0, ang);
      var q2 = P(p1.X + n.X * w, p1.Z + n.Z * w, 0, ang);
      var q3 = P(A.X + n.X * w, A.Z + n.Z * w, 0, ang);
      rs.poly.setAttribute("points", pts([q0, q1, q2, q3]));
      rs.e1.setAttribute("x1", q0.x);
      rs.e1.setAttribute("y1", q0.y);
      rs.e1.setAttribute("x2", q1.x);
      rs.e1.setAttribute("y2", q1.y);
      rs.e2.setAttribute("x1", q3.x);
      rs.e2.setAttribute("y1", q3.y);
      rs.e2.setAttribute("x2", q2.x);
      rs.e2.setAttribute("y2", q2.y);
      rs.sleep.forEach(function (s) {
        s.el.setAttribute("opacity", f >= s.t ? 0.9 : 0);
      });
    });
    DOM.rootPolys.forEach(function (rp) {
      rp.el.setAttribute("opacity", PROG[rp.first] * 0.95);
    });

    // 地面投影
    DOM.shadows.forEach(function (s) {
      var g = LAYOUT.nodes[s.id];
      var e = PROG[s.id];
      var off = g.kind === "stele" ? 0 : g.H * e * 0.16;
      var r = (g.kind === "stele" ? 26 : Math.round(g.size * 0.6)) * (0.55 + 0.45 * e);
      var c = [
        P(g.X + off - r, g.Z + off, 0, ang),
        P(g.X + off, g.Z + off + r, 0, ang),
        P(g.X + off + r, g.Z + off, 0, ang),
        P(g.X + off, g.Z + off - r, 0, ang),
      ];
      s.el.setAttribute("points", pts(c));
      s.el.setAttribute("opacity", e * 0.6);
    });

    // 竖向薄片：随支线最新已生长节点向前推进（长度与高度同步插值）
    LAYOUT.branches.forEach(function (br) {
      var w = DOM.wallByKey[br.key];
      var wall = br.wall;
      var lead = 0;
      var prev = 0;
      var hmax = 0;
      for (var j = 0; j < br.ids.length; j++) {
        var id = br.ids[j];
        var target = br.us[j] - wall.u0;
        lead += (target - prev) * PROG[id];
        prev = target;
        hmax = Math.max(hmax, br.hs[j] * PROG[id]);
      }
      var spanNodes = br.us[br.us.length - 1] - wall.u0 || 1;
      var e = clamp01(lead / spanNodes);
      var H = hmax + WALL_TOP_PAD * e;
      var u1c = wall.u0 + (wall.u1 - wall.u0) * e;
      var c0 = { X: br.A.X + br.d.X * wall.u0, Z: br.A.Z + br.d.Z * wall.u0 };
      var c1 = { X: br.A.X + br.d.X * u1c, Z: br.A.Z + br.d.Z * u1c };
      var q0 = { X: c0.X - (br.pp.X * wall.T) / 2, Z: c0.Z - (br.pp.Z * wall.T) / 2 };
      var q1 = { X: c1.X - (br.pp.X * wall.T) / 2, Z: c1.Z - (br.pp.Z * wall.T) / 2 };
      var q2 = { X: c1.X + (br.pp.X * wall.T) / 2, Z: c1.Z + (br.pp.Z * wall.T) / 2 };
      var q3 = { X: c0.X + (br.pp.X * wall.T) / 2, Z: c0.Z + (br.pp.Z * wall.T) / 2 };
      var R = function (q, y) {
        return P(q.X, q.Z, y, ang);
      };
      w.front.setAttribute("points", pts([R(q3, 0), R(q2, 0), R(q2, H), R(q3, H)]));
      w.top.setAttribute("points", pts([R(q0, H), R(q1, H), R(q2, H), R(q3, H)]));
      var capA = br.d.X + br.d.Z > 0 ? [q1, q2] : [q3, q0];
      w.cap.setAttribute("points", pts([R(capA[0], 0), R(capA[1], 0), R(capA[1], H), R(capA[0], H)]));
      w.rim.setAttribute("points", pts([R(q3, H), R(q2, H)]));
      w.front.parentNode.setAttribute("opacity", Math.min(1, e * 3) * (br.dim ? 0.55 : 1));
    });

    // 归并汇流弧：随归并目标碑（to）的生长显现（R22）
    if (DOM.mergeArcs && DOM.mergeArcs.length) {
      var mo = (PROG[DOM.mergeArcs[0].to] || 0) * 0.9;
      DOM.mergeArcs.forEach(function (m) {
        m.el.setAttribute("opacity", mo.toFixed(3));
      });
      if (DOM.mergeArcs.mark) DOM.mergeArcs.mark.setAttribute("opacity", mo.toFixed(3));
    }

    // 节点（R20：立柱线已删——地面投影即接地表达，不再有第二种链接语义）
    DOM.nodeEls.forEach(function (ne) {
      var g = ne.g;
      var e = PROG[ne.id];
      var isStele = g.kind === "stele";
      var y0 = isStele ? 0 : g.H * e;
      var sc = isStele ? 0.3 + 0.7 * e : 0.62 + 0.38 * e;
      var cur = P(g.X, g.Z, y0, ang);
      ne.grp.setAttribute("transform", "translate(" + cur.x.toFixed(2) + "," + cur.y.toFixed(2) + ") scale(" + sc.toFixed(3) + ")");
      ne.grp.setAttribute("opacity", e);
      ne.grp.style.pointerEvents = e > 0.35 ? "auto" : "none";
      ne.grp.setAttribute("tabindex", e > 0.35 ? "0" : "-1"); // 未长出的节点不进 Tab 序
    });

    progress = p;
    growTarget = fitTarget(p); // 生长拟合目标（镜头由 camStep 向该目标插值逼近）
    camEnsure();
    emit("progress", p);
    if (p >= 1) emit("complete");
  }

  /* ==========================================================================
   * 模块段 4b · L1 背景层 + 镜头（2026-09-19 按人类反馈定稿，本版沿用）
   *
   * 【背景 = 暖调深色底 + 屏幕空间漂浮立方块 + 纵深雾化】
   *   三层：底色暖调深色（微米黄偏暗，非纯黑）；漂浮立方块挂「屏幕空间」覆盖层
   *   （独立 <svg>，不随镜头 viewBox 缩放 → 任何视野下密度与尺寸稳定）；
   *   纵深雾化固定遮罩（双光源 + 四段压暗）压住背景。
   *   量级红线（人类批准修订）：DRIFT_N = 18（far/mid/near 各 6）；
   *   最快档横穿一屏 ≥ 24s；最亮档亮度显著低于 L2「已闭合」节点最暗面。
   *
   * 【镜头 = 自适应拟合视野 + 悬停聚焦】
   *   - 生长拟合：viewBox = 已生长节点包围盒（含下一个将生长节点的前瞻），
   *     任何时刻「展示多少个节点，画面就自适应装下全部」，无滚动条、无裁剪。
   *   - 悬停聚焦：以「悬停瞬间节点在舞台内的相对位置」为锚，把该节点钉在同一
   *     相对位置放大（CAM_FOCUS_W < FIT_MIN_W → 任何进度下都是拉近），移开复原。
   *     锚定是「不抽搐」的关键：节点屏幕位置不变、只变大，指针必然仍在命中区内。
   *   - 无透视变形；视野宽高比始终匹配舞台，不留黑边。
   *
   * 【常驻循环范围】仅 L1 漂浮立方块 rAF 为常驻循环（人类批准的唯一破例层）；
   *   镜头 rAF 在收敛后自行停帧，L2 主体层「停止即静止」。
   * ======================================================================== */
  var VB = null; // 当前视野 {x, y, w, h}（SVG 用户坐标系 viewBox）
  var FIT_MIN_W = 780; // 局部视野最小宽度（避免首帧怼脸）
  var FIT_MIN_H = 420; // 局部视野最小高度
  var FIT_PAD = 130; // 视野内边距（用户单位）
  var CAM_FIT_LERP = 0.16; // 生长拟合：每帧向目标视野逼近比例（跟手）
  var CAM_FOCUS_LERP = 0.085; // 悬停聚焦：中速插值（约 0.5s 到位）
  var CAM_FOCUS_W = 700; // 悬停聚焦目标视野宽度（用户单位；恒小于 FIT_MIN_W，必定是"拉近"）
  var CAM_EPS = 0.4; // 收敛阈值：四元差值全部低于此值即停帧

  var camRaf = null;
  var camLast = 0;
  var growTarget = null; // 生长拟合目标视野（draw 每次写入）
  var focusId = null; // 悬停聚焦的节点 id（null = 无聚焦）
  var focusAnchor = null; // 悬停瞬间该节点在舞台内的相对位置（0~1）
  var lastFocusOff = { id: null, t: 0 }; // 刚被移开的节点：短时间内拒绝再次聚焦（防抖余量）
  var FOCUS_RELOCK_MS = 320;

  // L1 漂浮立方块（屏幕空间，像素单位；三档纵深）
  var DRIFT_N = 18; // 红线：18（far/mid/near 各 6）
  var DRIFT_BANDS = [
    { cls: "d-far", n: 6, size: 9.5, speed: [7, 11], y0: 0.1, y1: 0.44 },
    { cls: "d-mid", n: 6, size: 14.5, speed: [14, 20], y0: 0.26, y1: 0.68 },
    { cls: "d-near", n: 6, size: 21, speed: [24, 32], y0: 0.46, y1: 0.9 },
  ];
  var bgSvg = null; // 屏幕空间覆盖层 <svg>（不随镜头缩放）
  var bgW = 0;
  var bgH = 0;
  var driftCubes = []; // {x, y, size, vx, dir, bobA, bobW, bobP, band, el}
  var driftRaf = null;
  var driftLast = 0;

  // ---- L1 静态底座：暖色地面光池 + 等轴测网格 ----
  function buildL1(defs, layerFloor, layerGrid, ang) {
    var rg = mk("radialGradient", { id: "eu-ptx-gridFade", cx: "50%", cy: "50%", r: "62%" });
    rg.appendChild(mk("stop", { offset: "0%", "stop-color": "#fff", "stop-opacity": "0.85" }));
    rg.appendChild(mk("stop", { offset: "34%", "stop-color": "#fff", "stop-opacity": "0.58" }));
    rg.appendChild(mk("stop", { offset: "60%", "stop-color": "#fff", "stop-opacity": "0.27" }));
    rg.appendChild(mk("stop", { offset: "82%", "stop-color": "#fff", "stop-opacity": "0.08" }));
    rg.appendChild(mk("stop", { offset: "100%", "stop-color": "#fff", "stop-opacity": "0" }));
    var rg2 = mk("radialGradient", { id: "eu-ptx-poolFade", cx: "50%", cy: "50%", r: "50%" });
    rg2.appendChild(mk("stop", { offset: "0%", "stop-color": "#e8c191", "stop-opacity": "0.145" }));
    rg2.appendChild(mk("stop", { offset: "34%", "stop-color": "#dcb47e", "stop-opacity": "0.088" }));
    rg2.appendChild(mk("stop", { offset: "64%", "stop-color": "#c9a271", "stop-opacity": "0.036" }));
    rg2.appendChild(mk("stop", { offset: "100%", "stop-color": "#c9a271", "stop-opacity": "0" }));
    var rg3 = mk("radialGradient", { id: "eu-ptx-hazeFade", cx: "50%", cy: "50%", r: "50%" });
    rg3.appendChild(mk("stop", { offset: "0%", "stop-color": "#c2a274", "stop-opacity": "0.07" }));
    rg3.appendChild(mk("stop", { offset: "46%", "stop-color": "#a8937a", "stop-opacity": "0.032" }));
    rg3.appendChild(mk("stop", { offset: "78%", "stop-color": "#8fa0a8", "stop-opacity": "0.014" }));
    rg3.appendChild(mk("stop", { offset: "100%", "stop-color": "#8fa0a8", "stop-opacity": "0" }));
    var mask = mk("mask", {
      id: "eu-ptx-gridMask",
      maskUnits: "userSpaceOnUse",
      x: BOUNDS.x,
      y: BOUNDS.y,
      width: BOUNDS.w,
      height: BOUNDS.h,
    });
    mask.appendChild(mk("rect", { x: BOUNDS.x, y: BOUNDS.y, width: BOUNDS.w, height: BOUNDS.h, fill: "url(#eu-ptx-gridFade)" }));
    defs.appendChild(rg);
    defs.appendChild(rg2);
    defs.appendChild(rg3);
    defs.appendChild(mask);

    // 地面光池：外层远景雾 + 内层暖色光斑（随镜头移动 → 构成本页唯一的"景深"）
    layerFloor.appendChild(
      mk("ellipse", {
        class: "eu-ptx-pool",
        cx: BOUNDS.x + BOUNDS.w * 0.5,
        cy: BOUNDS.y + BOUNDS.h * 0.58,
        rx: BOUNDS.w * 0.62,
        ry: BOUNDS.h * 0.46,
        fill: "url(#eu-ptx-hazeFade)",
      })
    );
    layerFloor.appendChild(
      mk("ellipse", {
        class: "eu-ptx-pool",
        cx: BOUNDS.x + BOUNDS.w * 0.5,
        cy: BOUNDS.y + BOUNDS.h * 0.62,
        rx: BOUNDS.w * 0.44,
        ry: BOUNDS.h * 0.32,
        fill: "url(#eu-ptx-poolFade)",
      })
    );

    // 等轴测地面网格（范围取节点包围盒外扩 460，步长 128，遮罩淡出）
    var gx0 = 1e9;
    var gx1 = -1e9;
    var gz0 = 1e9;
    var gz1 = -1e9;
    for (var id in LAYOUT.nodes) {
      var g = LAYOUT.nodes[id];
      gx0 = Math.min(gx0, g.X);
      gx1 = Math.max(gx1, g.X);
      gz0 = Math.min(gz0, g.Z);
      gz1 = Math.max(gz1, g.Z);
    }
    gx0 -= 460;
    gx1 += 460;
    gz0 -= 460;
    gz1 += 460;
    var gStep = 128;
    var gridG = mk("g", { mask: "url(#eu-ptx-gridMask)", opacity: "0.6" });
    for (var x = Math.ceil(gx0 / gStep) * gStep; x <= gx1; x += gStep) {
      var p1 = P(x, gz0, 0, ang);
      var p2 = P(x, gz1, 0, ang);
      gridG.appendChild(mk("line", { class: "eu-ptx-gridline", x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }));
    }
    for (var z = Math.ceil(gz0 / gStep) * gStep; z <= gz1; z += gStep) {
      var q1 = P(gx0, z, 0, ang);
      var q2 = P(gx1, z, 0, ang);
      gridG.appendChild(mk("line", { class: "eu-ptx-gridline", x1: q1.x, y1: q1.y, x2: q2.x, y2: q2.y }));
    }
    layerGrid.appendChild(gridG);
  }

  // ---- L1 漂浮立方块：屏幕空间覆盖层（LCG 固定种子 → 可复现；resize 时重排） ----
  function syncDrift() {
    if (!bgSvg) return;
    var W = bgSvg.clientWidth || 900;
    var H = bgSvg.clientHeight || 600;
    bgW = W;
    bgH = H;
    bgSvg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var ang = LAYOUT ? LAYOUT.ang : 0;
    var seed = 20260918;
    var rnd = function () {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    var idx = 0;
    DRIFT_BANDS.forEach(function (b) {
      for (var k = 0; k < b.n; k++) {
        var c = driftCubes[idx];
        if (!c) {
          c = { x: 0, y: 0, size: 0, vx: 0, dir: 1, bobA: 0, bobW: 0, bobP: 0, band: "", el: mk("g", { class: "eu-ptx-dcube" }) };
          bgSvg.appendChild(c.el);
          driftCubes[idx] = c;
        }
        c.band = b.cls;
        c.size = b.size * (0.82 + rnd() * 0.36);
        c.dir = rnd() < 0.35 ? -1 : 1;
        c.vx = (b.speed[0] + rnd() * (b.speed[1] - b.speed[0])) * c.dir;
        c.y = H * (b.y0 + rnd() * (b.y1 - b.y0));
        c.bobA = 2.5 + rnd() * 3.5; // 浮沉振幅（px）
        c.bobW = ((12 + rnd() * 11) / 1000) * Math.PI * 2; // 浮沉角速度（rad/s，周期 12~23s）
        c.bobP = rnd() * Math.PI * 2;
        c.x = ((k + rnd()) / b.n) * (W + 360) - 180; // 档内横向均匀分层，避免局部空隙
        c.el.setAttribute("class", "eu-ptx-dcube " + b.cls);
        while (c.el.firstChild) c.el.removeChild(c.el.firstChild);
        var hx = c.size / 2;
        var geom = cubeGeom(hx, hx, c.size * 0.78, ang);
        c.el.appendChild(mk("polygon", { class: "f-z", points: pts(geom.fz) }));
        c.el.appendChild(mk("polygon", { class: "f-x", points: pts(geom.fx) }));
        c.el.appendChild(mk("polygon", { class: "f-top", points: pts(geom.top) }));
        c.el.setAttribute("transform", "translate(" + c.x.toFixed(1) + "," + c.y.toFixed(1) + ")");
        idx++;
      }
    });
  }

  // ---- L1 漂浮：常驻低调 rAF（唯一破例层），页面隐藏时暂停推进 ----
  function driftStep(now) {
    driftRaf = requestAnimationFrame(driftStep);
    if (document.hidden || !bgW) {
      driftLast = now;
      return;
    }
    var dt = Math.min(100, now - driftLast);
    driftLast = now;
    var t = now / 1000;
    for (var i = 0; i < driftCubes.length; i++) {
      var c = driftCubes[i];
      if (!c.el) continue;
      c.x += c.vx * (dt / 1000);
      if (c.x > bgW + 180) c.x = -180;
      else if (c.x < -180) c.x = bgW + 180;
      var y = c.y + Math.sin(t * c.bobW + c.bobP) * c.bobA;
      c.el.setAttribute("transform", "translate(" + c.x.toFixed(1) + "," + y.toFixed(1) + ")");
    }
  }

  function startDrift() {
    if (driftRaf != null) return;
    driftLast = performance.now();
    driftRaf = requestAnimationFrame(driftStep);
  }

  // ---- 镜头：视野 → 目标（宽高比对齐舞台，配合 meet 不留黑边） ----
  function aspectFit(cx, cy, w, h) {
    var sw = stage ? stage.clientWidth : 0;
    var sh = stage ? stage.clientHeight : 0;
    if (sw > 0 && sh > 0) {
      var asp = sw / sh;
      if (w / h < asp) w = h * asp;
      else h = w / asp;
    }
    return { x: cx - w / 2, y: cy - h / 2, w: w, h: h };
  }

  // 生长拟合目标：已生长节点（含下一个将生长节点的前瞻）当前屏幕位置的包围盒，
  // 外扩 FIT_PAD 并兜底最小局部视野尺寸。
  function fitTarget(p) {
    var N = ORDER.length;
    var upto = Math.min(N, Math.floor(p * N) + 1); // 前瞻：纳入下一个将生长的节点
    var x0 = 1e9;
    var y0 = 1e9;
    var x1 = -1e9;
    var y1 = -1e9;
    var found = false;
    for (var i = 0; i < upto; i++) {
      var g = LAYOUT.nodes[ORDER[i]];
      if (!g) continue;
      var e = PROG[ORDER[i]] || 0;
      var y0v = g.kind === "stele" ? 0 : g.H * e;
      var cur = P(g.X, g.Z, y0v, LAYOUT.ang);
      x0 = Math.min(x0, cur.x);
      x1 = Math.max(x1, cur.x);
      y0 = Math.min(y0, cur.y - g.mh - (g.kind === "stele" ? STELE_BASE_H + 30 : 26)); // 含碑顶/印记余量
      y1 = Math.max(y1, cur.y);
      found = true;
    }
    if (!found) {
      var g0 = LAYOUT.nodes[ORDER[0]];
      var c0 = P(g0.X, g0.Z, 0, LAYOUT.ang);
      x0 = x1 = c0.x;
      y0 = y1 = c0.y;
    }
    var w = Math.max(x1 - x0 + FIT_PAD * 2, FIT_MIN_W);
    var h = Math.max(y1 - y0 + FIT_PAD * 2, FIT_MIN_H);
    return aspectFit((x0 + x1) / 2, (y0 + y1) / 2, w, h);
  }

  // 聚焦目标：以「聚焦瞬间节点在舞台内的相对位置」为锚，把节点钉在原地放大。
  // anchor 由调用方提供（悬停 = focusAnchor，抽屉锁定 = detAnchor，R21）
  function focusTarget(id, anchor) {
    var g = LAYOUT.nodes[id];
    var e = PROG[id] || 0;
    var y0 = g.kind === "stele" ? 0 : g.H * e;
    var c = P(g.X, g.Z, y0, LAYOUT.ang);
    var w = CAM_FOCUS_W;
    var sw = stage ? stage.clientWidth : 0;
    var sh = stage ? stage.clientHeight : 0;
    var h = sw > 0 && sh > 0 ? (w * sh) / sw : w;
    var fx = anchor ? anchor.fx : 0.5;
    var fy = anchor ? anchor.fy : 0.5;
    return { x: c.x - fx * w, y: c.y - fy * h, w: w, h: h };
  }

  // 节点当前在舞台内的相对位置（0~1），用于确定聚焦锚点
  function nodeStageFrac(id) {
    if (!stage || !VB || !LAYOUT || !LAYOUT.nodes[id]) return null;
    var g = LAYOUT.nodes[id];
    var e = PROG[id] || 0;
    var y0 = g.kind === "stele" ? 0 : g.H * e;
    var p = P(g.X, g.Z, y0, LAYOUT.ang);
    return { fx: (p.x - VB.x) / VB.w, fy: (p.y - VB.y) / VB.h };
  }

  function camEnsure() {
    if (camRaf != null) return;
    camLast = performance.now();
    camRaf = requestAnimationFrame(camStep);
  }

  // 镜头推进一步：目标优先级 = 抽屉锁定（R21）> 悬停聚焦 > 生长拟合；收敛后停帧
  function camStep(now) {
    camRaf = null;
    var dt = Math.min(64, Math.max(1, now - camLast));
    camLast = now;
    var focusing = false;
    var t;
    if (detFor && LAYOUT.nodes[detFor]) {
      t = focusTarget(detFor, detAnchor); // 抽屉打开期间保持特写，不回全景（R21）
      focusing = true;
    } else if (focusId && LAYOUT.nodes[focusId]) {
      t = focusTarget(focusId, focusAnchor);
      focusing = true;
    } else {
      t = growTarget;
    }
    if (!t) return;
    if (!VB) {
      VB = { x: t.x, y: t.y, w: t.w, h: t.h };
    } else {
      var base = focusing ? CAM_FOCUS_LERP : CAM_FIT_LERP;
      var k = 1 - Math.pow(1 - base, dt / 16.67); // 帧率无关的指数逼近
      VB.x += (t.x - VB.x) * k;
      VB.y += (t.y - VB.y) * k;
      VB.w += (t.w - VB.w) * k;
      VB.h += (t.h - VB.h) * k;
    }
    svg.setAttribute("viewBox", VB.x.toFixed(1) + " " + VB.y.toFixed(1) + " " + VB.w.toFixed(1) + " " + VB.h.toFixed(1));
    if (tipFor) positionTip(); // 镜头移动时浮层持续贴住节点
    var conv = Math.abs(t.x - VB.x) < CAM_EPS && Math.abs(t.y - VB.y) < CAM_EPS && Math.abs(t.w - VB.w) < CAM_EPS && Math.abs(t.h - VB.h) < CAM_EPS;
    if (!conv) camRaf = requestAnimationFrame(camStep);
  }

  // 悬停聚焦开关（用户行为触发，非常驻推镜）
  function setFocus(id) {
    if (focusId === id) return;
    if (id === lastFocusOff.id && performance.now() - lastFocusOff.t < FOCUS_RELOCK_MS) return; // 刚移开的节点：防抖
    focusAnchor = nodeStageFrac(id) || { fx: 0.5, fy: 0.5 };
    focusId = id;
    camEnsure();
  }

  function clearFocus() {
    if (focusId == null) return;
    lastFocusOff.id = focusId;
    lastFocusOff.t = performance.now();
    focusId = null;
    focusAnchor = null;
    camEnsure();
  }

  // SVG 用户坐标 → 页面 client 坐标（tooltip/下钻定位用；viewBox 宽高比已对齐舞台）
  function userToClient(x, y) {
    if (!stage || !VB) return null;
    var r = stage.getBoundingClientRect();
    var s = r.width / VB.w;
    return { x: r.left + (x - VB.x) * s, y: r.top + (y - VB.y) * s };
  }

  /* ==========================================================================
   * 模块段 5 · playback —— 播放/暂停/重播 + 滚动推进；结束即停帧
   * ======================================================================== */
  var raf = null;
  var mode = "scroll"; // scroll（滚动驱动，默认） | playing（播放中） | manual（手动接管）
  var PLAY_MS = 76200; // 单次完整生长约 76s（R24 → R31 → R40：节点数 76→119→126，保持 R1 认可的 ≈0.605s/节点）

  function cancelRaf() {
    if (raf != null) cancelAnimationFrame(raf);
    raf = null;
  }

  function setProgress(p, newMode) {
    cancelRaf();
    if (newMode) mode = newMode;
    p = clamp01(p);
    if (Math.abs(p - progress) < 1e-4) return;
    draw(p);
  }

  function play() {
    cancelRaf();
    var from = progress >= 0.999 ? 0 : progress;
    if (from > 0 && progress >= 0.999) draw(0);
    mode = "playing";
    var t0 = performance.now();
    var step = function (now) {
      if (mode !== "playing") return;
      var p = Math.min(1, from + ((now - t0) / PLAY_MS) * (1 - from));
      draw(p);
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        // 生长播放结束：停帧，主体层完全静止
        raf = null;
        mode = "manual";
        if (ui.btnPlay) ui.btnPlay.textContent = "▶";
      }
    };
    raf = requestAnimationFrame(step);
  }

  function pause() {
    cancelRaf();
    if (mode === "playing") mode = "manual";
  }

  function reset() {
    cancelRaf();
    mode = "scroll";
    draw(0);
    play(); // 页面无滚动条时 scroll 驱动到不了 1：重播一律走播放通道
  }

  // 页面实际可滚动才启用 scroll 驱动（R25）：舞台贴合视口后本页无滚动条，
  // scrollProgressTarget() 公式对「舞台顶在视口中部」恒算出 p≈0.5——把它当初始
  // 进度会让刷新后从半程开始生长。初始一律 0，可滚动页面仍保留滚动叙事。
  function pageCanScroll() {
    return (document.documentElement.scrollHeight || 0) > (window.innerHeight || 0) + 8;
  }

  // 滚动推进：把页面滚动位置映射为生长进度（仅 scroll 模式且页面可滚动时生效）
  function scrollProgressTarget() {
    if (!stage) return 0;
    var r = stage.getBoundingClientRect();
    var vh = window.innerHeight || 800;
    return clamp01((vh * 0.88 - r.top) / (r.height + vh * 0.5));
  }

  function syncFromScroll(force) {
    if (mode !== "scroll" || !pageCanScroll()) return;
    var p = scrollProgressTarget();
    if (force || Math.abs(p - progress) > 5e-4) draw(p);
  }

  /* ==========================================================================
   * 模块段 6 · interact —— L3 交互层：hover 定位浮层 + click 叙事抽屉（R15）
   * 显隐统一为 hidden + .eu-ptx-on 两段式（透明度/位移过渡 ≤240ms，无循环动效）
   * 悬停除浮层外还驱动镜头中速聚焦（setFocus / clearFocus，见模块段 4b）
   * ======================================================================== */
  var tipEl = null; // #progress-tooltip（页面锚点）
  var detEl = null; // #progress-detail（页面锚点；视口右侧固定抽屉）
  var tipFor = null; // 当前浮层对应节点 id
  var detFor = null; // 当前下钻抽屉对应节点 id（null = 收起；同时只有一个抽屉）
  var detAnchor = null; // 抽屉锁定聚焦的锚点（R21：打开瞬间节点在舞台内的相对位置）
  var tipW = 0; // 浮层实测尺寸缓存（镜头逐帧移动时复用以避免反复触发重排）
  var tipH = 0;
  var tipHideT = null;
  var detHideT = null;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // 节点当前生长位置 → 页面 client 坐标（经自适应视野 viewBox 映射）
  function nodeClientPos(id) {
    if (!LAYOUT || !LAYOUT.nodes[id] || !svg || !stage) return null;
    var g = LAYOUT.nodes[id];
    var e = PROG[id] || 0;
    var y0 = g.kind === "stele" ? 0 : g.H * e;
    var p = P(g.X, g.Z, y0, LAYOUT.ang);
    return userToClient(p.x, p.y);
  }

  // ---- hover 定位浮层（R15：label + 状态·日期 + gist 一句话） ----
  function fillTooltip(n) {
    while (tipEl.firstChild) tipEl.removeChild(tipEl.firstChild);
    tipEl.appendChild(el("span", "eu-ptx-tt__t", n.label));
    var meta = el("span", "eu-ptx-tt__m", STATUS_CN[n.status] + " · " + (n.date ? n.date : "未开始"));
    if (n.vMark) meta.appendChild(el("span", "eu-ptx-tt__v", "[V] 人类裁决"));
    tipEl.appendChild(meta);
    if (n.gist) tipEl.appendChild(el("span", "eu-ptx-tt__s", n.gist));
  }

  // 浮层定位：贴住节点（默认上方，空间不足翻到下方）；镜头移动时由 camStep 反复调用
  function positionTip() {
    if (!tipFor || !tipEl || tipEl.hidden) return;
    var c = nodeClientPos(tipFor);
    if (!c) return;
    var vw = window.innerWidth || 1024;
    var x = Math.max(8 + tipW / 2, Math.min(vw - 8 - tipW / 2, c.x));
    var y = c.y - tipH - 30; // 默认置于节点上方，避开立方体本体
    if (y < 8) y = c.y + 34; // 上方空间不足 → 放到节点下方
    tipEl.style.left = Math.round(x) + "px";
    tipEl.style.top = Math.round(y) + "px";
  }

  function showTip(id) {
    var n = byId[id];
    if (!n || !tipEl) return;
    clearTimeout(tipHideT);
    // 同一节点重复进入（pointermove 逐帧触发）→ 只校正位置，不重测量（避免逐帧强制重排）
    if (tipFor === id && !tipEl.hidden) {
      tipEl.classList.add("eu-ptx-on");
      positionTip();
      return;
    }
    fillTooltip(n);
    tipFor = id;
    // 先去 hidden、保持透明以测量尺寸，再定位，最后下一帧加 .on 触发过渡
    tipEl.classList.remove("eu-ptx-on");
    tipEl.hidden = false;
    tipW = tipEl.offsetWidth;
    tipH = tipEl.offsetHeight;
    positionTip();
    requestAnimationFrame(function () {
      if (tipFor === id && !tipEl.hidden) tipEl.classList.add("eu-ptx-on");
    });
  }

  function hideTip() {
    tipFor = null;
    if (!tipEl || tipEl.hidden) return;
    tipEl.classList.remove("eu-ptx-on");
    clearTimeout(tipHideT);
    tipHideT = setTimeout(function () {
      tipEl.hidden = true;
    }, 170);
  }

  // ---- click 叙事抽屉（R15 + R30：分层叙事、密度受控） ----
  // 视觉层次自上而下：眉标（归属 + 节点 id）→ 标题 → 状态/元信息标签行 → 导语 →
  // 三步来龙去脉 → 内部构成清单 → 工程口径（默认折叠）→ 交叉引用 → 页脚功能字段。
  // 「原文默认折叠」是本轮降密度的关键：叙事与工程原文不再同屏争视觉权重，
  // 普通读者一眼看到的是故事，需要口径原文时再展开。
  var KIND_CN = { stele: "主线碑", gate: "支线入口", sub: "内部任务", node: "分支节点" };

  function nodeKind(n) {
    if (STELE_IDS.indexOf(n.id) >= 0) return "stele";
    if (n.gate) return "gate";
    if (n.innerSub) return "sub";
    return "node";
  }

  function detailSection(title, extra) {
    var sec = el("section", "eu-dt__sec");
    if (title) {
      var h = el("h4", "eu-dt__h", title);
      if (extra) h.appendChild(el("span", "eu-dt__hn", extra));
      sec.appendChild(h);
    }
    return sec;
  }

  function fillDetail(n) {
    while (detEl.firstChild) detEl.removeChild(detEl.firstChild);
    var kind = nodeKind(n);

    // ① 眉标：先回答「这是哪条线上的什么节点」
    var top = el("div", "eu-dt__top");
    top.appendChild(el("span", "eu-dt__kicker", (n.lane || TRUNK_LANE) + " · " + n.id));
    var x = el("button", "eu-dt__x", "✕");
    x.type = "button";
    x.setAttribute("aria-label", "关闭节点详情");
    x.addEventListener("click", function (ev) {
      ev.stopPropagation();
      closeDetail(true);
    });
    top.appendChild(x);
    detEl.appendChild(top);

    // ② 标题
    detEl.appendChild(el("h3", "eu-dt__title", n.label));

    // ③ 标签行：状态胶囊 + 日期 + 层级 + 标记
    var tags = el("div", "eu-dt__tags");
    tags.appendChild(el("span", "eu-dt__pill is-" + n.status, STATUS_CN[n.status]));
    tags.appendChild(el("span", "eu-dt__tag", n.date ? n.date : "未开始"));
    tags.appendChild(el("span", "eu-dt__tag", KIND_CN[kind]));
    if (n.vMark) tags.appendChild(el("span", "eu-dt__tag is-v", "[V] 人类裁决"));
    detEl.appendChild(tags);

    // ④ 导语（gist）：读者向一句话，抽屉内最大字号
    if (n.gist) detEl.appendChild(el("p", "eu-dt__lead", n.gist));

    // ⑤ 来龙去脉：三步叙事轨（为什么 → 做了什么 → 结果），仅碑与支线入口持有
    if (n.story) {
      var secS = detailSection("来龙去脉");
      var ol = el("ol", "eu-dt__story");
      [
        ["为什么做", n.story.why],
        ["做了什么", n.story.what],
        ["结果如何", n.story.result],
      ].forEach(function (row) {
        if (!row[1]) return;
        var li = document.createElement("li");
        li.appendChild(el("span", "eu-dt__sk", row[0]));
        li.appendChild(el("p", "eu-dt__sv", row[1]));
        ol.appendChild(li);
      });
      secS.appendChild(ol);
      detEl.appendChild(secS);
    }

    // ⑥ 内部构成清单（仅碑与支线入口；碑的内部 tasks 不做成树节点）
    if (n.tasks && n.tasks.length) {
      var done = 0;
      n.tasks.forEach(function (t) {
        if (t[1] && t[1].indexOf("已闭合") === 0) done++;
      });
      var summary = done === n.tasks.length ? n.tasks.length + " 项 · 全部闭合" : done + " / " + n.tasks.length + " 已闭合";
      var secT = detailSection("内部构成", summary);
      var ulT = el("ul", "eu-dt__tasks");
      n.tasks.forEach(function (t) {
        var li = document.createElement("li");
        li.appendChild(el("span", "eu-dt__dot" + (t[1] && t[1].indexOf("已闭合") === 0 ? " is-on" : "")));
        li.appendChild(el("span", "eu-dt__tt", t[0]));
        if (t[1]) li.appendChild(el("span", "eu-dt__ts", t[1]));
        ulT.appendChild(li);
      });
      secT.appendChild(ulT);
      detEl.appendChild(secT);
    }

    // ⑦ 工程口径（原文）——默认折叠
    if (n.detail) {
      var raw = document.createElement("details");
      raw.className = "eu-dt__raw";
      var sum = document.createElement("summary");
      sum.appendChild(el("span", null, "工程口径（原文）"));
      var hint = el("span", "eu-dt__rawhint", "展开");
      sum.appendChild(hint);
      raw.appendChild(sum);
      raw.appendChild(el("p", "eu-dt__rawp", n.detail));
      raw.addEventListener("toggle", function () {
        hint.textContent = raw.open ? "收起" : "展开";
      });
      detEl.appendChild(raw);
    }

    // ⑧ 交叉引用 chips
    if (n.links && n.links.length) {
      var secL = detailSection("交叉引用");
      var ul = el("ul", "eu-dt__links");
      n.links.forEach(function (lk) {
        var li = document.createElement("li");
        li.appendChild(el("code", null, lk));
        ul.appendChild(li);
      });
      secL.appendChild(ul);
      detEl.appendChild(secL);
    }

    // ⑨ 页脚：功能性字段下沉，不参与叙事阅读
    detEl.appendChild(el("div", "eu-dt__foot", "父节点 " + (n.parent || "—") + " · 所属 " + (n.lane || TRUNK_LANE)));
  }

  function syncAriaExpanded() {
    if (!DOM) return;
    DOM.nodeEls.forEach(function (ne) {
      ne.grp.setAttribute("aria-expanded", detFor === ne.id ? "true" : "false");
    });
  }

  function openDetail(id, byKeyboard) {
    var n = byId[id];
    if (!n || !detEl) return;
    clearTimeout(detHideT);
    hideTip();
    fillDetail(n);
    var reopen = detFor === id && !detEl.hidden;
    detFor = id;
    detAnchor = nodeStageFrac(id) || { fx: 0.42, fy: 0.42 }; // 锁定特写锚点（R21）
    camEnsure(); // 抽屉打开期间镜头保持特写，不缩回全景
    syncAriaExpanded();
    if (reopen) return;
    detEl.classList.remove("eu-ptx-on");
    detEl.hidden = false;
    requestAnimationFrame(function () {
      if (detFor === id && !detEl.hidden) detEl.classList.add("eu-ptx-on");
    });
    if (byKeyboard) detEl.focus();
  }

  function closeDetail(refocus) {
    var id = detFor;
    detFor = null;
    detAnchor = null;
    camEnsure(); // 释放锁定：镜头回到悬停聚焦或生长拟合目标（R21）
    syncAriaExpanded();
    if (!detEl || detEl.hidden) return;
    detEl.classList.remove("eu-ptx-on");
    clearTimeout(detHideT);
    detHideT = setTimeout(function () {
      detEl.hidden = true;
    }, 190);
    if (refocus && id && DOM && DOM.nodeElsById[id]) {
      refocusSuppressUntil = performance.now() + 80; // 焦点归还的 a11y 语义保留，但不触发镜头
      DOM.nodeElsById[id].grp.focus();
    }
  }

  function toggleDetail(id, byKeyboard) {
    if (detFor === id && detEl && !detEl.hidden) closeDetail(false);
    else openDetail(id, byKeyboard);
  }

  // 键盘可达性：focus/blur 与鼠标 hover 等价（鼠标 hover 由舞台级 pointermove 统一驱动，
  // 见 onStagePointerMove —— 不用逐节点的 mouseenter/mouseleave，避免"节点自己长到指针下"
  // 或镜头移动导致的伪 hover / 伪 leave 抖动）。
  // refocusSuppressUntil：关闭抽屉时程序性归还焦点（grp.focus()）不触发浮层/聚焦镜头——
  // 否则「关闭」会被 focus 处理器立即拉回特写，释放锁定（R21）失效
  var refocusSuppressUntil = 0;
  function bindHover(elm, id) {
    elm.addEventListener("focus", function () {
      if (performance.now() < refocusSuppressUntil) return;
      showTip(id);
      setFocus(id);
    });
    elm.addEventListener("blur", function () {
      hideTip();
      clearFocus();
    });
  }

  // 指针在舞台内移动 → 取指针下的节点作为 hover 目标。
  // 只有"指针真的动了"才会改变 hover 态：节点生长到静止指针下、镜头推拉都不触发切换。
  function onStagePointerMove(ev) {
    var t = ev.target;
    var g = t && t.closest ? t.closest("g.eu-ptx-cube[data-node-id]") : null;
    var id = g ? g.getAttribute("data-node-id") : null;
    if (id) {
      showTip(id);
      setFocus(id);
    } else if (tipFor || focusId) {
      hideTip();
      clearFocus();
    }
  }

  // 绑定节点交互；build() 重建 SVG 后须重挂
  function bindInteract() {
    if (!DOM) return;
    DOM.nodeEls.forEach(function (ne) {
      var n = byId[ne.id];
      if (!n) return;
      ne.grp.setAttribute("tabindex", "0");
      ne.grp.setAttribute("role", "button");
      ne.grp.setAttribute("aria-label", n.label + "，" + STATUS_CN[n.status] + "，" + (n.date ? n.date : "未开始"));
      ne.grp.setAttribute("aria-controls", "progress-detail");
      ne.grp.setAttribute("aria-expanded", detFor === ne.id ? "true" : "false");
      bindHover(ne.grp, ne.id);
      ne.grp.addEventListener("click", function (ev) {
        ev.stopPropagation();
        toggleDetail(ne.id, false);
      });
      ne.grp.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          ev.stopPropagation();
          toggleDetail(ne.id, true);
        }
      });
    });
  }

  function initInteract() {
    tipEl = document.getElementById("progress-tooltip");
    detEl = document.getElementById("progress-detail");
    if (tipEl) tipEl.setAttribute("role", "tooltip");
    if (detEl) {
      detEl.setAttribute("role", "region");
      detEl.setAttribute("aria-label", "节点详情");
      detEl.setAttribute("tabindex", "-1");
      detEl.addEventListener("click", function (ev) {
        ev.stopPropagation();
      });
    }
    // 面板外点击 → 收起
    document.addEventListener("click", function () {
      if (detFor) closeDetail(false);
    });
    // Esc → 收起面板 / 隐藏浮层
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") {
        if (detFor) closeDetail(true);
        else hideTip();
      }
    });
    // 页面滚动使浮层定位失效 → 直接隐藏
    window.addEventListener("scroll", hideTip, { passive: true });
    window.addEventListener("resize", hideTip);
    // 鼠标 hover / 聚焦：舞台级统一驱动（指针不动则不改变 hover 态 → 生长与推镜都不抖）
    if (stage) {
      stage.addEventListener("pointermove", onStagePointerMove, { passive: true });
      stage.addEventListener("pointerleave", function () {
        hideTip();
        clearFocus();
      });
    }
  }

  /* ==========================================================================
   * 模块段 7 · api —— 事件发射器 + 查询/坐标接口
   * ======================================================================== */
  var listeners = {};

  function on(evt, cb) {
    (listeners[evt] = listeners[evt] || []).push(cb);
  }

  function off(evt, cb) {
    var arr = listeners[evt];
    if (!arr) return;
    var i = arr.indexOf(cb);
    if (i >= 0) arr.splice(i, 1);
  }

  function emit(evt, payload) {
    var arr = listeners[evt];
    if (!arr) return;
    arr.slice().forEach(function (cb) {
      try {
        cb(payload);
      } catch (e) {
        if (window.console) console.error("[progress-tree] listener error:", e);
      }
    });
  }

  /* ==========================================================================
   * 模块段 8 · boot —— fetch 数据、挂载、样式注入、控件、降级保护
   * ======================================================================== */
  var CSS = [
    ".eu-ptx{margin:0 0 1rem;font-family:'Noto Sans SC','PingFang SC','Microsoft YaHei',system-ui,sans-serif;}",
    // 舞台：暖调深色底（微米黄偏暗，非纯黑）+ 无滚动条/无裁剪（视野由镜头自适应拟合）
    // 高度由 fitStageHeight() 按视口实测覆写（内联 height 优先），此处仅为 JS 未就绪时的兜底
    ".eu-ptx__stage{position:relative;overflow:hidden;height:520px;min-height:300px;border:1px solid rgba(232,228,220,0.15);border-radius:10px;",
    "background:radial-gradient(125% 95% at 50% 36%,#1b1710 0%,#14120d 48%," + PANEL_BG + " 100%);}",
    // L1-a 漂浮立方块层：屏幕空间覆盖层（不随镜头 viewBox 缩放 → 密度/尺寸恒定）
    ".eu-ptx__bgx{position:absolute;left:0;top:0;width:100%;height:100%;z-index:1;display:block;}",
    // L1-b 纵深雾化：顶缘冷色环境光 + 暖色中心辉光 + 极柔和四周压暗（固定层，只压背景不压主体）
    ".eu-ptx__fog{position:absolute;left:0;top:0;width:100%;height:100%;z-index:2;pointer-events:none;",
    "background:radial-gradient(92% 48% at 50% -6%,rgba(126,158,186,0.075) 0%,rgba(126,158,186,0.022) 46%,transparent 72%),",
    "radial-gradient(62% 48% at 50% 64%,rgba(214,178,124,0.11) 0%,rgba(214,178,124,0.035) 50%,transparent 78%),",
    "radial-gradient(124% 94% at 50% 44%,transparent 28%,rgba(7,6,4,0.13) 56%,rgba(7,6,4,0.36) 80%,rgba(7,6,4,0.62) 100%);}",
    // L2 主体层
    ".eu-ptx__svg{position:absolute;left:0;top:0;width:100%;height:100%;z-index:3;display:block;}",
    // 内嵌极简控件：两枚图标按钮叠在画布右上角
    ".eu-ptx__ctl{position:absolute;top:10px;right:10px;z-index:8;display:flex;gap:6px;opacity:0.45;transition:opacity .15s ease;}",
    ".eu-ptx__ctl:hover{opacity:1;}",
    ".eu-ptx__ctl button{width:30px;height:30px;padding:0;background:rgba(18,16,11,0.72);color:#e8e4dc;",
    "border:1px solid rgba(232,228,220,0.3);border-radius:6px;font-size:13px;line-height:1;cursor:pointer;font-family:inherit;}",
    ".eu-ptx__ctl button:hover{border-color:rgba(232,228,220,0.7);}",
    // 以下颜色仅作用于暖色画布内部（等轴测体量、轨道、薄片、投影）
    ".eu-ptx-gridline{stroke:rgba(206,186,152,0.32);stroke-width:0.6;}",
    ".eu-ptx-rail{fill:rgba(232,228,220,0.055);}",
    ".eu-ptx-rail-edge{fill:none;stroke:rgba(232,228,220,0.24);stroke-width:0.9;}",
    ".eu-ptx-sleeper{stroke:rgba(232,228,220,0.13);stroke-width:0.8;}",
    ".eu-ptx-root{fill:rgba(232,228,220,0.05);stroke:rgba(232,228,220,0.2);stroke-width:0.8;}",
    ".eu-ptx-shadow{fill:rgba(0,0,0,0.3);}", // 柔和接地暗部：深底画布上过黑的投影会被读成无意义「黑框」
    // L1 漂浮立方块面：三档纵深「近大亮、远小暗」的暖色层级
    ".eu-ptx-dcube .f-top{fill:rgba(232,214,178,0.10);}",
    ".eu-ptx-dcube .f-x{fill:rgba(232,214,178,0.055);}",
    ".eu-ptx-dcube .f-z{fill:rgba(232,214,178,0.032);}",
    ".eu-ptx-dcube.d-far .f-top{fill:rgba(226,206,170,0.07);}",
    ".eu-ptx-dcube.d-far .f-x{fill:rgba(226,206,170,0.035);}",
    ".eu-ptx-dcube.d-far .f-z{fill:rgba(226,206,170,0.022);}",
    ".eu-ptx-dcube.d-mid .f-top{fill:rgba(232,216,186,0.13);}",
    ".eu-ptx-dcube.d-mid .f-x{fill:rgba(232,216,186,0.07);}",
    ".eu-ptx-dcube.d-mid .f-z{fill:rgba(232,216,186,0.044);}",
    ".eu-ptx-dcube.d-near .f-top{fill:rgba(240,226,198,0.20);stroke:rgba(240,226,198,0.22);stroke-width:0.6;}",
    ".eu-ptx-dcube.d-near .f-x{fill:rgba(240,226,198,0.105);}",
    ".eu-ptx-dcube.d-near .f-z{fill:rgba(240,226,198,0.06);}",
    // 景深：远景块整体虚化（大气透视），近景块加一圈暖色辉光
    ".eu-ptx-dcube{will-change:transform;}",
    ".eu-ptx-dcube.d-far{filter:blur(1.7px);}",
    ".eu-ptx-dcube.d-mid{filter:blur(0.85px);}",
    ".eu-ptx-dcube.d-near{filter:blur(0.25px) drop-shadow(0 0 5px rgba(240,226,198,0.22));}",
    // 极缓慢的"呼吸"（11~15s 一个来回）
    "@keyframes eu-ptx-breathe{from{opacity:0.74;}to{opacity:1;}}",
    ".eu-ptx-dcube.d-mid{animation:eu-ptx-breathe 15s ease-in-out infinite alternate;}",
    ".eu-ptx-dcube.d-near{animation:eu-ptx-breathe 11s ease-in-out infinite alternate;}",
    // 支线墙薄片：对比度按目视反馈上调（原 0.075/0.032/0.135 在深底上几乎隐形，「支线像没了」）
    ".eu-ptx-wallfront{fill:rgba(232,228,220,0.1);}",
    ".eu-ptx-wallcap{fill:rgba(232,228,220,0.05);}",
    ".eu-ptx-walltop{fill:rgba(232,228,220,0.17);stroke:rgba(232,228,220,0.36);stroke-width:0.9;}",
    ".eu-ptx-wallrim{fill:none;stroke:rgba(232,228,220,0.74);stroke-width:1.4;}",
    // 归并汇流弧（R22）：空中虚线弧 + 末端空心菱形印记（暗金中性，不与 [V]/赤色混淆）
    ".eu-ptx-merge{fill:none;stroke:rgba(206,186,152,0.42);stroke-width:1.1;stroke-dasharray:5 6;}",
    ".eu-ptx-merge-mark{fill:none;stroke:rgba(206,186,152,0.72);stroke-width:1.1;}",
    ".eu-ptx-cube{cursor:pointer;}",
    ".eu-ptx-hit{fill:transparent;}",
    // [V] 悬浮菱形印记 + 引线（中性色）
    ".eu-ptx-vmk-lead{stroke:" + INK_DIM + ";stroke-width:0.8;}",
    ".eu-ptx-vmk{fill:none;stroke:" + INK + ";stroke-width:1.2;}",
    // 当前断点信标线（全页唯一赤的延伸，仅断点节点本体）
    ".eu-ptx-beacon-lead{stroke:" + RED + ";stroke-width:1.6;}",
    ".eu-ptx-beacon{fill:" + RED + ";}",
    ".eu-ptx-cube:hover .f-top:not(.f-base){stroke:#ffffff;stroke-width:1.6;}",
    ".eu-ptx-cube:focus{outline:none;}",
    ".eu-ptx-cube:focus .f-top:not(.f-base){stroke:#ffffff;stroke-width:1.6;}",
    // L3 hover 浮层（fixed 定位覆盖页面 style 块的 absolute；仅透明度/位移过渡，无循环动效）
    "#progress-tooltip{position:fixed;left:0;top:0;z-index:1090;margin:0;opacity:0;transform:translate(-50%,8px);",
    "transition:opacity .16s ease,transform .16s ease;box-shadow:0 6px 24px rgba(0,0,0,0.45);max-width:320px;",
    // 显式深底浅字：页面 .eu-pt__tooltip 的白底（var(--global-bg-color)）与深色画布冲突，
    // 以 ID 选择器（特异性更高）整体接管配色；子元素 span 显式 inherit 防主题全局规则破继承
    "padding:0.6rem 0.85rem;border:1px solid rgba(232,228,220,0.22);border-radius:8px;background:#1a1712;color:#e8e4dc;",
    "font-size:0.85rem;line-height:1.55;pointer-events:none;}",
    "#progress-tooltip span{color:inherit;}",
    "#progress-tooltip *{color:inherit;}",
    "#progress-tooltip.eu-ptx-on{opacity:1;transform:translate(-50%,0);}",
    ".eu-ptx-tt__t{display:block;font-weight:700;font-size:0.88rem;line-height:1.4;}",
    ".eu-ptx-tt__m{display:block;font-size:0.76rem;opacity:0.72;margin-top:0.15rem;}",
    ".eu-ptx-tt__v{display:inline-block;font-size:0.72rem;font-weight:700;border:1px solid rgba(128,128,128,0.55);",
    "border-radius:4px;padding:0 0.3rem;margin-left:0.35rem;vertical-align:0.05em;}",
    ".eu-ptx-tt__s{display:block;font-size:0.8rem;line-height:1.5;margin-top:0.35rem;opacity:0.9;}",
    // L3 click 叙事抽屉（R30 重设计）：视口右侧固定、右滑入——不在页面下方占用任何版面。
    // 观感取向 = 留白 + 发丝线分区（不靠边框盒子堆叠），层次由字号/字重/透明度建立
    "#progress-detail{position:fixed;top:0;right:0;height:100%;width:min(400px,94vw);margin:0;z-index:1080;overflow-y:auto;",
    // color 必须显式给出：抽屉背景为固定深色，若继承站点主题字色（浅色主题=深字）会黑底黑字不可读
    "padding:1.35rem 1.6rem 3rem;background:linear-gradient(180deg,#181510 0%,#12100b 62%,#100e0a 100%);color:#e9e5dd;",
    "border:0;border-left:1px solid rgba(232,228,220,0.13);border-radius:0;box-shadow:-26px 0 60px rgba(0,0,0,0.6);",
    "font-size:0.9rem;line-height:1.7;transform:translateX(100%);opacity:0;",
    "transition:transform .26s cubic-bezier(.22,.61,.36,1),opacity .26s ease;",
    "scrollbar-width:thin;scrollbar-color:rgba(232,228,220,0.18) transparent;}",
    "#progress-detail.eu-ptx-on{transform:translateX(0);opacity:1;}",
    "#progress-detail[hidden]{display:none;}",
    "#progress-detail:focus{outline:none;}",
    "#progress-detail::-webkit-scrollbar{width:8px;}",
    "#progress-detail::-webkit-scrollbar-thumb{background:rgba(232,228,220,0.16);border-radius:4px;}",
    // 主题全局规则直接命中 p/h/div/li/span/strong 并染色（连带把抽屉内的分区 div 染黑，
    // 使 p 的 inherit 落到黑父上）→ 通配 inherit 一刀切，容器浅字色直达所有后代
    "#progress-detail *{color:inherit;box-sizing:border-box;}",
    // ① 顶栏：眉标（归属 + 节点 id）+ 关闭
    ".eu-dt__top{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:0.8rem;}",
    ".eu-dt__kicker{font-size:0.68rem;font-weight:600;letter-spacing:0.16em;opacity:0.5;text-transform:uppercase;}",
    ".eu-dt__x{flex:none;width:26px;height:26px;padding:0;background:transparent;color:inherit;border:1px solid rgba(232,228,220,0.18);",
    "border-radius:50%;font-size:12px;line-height:1;cursor:pointer;font-family:inherit;opacity:0.6;",
    "transition:opacity .15s ease,border-color .15s ease;}",
    ".eu-dt__x:hover{opacity:1;border-color:rgba(232,228,220,0.5);}",
    // ② 标题
    ".eu-dt__title{margin:0 0 0.7rem;font-size:1.28rem;font-weight:700;line-height:1.42;letter-spacing:0.01em;}",
    // ③ 标签行
    ".eu-dt__tags{display:flex;flex-wrap:wrap;gap:0.4rem;align-items:center;margin-bottom:1.15rem;}",
    ".eu-dt__pill{font-size:0.7rem;font-weight:700;letter-spacing:0.06em;padding:0.16rem 0.6rem;border-radius:999px;",
    "border:1px solid rgba(232,228,220,0.28);}",
    ".eu-dt__pill.is-closed{background:rgba(232,228,220,0.14);border-color:transparent;}",
    ".eu-dt__pill.is-active{border-color:rgba(232,228,220,0.55);}",
    ".eu-dt__pill.is-notstarted,.eu-dt__pill.is-unknown{border-style:dashed;opacity:0.72;}",
    ".eu-dt__pill.is-break{background:" + RED + ";border-color:" + RED + ";color:#fff;}",
    ".eu-dt__tag{font-size:0.7rem;opacity:0.55;padding:0.16rem 0.5rem;border-radius:999px;background:rgba(232,228,220,0.05);}",
    ".eu-dt__tag.is-v{opacity:0.85;font-weight:700;letter-spacing:0.04em;border:1px solid rgba(232,228,220,0.3);background:transparent;}",
    // ④ 导语
    ".eu-dt__lead{margin:0 0 1.5rem;font-size:1.02rem;font-weight:600;line-height:1.75;letter-spacing:0.01em;",
    "padding-left:0.95rem;border-left:2px solid rgba(232,228,220,0.45);}",
    // ⑤⑥⑧ 分区与区标题
    ".eu-dt__sec{margin-top:1.5rem;}",
    ".eu-dt__h{display:flex;align-items:baseline;justify-content:space-between;gap:0.8rem;font-size:0.7rem;font-weight:700;",
    "letter-spacing:0.18em;text-transform:uppercase;opacity:0.5;margin:0 0 0.7rem;padding:0;border:0;}",
    ".eu-dt__hn{font-size:0.68rem;font-weight:600;letter-spacing:0.06em;opacity:0.85;text-transform:none;}",
    // ⑤ 三步叙事轨（编号点 + 竖连接线；结果一段加重）
    ".eu-dt__story{margin:0;padding:0;list-style:none;}",
    ".eu-dt__story li{position:relative;padding-left:1.5rem;margin-bottom:1.05rem;}",
    ".eu-dt__story li:last-child{margin-bottom:0;}",
    ".eu-dt__story li::before{content:'';position:absolute;left:0.33rem;top:0.42rem;width:7px;height:7px;border-radius:50%;",
    "background:rgba(232,228,220,0.42);}",
    ".eu-dt__story li::after{content:'';position:absolute;left:0.6rem;top:1.15rem;bottom:-1.05rem;width:1px;background:rgba(232,228,220,0.14);}",
    ".eu-dt__story li:last-child::after{display:none;}",
    ".eu-dt__sk{display:block;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;opacity:0.5;margin-bottom:0.2rem;}",
    ".eu-dt__sv{margin:0;font-size:0.87rem;line-height:1.8;}",
    ".eu-dt__story li:last-child .eu-dt__sv{font-weight:600;}",
    ".eu-dt__story li:last-child::before{background:rgba(232,228,220,0.85);}",
    // ⑥ 内部构成清单
    ".eu-dt__tasks{margin:0;padding:0;list-style:none;}",
    ".eu-dt__tasks li{display:flex;align-items:baseline;gap:0.55rem;font-size:0.84rem;line-height:1.65;padding:0.32rem 0;",
    "border-bottom:1px solid rgba(232,228,220,0.07);}",
    ".eu-dt__tasks li:last-child{border-bottom:0;}",
    ".eu-dt__dot{flex:none;width:6px;height:6px;border-radius:50%;border:1px solid rgba(232,228,220,0.4);margin-top:0.5rem;}",
    ".eu-dt__dot.is-on{background:rgba(232,228,220,0.6);border-color:transparent;}",
    ".eu-dt__tt{flex:1;}",
    ".eu-dt__ts{flex:none;font-size:0.68rem;opacity:0.5;}",
    // ⑦ 工程口径（默认折叠）
    ".eu-dt__raw{margin-top:1.5rem;border-top:1px solid rgba(232,228,220,0.1);}",
    ".eu-dt__raw summary{display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;",
    "font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;opacity:0.5;padding:0.85rem 0 0;}",
    ".eu-dt__raw summary::-webkit-details-marker{display:none;}",
    ".eu-dt__raw[open] summary{opacity:0.75;}",
    ".eu-dt__rawhint{font-size:0.66rem;font-weight:600;letter-spacing:0.06em;text-transform:none;opacity:0.8;}",
    ".eu-dt__rawp{margin:0.7rem 0 0;font-size:0.79rem;line-height:1.8;opacity:0.72;white-space:pre-line;",
    "padding-left:0.95rem;border-left:1px solid rgba(232,228,220,0.18);}",
    // ⑧ 交叉引用 chips
    ".eu-dt__links{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:0.4rem;}",
    ".eu-dt__links li{margin:0;}",
    ".eu-dt__links code{display:inline-block;font-size:0.72rem;line-height:1.5;padding:0.22rem 0.55rem;border-radius:6px;",
    "background:rgba(232,228,220,0.06);border:1px solid rgba(232,228,220,0.1);word-break:break-all;}",
    // ⑨ 页脚功能字段
    ".eu-dt__foot{margin-top:1.8rem;padding-top:0.9rem;border-top:1px solid rgba(232,228,220,0.1);",
    "font-size:0.68rem;letter-spacing:0.06em;opacity:0.42;}",
  ].join("\n");

  var STAGE_MIN_H = 300; // 舞台高度下限（低于此值画面太小，宁可让页面出现滚动条）
  var STAGE_MAX_H = 900; // 舞台高度上限
  var lastStageTopDoc = -1; // 上次贴合时舞台的文档顶距（用于识别迟到的布局位移）

  // 舞台高度贴合视口 —— 打开页面即完整看到整幅画面，页面不产生纵向滚动条。
  // 【为什么不用 documentElement.scrollHeight】根元素的滚动高度在内容短于视口时会
  // 被钳制到视口高，于是 belowExtra 里混进了"视口 − 舞台底边"这一项，公式变成
  // H = H − 余量 的自反馈，每次调用把舞台高度一路压到下限。
  function belowStageExtra() {
    var sy = window.pageYOffset || 0;
    var stageBottom = stage.getBoundingClientRect().bottom + sy;
    var maxY = stageBottom;
    var el = stage.parentElement;
    while (el && el !== document.body && el !== document.documentElement) {
      var cs = getComputedStyle(el);
      var r = el.getBoundingClientRect();
      maxY = Math.max(maxY, r.bottom + sy + (parseFloat(cs.marginBottom) || 0));
      for (var s = el.nextElementSibling; s; s = s.nextElementSibling) {
        if (getComputedStyle(s).position === "fixed") continue;
        var sr = s.getBoundingClientRect();
        if (sr.height > 0) maxY = Math.max(maxY, sr.bottom + sy);
      }
      el = el.parentElement;
    }
    var bodyPad = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
    return { extra: Math.max(0, maxY + bodyPad - stageBottom), bodyPad: bodyPad };
  }

  function fitStageHeight() {
    if (!stage) return;
    var r = stage.getBoundingClientRect();
    var topDoc = r.top + (window.pageYOffset || 0);
    var vh = window.innerHeight || 800;
    var below = belowStageExtra();
    var foot = document.querySelector("footer, .footer");
    var footH = 0;
    if (foot) {
      var fr = foot.getBoundingClientRect();
      if (getComputedStyle(foot).position === "fixed" && fr.height > 0 && fr.top > 0) footH = Math.round(fr.height);
    }
    // 主题已用 body padding-bottom 预留过的部分不再重复扣减
    var overlay = Math.max(0, footH - below.bodyPad);
    var avail = vh - topDoc - below.extra - overlay - 6;
    stage.style.height = Math.round(Math.max(STAGE_MIN_H, Math.min(avail, STAGE_MAX_H))) + "px";
    lastStageTopDoc = topDoc;
  }

  // 尺寸/布局变化后统一重排：舞台高度 → 重新求解布局（扇面随宽高比伸缩）→
  // 视野按新宽高比重拟合 → 覆盖层重排 → 重绘。
  function relayout(force) {
    var before = stage ? stage.style.height : null;
    fitStageHeight();
    if (!force && VB && stage && stage.style.height === before) return;
    VB = null;
    build(0); // 宽高比可能已变：重新求解支线墙方位角并重建场景
    syncDrift();
    draw(progress);
  }

  function init(host, raw) {
    loadData(raw);
    if (!NODES.length || !STELE_IDS.length) throw new Error("progress 数据为空或缺少主线碑");

    // 样式（自包含注入，不改页面文件）
    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    // 控件骨架：舞台（内含右上角极简控件）；图例已按 R23 移除，
    // 构筑规范固化于 spec「图例构筑规范（R23）」
    var wrap = document.createElement("div");
    wrap.className = "eu-ptx";
    stage = document.createElement("div");
    stage.className = "eu-ptx__stage";
    // 舞台分四层（z-index 见 CSS）：漂浮立方块覆盖层 → 纵深雾化 → 主 SVG → 控件
    bgSvg = mk("svg", { class: "eu-ptx__bgx" });
    bgSvg.setAttribute("aria-hidden", "true");
    var fog = document.createElement("div");
    fog.className = "eu-ptx__fog";
    fog.setAttribute("aria-hidden", "true");
    svg = mk("svg", { class: "eu-ptx__svg" });
    stage.appendChild(bgSvg);
    stage.appendChild(fog);
    stage.appendChild(svg);
    var ctl = document.createElement("div");
    ctl.className = "eu-ptx__ctl";
    var btnPlay = document.createElement("button");
    btnPlay.type = "button";
    btnPlay.textContent = "▶";
    btnPlay.title = "生长 / 暂停";
    btnPlay.setAttribute("aria-label", "生长 / 暂停");
    var btnReplay = document.createElement("button");
    btnReplay.type = "button";
    btnReplay.textContent = "↺";
    btnReplay.title = "重播";
    btnReplay.setAttribute("aria-label", "重播");
    ctl.appendChild(btnPlay);
    ctl.appendChild(btnReplay);
    stage.appendChild(ctl);
    wrap.appendChild(stage);
    host.appendChild(wrap);
    ui = { btnPlay: btnPlay };

    initInteract(); // L3：锚定 #progress-tooltip / #progress-detail，挂全局收起监听
    // 初始化成功：先隐藏 Liquid 静态降级清单（JS 失败时它保持可见）——
    // 必须在量测舞台高度之前，否则降级清单会把"舞台以下留白"撑得极大
    var lanes = host.querySelectorAll(".eu-pt-lane");
    for (var i = 0; i < lanes.length; i++) lanes[i].hidden = true;
    fitStageHeight(); // 舞台高度贴合视口（整幅画面打开即完整可见，页面无纵向滚动条）
    build(0);
    syncDrift(); // L1：按舞台尺寸铺设三档漂浮立方块
    startDrift(); // L1 漂浮常驻循环（人类批准的唯一破例层；L2 仍停帧）

    // 播放控制：▶/⏸ 单键切换 + ↺ 重播（内嵌画布右上角）
    btnPlay.addEventListener("click", function () {
      if (mode === "playing") {
        pause();
      } else {
        play();
      }
      btnPlay.textContent = mode === "playing" ? "⏸" : "▶";
    });
    btnReplay.addEventListener("click", function () {
      cancelRaf();
      draw(0);
      play();
      btnPlay.textContent = "⏸";
    });

    // 滚动推进（被动监听；仅 scroll 模式且进度变化时重绘）
    window.addEventListener(
      "scroll",
      function () {
        syncFromScroll(false);
      },
      { passive: true }
    );
    // 视口尺寸变化 → 重排舞台高度与布局（扇面随宽高比重新求解）并同步覆盖层
    window.addEventListener("resize", function () {
      relayout(true);
      syncFromScroll(false);
    });
    // 迟到的布局变化（字体/图片/页脚脚本）会把舞台整体下移，使先前算出的高度超出视口。
    // 三重兜底：load 事件 + ResizeObserver + 若干次延时重贴合（仅高度确实变化时才重排）。
    if (document.readyState === "complete") relayout(false);
    else
      window.addEventListener("load", function () {
        relayout(false);
      });
    if (typeof ResizeObserver === "function") {
      new ResizeObserver(function () {
        if (!stage) return;
        var t = stage.getBoundingClientRect().top + (window.pageYOffset || 0);
        if (Math.abs(t - lastStageTopDoc) > 2) relayout(false);
      }).observe(document.body);
    }
    [200, 700, 1600, 3000].forEach(function (ms) {
      setTimeout(function () {
        relayout(false);
      }, ms);
    });

    // 初始进度（R25）：页面可滚动时按滚动位置起播（滚动叙事）；
    // 无滚动条页面保持 0 —— scrollProgressTarget 恒 ≈0.5，不能作为初值
    if (pageCanScroll()) syncFromScroll(true);
    // 打开页面自动生长：舞台高度贴合视口后本页无滚动条，scroll 驱动到不了 1，
    // 日期序靠后的支线节点将永不出现（用户目视即「支线没了」）→ 自动播放补全，⏸ 可打断
    setTimeout(function () {
      if (mode === "scroll") {
        play();
        if (ui.btnPlay) ui.btnPlay.textContent = "⏸";
      }
    }, 600);
    emit("ready", { count: NODES.length, dataAsOf: DATA_AS_OF });
  }

  var booted = false;
  var bootError = null;
  (function boot() {
    var host = document.getElementById("progress-tree");
    if (!host) return; // 非本页：静默退出
    var url = window.PROGRESS_DATA_URL;
    if (!url || typeof fetch !== "function") return; // 无数据通道：保留 Liquid 静态降级清单
    fetch(url, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status + " " + url);
        return r.json();
      })
      .then(function (raw) {
        init(host, raw);
        booted = true;
      })
      .catch(function (err) {
        bootError = err;
        if (window.console) console.error("[progress-tree] 数据加载或初始化失败，恢复静态降级清单：", err);
        // R26：progress.md 内联脚本可能已把降级清单预隐藏（防闪现）——
        // fetch/初始化失败时必须恢复其可见，否则页面只剩空容器
        var lanes = host.querySelectorAll(".eu-pt-lane");
        for (var i = 0; i < lanes.length; i++) lanes[i].hidden = false;
      });
  })();

  /* ==========================================================================
   * 公开接口（E2E 取证 / 交互层在此之上扩展）
   * ======================================================================== */
  return {
    VERSION: "1.3.0-structure",
    ready: function () {
      return booted;
    },
    error: function () {
      return bootError;
    },
    dataAsOf: function () {
      return DATA_AS_OF;
    },
    nodes: function () {
      return NODES.slice();
    },
    order: function () {
      return ORDER.slice();
    },
    steles: function () {
      return STELE_IDS.slice();
    },
    walls: function () {
      return WALL_DEFS.map(function (w) {
        return {
          key: w.key,
          name: w.name,
          anchor: w.anchorIdx != null ? STELE_IDS[w.anchorIdx] : w.anchorId,
          parentWall: w.anchorIdx != null ? null : NODE_WALL[w.anchorId] ? NODE_WALL[w.anchorId].wall.key : null,
          count: w.ids.length,
          innerSub: w.innerSub,
          hasGate: w.hasGate,
          psi: w.psi,
          uShift: w.uShift,
        };
      });
    },
    confluence: function () {
      return CONFLUENCE ? { to: CONFLUENCE.to, from: CONFLUENCE.from.slice() } : null;
    },
    getNode: function (id) {
      return byId[id] || null;
    },
    statusOf: function (id) {
      return byId[id] ? byId[id].status : null;
    },
    // 节点 SVG 组元素（带 data-node-id / data-status），可绑定 hover/click
    getNodeElement: function (id) {
      return DOM && DOM.nodeElsById[id] ? DOM.nodeElsById[id].grp : null;
    },
    // 节点在 SVG 用户坐标系中的当前屏幕位置（随生长进度）
    getNodeScreenPos: function (id) {
      if (!LAYOUT || !LAYOUT.nodes[id]) return null;
      var g = LAYOUT.nodes[id];
      var e = PROG[id] || 0;
      var y0 = g.kind === "stele" ? 0 : g.H * e;
      var cur = P(g.X, g.Z, y0, LAYOUT.ang);
      return { x: cur.x, y: cur.y };
    },
    // SVG 用户坐标 → 页面 client 坐标（浮层定位用，经自适应视野映射）
    svgToClient: function (x, y) {
      return userToClient(x, y);
    },
    stageEl: function () {
      return stage;
    },
    svgEl: function () {
      return svg;
    },
    layout: function () {
      return LAYOUT;
    },
    progress: function () {
      return progress;
    },
    // L3：当前下钻抽屉对应节点 id（null = 收起）
    detailOpen: function () {
      return detFor;
    },
    mode: function () {
      return mode;
    },
    // L1/镜头取证接口（E2E 断言用）
    viewBox: function () {
      return VB ? { x: VB.x, y: VB.y, w: VB.w, h: VB.h } : null;
    },
    focusId: function () {
      return focusId;
    },
    driftCount: function () {
      return driftCubes.length;
    },
    driftBands: function () {
      return driftCubes.map(function (c) {
        return { band: c.band, size: c.size, vx: c.vx };
      });
    },
    bgEl: function () {
      return bgSvg;
    },
    setProgress: function (p) {
      setProgress(p, "manual");
    },
    play: play,
    pause: pause,
    reset: reset,
    on: on,
    off: off,
    // 重建布局并重绘当前进度（方位角重新求解）
    rebuild: function (ang) {
      if (!booted) return;
      build(typeof ang === "number" ? ang : 0);
    },
  };
})();
