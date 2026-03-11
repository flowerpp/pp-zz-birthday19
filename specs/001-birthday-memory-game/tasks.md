# 任务清单：《给19岁的你》— 壮壮生日互动叙事游戏

**输入**: 设计文档来自 `/specs/001-birthday-memory-game/`
**前提**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅

**测试策略**: 手动跨浏览器验收（已在宪法检查中豁免自动化测试，纯视觉交互项目）

## 格式：`[ID] [P?] [Story] 描述（文件路径）`

- **[P]**: 可并行执行（不同文件，无依赖关系）
- **[Story]**: 对应用户故事编号（US1-US4）
- **无 [P]**: 必须顺序执行，依赖前置任务

---

## Phase 1：搭建（项目初始化）

**目的**: 建立项目基础结构和 CI/CD 管道

- [x] T001 按 plan.md 创建目录结构（`assets/photos/scene-01～08/`、`assets/audio/`、`assets/fonts/`、`css/`、`js/`、`.github/workflows/`）
- [x] T002 [P] 创建 GitHub Actions 自动部署工作流 `.github/workflows/deploy.yml`（推送 main 分支触发，发布到 gh-pages 分支）
- [ ] T003 [P] 处理照片：将源目录精选照片转换为 WebP 格式，放入对应场景目录（详见 quickstart.md 图片处理步骤）
- [ ] T004 [P] 下载并放置生日快乐歌音频文件 `assets/audio/birthday-song.mp3`（≤ 2MB，mp3 格式）
- [ ] T005 [P] 下载手写风格字体（如「Ma Shan Zheng」或「ZCOOL KuaiLe」Google Fonts），保存至 `assets/fonts/`，同时保留 CSS font-face 回退

**检查点**: 目录结构完整，照片已就位，音频已就位 → 可进入 Phase 2

---

## Phase 2：基础层（所有用户故事的阻塞性前提）

**目的**: 核心骨架 HTML、主题 CSS、JS 状态机、数据常量 — 所有用户故事依赖这些基础

**⚠️ 关键**: 必须全部完成后，各用户故事才可开始实现

- [x] T006 创建 `index.html`：定义4个章节容器（`#intro`、`#gallery`、`#stars`、`#finale`），初始仅显示 `#intro`，其余 `display:none`；引入所有 CSS 和 JS 模块
- [x] T007 [P] 创建 `css/main.css`：定义全局主题 CSS 变量（蓝紫色系 `--color-primary`, `--color-accent`, `--color-bg`，字体变量，间距变量），设置全局 reset、box-sizing、移动端视口适配
- [x] T008 [P] 创建 `js/scenes.js`：定义 `MEMORY_SCENES`（8个场景数据，含 `id`、`ageLabel`、`fathersWords`、`photos[]`、`easterEgg`）和 `BLESSING_STARS`（19颗星数据，含 `id`、`blessing`、`isSpecial`、`position`），导出 `getScene()`、`getTotalScenes()`、`getBlessingStars()`、`getSpecialStar()` 接口（见 contracts/scene-data.md）
- [x] T009 创建 `js/audio.js`：实现 `initAudio()`、`startMusic()`、`toggleMusic()`、`isPlaying()` 接口（见 contracts/audio-contract.md）；`startMusic()` 必须在用户交互回调中同步调用；Promise rejected 时静默降级
- [x] T010 创建 `js/main.js`：实现应用状态机（`APP_STATES`：INTRO→GALLERY→STARS→FINALE），页面切换函数（隐藏当前章节、显示目标章节），`init()` 入口函数（调用 `initAudio()`，绑定"开始旅程"按钮事件）

**检查点**: `index.html` 在本地 HTTP 服务器可打开，页面空白但无 JS 报错，状态机可在控制台手动切换

---

## Phase 3：用户故事 1 — 序幕：推开时光之门（优先级: P1）🎯 MVP

**目标**: 用户打开页面看到星空封面动画、"开始旅程"按钮，点击后音乐响起并进入长廊

**独立验收**: 仅访问 `index.html`，在手机 Safari 和 Chrome 各验证一次完整序幕体验

