# Implementation Plan: 修复记忆长廊滑动——仅第一张显示

**Branch**: `004-fix-gallery-photos` | **Date**: 2026-03-11 | **Spec**: [spec.md](./spec.md)

## Summary

`js/main.js` 的 `goToScene()` 函数使用 `translateX(-${index * 100}%)` 平移长廊容器。由于百分比是相对于元素**自身宽度**计算的，而容器宽度为8个屏幕宽（800vw），每次切换实际偏移量是预期的8倍，导致场景2~8飞出视口。

**修复**：将位移单位改为 `vw`（视口宽度）：`translateX(-${index * 100}vw)`，确保每次切换恰好移动一个屏幕宽度，与场景数量无关。

## Technical Context

**Language/Version**: JavaScript ES2020+（原生，无框架）
**Primary Dependencies**: 无新增
**Storage**: N/A
**Testing**: 手动目视验收（与主项目豁免策略一致，纯静态网页）
**Target Platform**: 手机浏览器（iOS Safari / Android Chrome）+ 桌面浏览器
**Project Type**: 纯静态网页单页应用
**Performance Goals**: 场景切换动画保持 60fps，无卡顿
**Constraints**: 不新增文件；修改范围仅限 `js/main.js` 的一行代码
**Scale/Scope**: 1个文件，1行修改

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 门控项 | 状态 | 说明 |
|--------|------|------|
| 可读性 | ✅ 通过 | 修改后代码意图更清晰（`vw` 单位明确表达"一个屏幕宽"）|
| 禁用代码生成框架 | ✅ 通过 | 无任何框架依赖 |
| 测试覆盖率 | ✅ 豁免 | 纯静态网页视觉交互，无可运行的自动化测试框架，手动目视验收替代 |
| TDD 合规性 | ✅ 豁免 | 同上，前端视觉交互豁免 |
| Bug 复现测试 | ✅ 豁免（手动） | 本地 `python3 -m http.server 8080` 打开后点击「›」箭头可直接复现，修复后目视确认消除 |
| 性能目标已定义 | ✅ 通过 | 已定义：60fps，与改前一致（CSS transition 不变）|
| 用户体验一致性 | ✅ 通过 | 修复后切换行为符合用户预期，动画参数不变 |

## Project Structure

### Documentation (this feature)

```text
specs/004-fix-gallery-photos/
├── plan.md              # 本文件
├── checklists/
│   └── requirements.md  # 规格质量检查单（已完成）
└── tasks.md             # 任务清单（/speckit.tasks 生成）
```

### Source Code (repository root)

```text
js/
└── main.js    # goToScene() 函数，第97行：translateX 位移修复
```

**Structure Decision**: 无新增文件，单行修改。`vw` 单位由浏览器原生支持，兼容 iOS Safari 12+ / Chrome 70+，无需 polyfill。

## Phase 0 研究

**无需额外研究。** 根因已明确：

| 问题 | 根因 | 修复 |
|------|------|------|
| 场景2~8不可见 | `translateX(-100%)` 相对于容器自身宽度（800vw），实际偏移800vw | 改用 `translateX(-${index * 100}vw)`，每次固定偏移一个视口宽度 |

**备选方案对比**：

| 方案 | 代码 | 评价 |
|------|------|------|
| ✅ **选用** `vw` 单位 | `translateX(-${index * 100}vw)` | 最清晰，与"一个屏幕"语义一致，不依赖场景数量 |
| ❌ 容器百分比 | `translateX(-${index * 12.5}%)` | 12.5 = 100/8，魔法数字，场景数量变化时需同步修改 |
| ❌ 动态计算 | `translateX(-${index * (100/TOTAL)}%)` | 可接受但多余，`vw` 方案更直接 |

## Phase 1 设计

无新增数据实体、无 API 契约、无外部接口。跳过 data-model.md 和 contracts/。