- [x] T011 [US1] 在 `index.html` 的 `#intro` 容器中编写序幕 HTML：手写风格邀请信文字（「壮壮，推开这扇门，走进你的19年」）、「开始旅程」按钮、音频控制浮动按钮（右上角，图标：♪）
- [x] T012 [P] [US1] 创建 `css/scenes.css` 初始部分：`#intro` 全屏星空背景（CSS 渐变 `#0d0d2b → #1a1a4e`），星星小点用伪元素或 `box-shadow` 实现点阵效果
- [x] T013 [P] [US1] 创建 `css/animations.css`：`.fade-in-letter` 逐字淡入动画（`@keyframes`）、`.float-up` 元素向上浮现动画、`.pulse` 按钮呼吸动画
- [x] T014 [US1] 在 `js/main.js` 中实现序幕渲染：页面加载后触发邀请信文字逐字/逐行淡入动画（依赖 T013），延迟 1.5s 后显示「开始旅程」按钮
- [x] T015 [US1] 在 `js/main.js` 中绑定「开始旅程」点击事件：同步调用 `startMusic()`，然后执行 INTRO→GALLERY 状态切换动画（`.fade-in-letter` 淡出 → `#gallery` 淡入）
- [x] T016 [US1] 实现音频控制按钮交互：点击切换 `toggleMusic()`，按钮图标随状态切换（♪ / ⏸）；添加至 `css/main.css` 的浮动按钮样式

**检查点（US1 验收）**:
- [ ] 手机 Chrome：打开页面 → 看到星空 + 邀请文字淡入 → 点击「开始旅程」→ 音乐响起 → 进入长廊（空白但无报错）
- [ ] 手机 Safari：同上流程，音乐正常播放（不因自动播放限制失败）

---

## Phase 4：用户故事 2 — 记忆长廊：8个场景（优先级: P1）

**目标**: 8个人生阶段场景可顺序/前后浏览，每个场景展示照片、爸爸的话、彩蛋动画

**独立验收**: 从第1个场景滑动到第8个场景，每个场景照片加载正常，文字完整显示，点击照片触发彩蛋

- [x] T017 [US2] 在 `index.html` 的 `#gallery` 容器中编写长廊 HTML 骨架：场景包裹容器 `.scene-wrapper`（溢出隐藏）、单个场景模板 `.scene`（照片区 + 文字区 + 彩蛋容器）、进度指示器 `.progress-indicator`（「3 / 8」）、左右箭头按钮、底部「继续→」按钮（仅第8个场景显示）
- [x] T018 [P] [US2] 在 `css/scenes.css` 中添加长廊布局样式：`.scene-wrapper` 横向排列（`display:flex`，`width: 800%`）、`.scene` 单屏宽度（`width: 12.5%`）、手机竖屏适配（`height: 100dvh`）、相框效果（`box-shadow`、圆角、内边距）
- [x] T019 [P] [US2] 在 `css/scenes.css` 中添加场景过渡动画：`.scene-wrapper` 使用 `transform: translateX` + `transition: 0.5s ease`，实现平滑横向滑动
- [x] T020 [US2] 创建 `js/scenes.js` 场景渲染逻辑：`renderAllScenes()` 遍历 `MEMORY_SCENES`，为每个场景动态生成 DOM（`<picture><source type="image/webp"><img src="fallback.jpg"></picture>` + 爸爸的话文字），注入 `#gallery` 容器
- [x] T021 [US2] 在 `js/main.js` 中实现场景切换逻辑：`goToScene(index)` 更新 `translateX` 偏移量，更新进度指示器，处理首/末场景的箭头显示/隐藏
- [x] T022 [US2] 在 `js/main.js` 中绑定切换交互：桌面端左右箭头按钮点击事件 + 手机端 `touchstart`/`touchend` 滑动手势（阈值 50px，防止误触）
- [x] T023 [US2] 创建 `js/animations.js`：实现6种彩蛋动画类型（`hearts`、`stars`、`sparkle`、`confetti`、`sakura`、`fireworks`），每种类型在 Canvas 或 DOM 上创建短时粒子效果（持续 2s），暴露 `triggerEasterEgg(type, color, targetElement)` 接口
- [x] T024 [US2] 在 `js/scenes.js` 中为每个场景的照片绑定点击事件：调用 `triggerEasterEgg(scene.easterEgg.type, scene.easterEgg.color, photoElement)`
- [x] T025 [P] [US2] 在 `css/animations.css` 中添加爸爸文字区的样式：手写字体、行高、字号（手机屏 ≥ 16px）、文字淡入动画（场景切入时触发）

**检查点（US2 验收）**:
- [ ] 手机横滑：8个场景均可前后切换，进度指示器正确更新
- [ ] 每个场景：照片无破图（WebP 加载失败时 JPEG 回退正常）
- [ ] 点击任意照片：触发对应彩蛋动画，2s 后自动消失
- [ ] 第8个场景：显示「继续→」按钮，点击进入星光界面

---

## Phase 5：用户故事 3 — 19朵星光（优先级: P2）

**目标**: 19颗星星出现在星空中，逐一点开，每颗展示一句祝福

**独立验收**: 进入星光界面后，19颗星均可点击，每颗弹出对应祝福文字，文字手机屏可读

- [x] T026 [US3] 在 `index.html` 的 `#stars` 容器中编写星光 HTML 骨架：`.stars-field`（星空画布区）、`.blessing-popup`（弹窗，初始隐藏，含文字区和关闭按钮）
- [x] T027 [P] [US3] 在 `css/stars.css` 中定义星星样式：`.star` 圆形元素（大小 20-36px，随机渐变），`:hover` 发光效果（`box-shadow`），点击态放大（`transform: scale(1.5)`），已打开态变金色
- [x] T028 [P] [US3] 在 `css/stars.css` 中定义祝福弹窗样式：毛玻璃背景（`backdrop-filter: blur`），圆角卡片，手写字体，淡入动画；手机屏全宽显示、字号 ≥ 18px
- [x] T029 [US3] 创建 `js/stars.js`：`renderStars()` 遍历 `getBlessingStars()`，按 `position.x/y` 绝对定位在 `.stars-field` 中生成19个 `.star` 元素（带序号）；`enterStarsScene()` 触发星星依次飘落淡入动画（交错 `animation-delay`，总时长约 3s）
- [x] T030 [US3] 在 `js/stars.js` 中实现点击交互：点击 `.star` 显示 `.blessing-popup`（填入对应 `blessing` 文字），标记该星为已打开（CSS class 变色），记录到 `state.openedStars`；关闭按钮隐藏弹窗
- [x] T031 [US3] 在 `js/stars.js` 中检测所有星打开条件：每次关闭弹窗后检查 `state.openedStars.size === 19`，若满足则调用 `triggerFinale()`
- [x] T032 [US3] 在 `js/main.js` 中绑定「继续→」按钮：执行 GALLERY→STARS 状态切换，调用 `enterStarsScene()`

**检查点（US3 验收）**:
- [ ] 进入星光界面：19颗星依次飘落出现（约3s完成）
- [ ] 点击任意星：弹出对应祝福文字，文字手机屏清晰可读
- [ ] 点击关闭：星星变金色，状态正确记录
- [ ] 点开全部19颗：自动触发终幕（Phase 6 完成后验收）

---

## Phase 6：用户故事 4 — 终幕彩蛋（优先级: P2）

**目标**: 第19颗星触发全屏彩蛋，展示家庭照片 + 专属暗语 + 满屏粒子绽放

**独立验收**: 调用 `triggerFinale()` 函数，验证动画完整播放（≥5s），最终显示「重新旅行」按钮

- [x] T033 [US4] 在 `index.html` 的 `#finale` 容器中编写终幕 HTML：`.finale-overlay`（全屏蒙层）、`.finale-photo`（家庭照片，用 `<picture>`）、`.finale-message`（专属暗语文字）、`.finale-restart`（「重新旅行」按钮）
- [x] T034 [P] [US4] 在 `css/animations.css` 中添加终幕动画：`.finale-enter` 全屏淡入（黑→可见，1s）、`.finale-photo` 光晕放大出现（`scale(0.8)→scale(1)` + `filter:brightness`，1s延迟）、`.finale-message` 逐字淡入（2s延迟）
- [ ] T035 [P] [US4] 将终幕家庭精选照片转为 WebP 放入 `assets/photos/finale/finale.webp`（及 JPEG 回退）
- [x] T036 [US4] 在 `js/animations.js` 中实现满屏粒子绽放：`triggerFireworks()` 在 `<canvas>` 上运行 3s 烟花粒子系统（多色粒子，`requestAnimationFrame`，结束后自动移除 canvas），粒子颜色呼应蓝紫/粉色主题
- [x] T037 [US4] 在 `js/main.js` 中实现 `triggerFinale()`：执行 STARS→FINALE 状态切换，顺序触发：全屏淡入（0s）→ 音乐高潮重播（0.5s）→ 照片光晕出现（1s）→ 暗语文字淡入（2s）→ `triggerFireworks()`（2.5s）→ 显示「重新旅行」按钮（5s后）
- [x] T038 [US4] 绑定「重新旅行」按钮：FINALE→INTRO 状态重置（`state.openedStars.clear()`、`currentSceneIndex=0`），重新渲染序幕

**检查点（US4 验收）**:
- [ ] 点开第19颗星：自动进入终幕，全屏动画序列完整播放
- [ ] 动画时序正确：照片 → 文字 → 粒子 → 按钮，无跳帧卡顿
- [ ] 「重新旅行」：回到序幕，进度完全重置

---

## Phase 7：打磨与跨端适配

**目的**: 性能优化、跨浏览器适配、边界情况处理，确保手机体验完美

- [x] T039 [P] 图片懒加载：为 `#gallery` 中所有 `<img>` 添加 `loading="lazy"`，避免首屏加载所有照片
- [x] T040 [P] 照片占位骨架：图片加载前显示同尺寸蓝紫渐变占位块（CSS `background: linear-gradient`），加载完成后淡出占位块
- [x] T041 [P] 横屏适配：在 `css/main.css` 中添加 `@media (orientation: landscape)` 规则，确保场景布局在横屏下不裁剪核心内容
- [x] T042 [P] 快速连击防护：在场景切换函数中添加 `isAnimating` 标志位，动画进行中忽略重复触发
- [x] T043 [P] 降级兼容：若 `backdrop-filter` 不支持（Android Chrome < 76），弹窗改用半透明深色背景；若 Canvas 不支持，跳过粒子效果静默降级
- [ ] T044 完整跨浏览器手动验收：
  - iOS Safari（iPhone）：完整旅程 → 四个用户故事逐一验收
  - Android Chrome：同上
  - 桌面 Chrome：同上（键盘/鼠标操作）
  - 网络模拟 4G 限速：首屏 ≤ 5s 加载完成
- [ ] T045 [P] GitHub Pages 部署验收：推送 main 分支 → Actions 成功 → 公网链接可访问 → 手机用 4G 网络直接访问验收
- [ ] T046 [P] 更新 `CLAUDE.md` 和 `specs/001-birthday-memory-game/quickstart.md`，记录实际部署链接和任何变更

---

## 依赖关系与执行顺序

### Phase 依赖

- **Phase 1（搭建）**: 无依赖 → 立即开始
- **Phase 2（基础层）**: 依赖 Phase 1 完成 → 阻塞所有用户故事
- **Phase 3 US1**: 依赖 Phase 2 完成，不依赖其他用户故事
- **Phase 4 US2**: 依赖 Phase 2 + Phase 3 完成（GALLERY 入口在 US1 的「开始旅程」按钮里）
- **Phase 5 US3**: 依赖 Phase 4 完成（STARS 入口在 US2 的「继续→」按钮里）
- **Phase 6 US4**: 依赖 Phase 5 完成（FINALE 由 US3 的第19颗星触发）
- **Phase 7（打磨）**: 依赖 Phase 3-6 全部完成

### 用户故事内部依赖（严格顺序）

```
US1: T011 → T012/T013[P] → T014 → T015 → T016[P]
US2: T017 → T018/T019[P] → T020 → T021 → T022 → T023 → T024 → T025[P]
US3: T026 → T027/T028[P] → T029 → T030 → T031 → T032
US4: T033 → T034/T035[P] → T036 → T037 → T038
```

### 可并行机会

- **Phase 1**: T002、T003、T004、T005 全部并行
- **Phase 2**: T007、T008 可与 T006 并行（不同文件）；T009 和 T010 顺序执行
- **Phase 7**: T039～T043 全部并行，T044～T046 顺序

---

## 并行示例：Phase 2 基础层

```text
同时启动：
  任务 A: T006 创建 index.html 骨架
  任务 B: T007 创建 css/main.css 主题变量
  任务 C: T008 创建 js/scenes.js 数据常量

A、B、C 完成后顺序执行：
  任务 D: T009 创建 js/audio.js（依赖 T006 中的音频元素）
  任务 E: T010 创建 js/main.js 状态机（依赖 T007、T008、T009）
```

---

## 实现策略

### MVP 优先（仅用户故事 1）

1. 完成 Phase 1：搭建
2. 完成 Phase 2：基础层（**关键** — 阻塞所有故事）
3. 完成 Phase 3：US1 序幕
4. **停止并验收**：手机打开页面 → 看到星空封面 → 点击 → 音乐响起 ✅
5. 满意后继续 Phase 4

### 增量交付

1. Phase 1 + 2 → 空白框架可运行
2. + Phase 3 → 序幕完整 → 可展示给家人预览
3. + Phase 4 → 记忆长廊完整 → 核心内容已完整
4. + Phase 5 + 6 → 完整体验 → 上线！
5. + Phase 7 → 完美打磨 → 生日当天送出

---

## 任务汇总

| Phase | 任务数 | 并行任务 | 用户故事 |
|-------|--------|---------|---------|
| Phase 1 搭建 | 5 | 4 | — |
| Phase 2 基础层 | 5 | 2 | — |
| Phase 3 US1 序幕 | 6 | 2 | US1 |
| Phase 4 US2 长廊 | 9 | 3 | US2 |
| Phase 5 US3 星光 | 7 | 1 | US3 |
| Phase 6 US4 终幕 | 6 | 2 | US4 |
| Phase 7 打磨 | 8 | 6 | — |
| **合计** | **46** | **20** | **4个故事** |

---

## 备注

- `[P]` 任务 = 不同文件，无相互依赖，可并行启动
- 每个用户故事有独立的验收检查点，满足后再进入下一个故事
- 照片处理（T003）是最耗时的手动步骤，建议优先完成
- 每完成一个检查点后提交一次 git commit
- 部署链接确认后即可在生日当天发送给壮壮
