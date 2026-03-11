# Implementation Plan: 修复记忆长廊场景 6~8 照片不显示

**Branch**: `005-fix-gallery-scenes-6-8` | **Date**: 2026-03-11 | **Spec**: [spec.md](./spec.md)

## Summary

`js/scenes.js` 中对所有场景照片设置了 `img.loading = 'lazy'`（懒加载）。由于长廊的场景切换通过 CSS `transform: translateX()` 实现，浏览器以元素的**布局位置**（而非视觉渲染位置）判断是否触发懒加载。场景 6~8 的图片布局位置距初始视口 500~700vw，超出懒加载阈值，即使 CSS 已将场景滑入视口，图片也从未被加载。

**修复**：将 `img.loading = 'lazy'` 改为 `img.loading = 'eager'`。场景照片总数约 21 张，全量即时加载对性能无影响。

## Technical Context

**Language/Version**: JavaScript ES2020+（原生，无框架）
**Primary Dependencies**: 无新增
**Storage**: N/A
**Testing**: 手动目视验收（与主项目豁免策略一致，纯静态网页）
**Target Platform**: 手机浏览器（iOS Safari / Android Chrome）+ 桌面浏览器
**Project Type**: 纯静态网页单页应用
**Performance Goals**: 场景6~8照片在导航到时无白块；页面首次进入长廊时场景1照片立即可见
**Constraints**: 不新增文件；修改范围仅限 `js/scenes.js` 的一行代码；照片总量约21张，全量加载约2~5MB，移动端可接受
**Scale/Scope**: 1个文件，1行修改

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 门控项 | 状态 | 说明 |
|--------|------|------|
| 可读性 | ✅ 通过 | `eager` 语义比 `lazy` 更清晰地表达「立即加载」意图 |
| 禁用代码生成框架 | ✅ 通过 | 无任何框架依赖 |
| 测试覆盖率 | ✅ 豁免 | 纯静态网页，手动目视验收替代 |
| TDD 合规性 | ✅ 豁免 | 同上 |
| Bug 复现测试 | ✅ 豁免（手动） | 本地 http-server 打开后滑到场景6即可复现，修复后目视确认消除 |
| 性能目标已定义 | ✅ 通过 | 约21张照片全量加载，2~5MB 范围内可接受 |
| 用户体验一致性 | ✅ 通过 | 修复后8个场景行为一致，无例外 |

## Project Structure

### Documentation (this feature)

```text
specs/005-fix-gallery-scenes-6-8/
├── plan.md              # 本文件
├── checklists/
│   └── requirements.md  # 规格质量检查单（已完成）
└── tasks.md             # 任务清单（/speckit.tasks 生成）
```

### Source Code (repository root)

```text
js/
└── scenes.js    # renderAllScenes() 中的 img 元素，第180行：loading 属性修复
```

**Structure Decision**: 无新增文件，单行修改。`loading="eager"` 为 HTML 标准属性，所有现代浏览器原生支持，无需 polyfill。

## Phase 0 研究

**无需额外研究。** 根因已明确：

| 问题 | 根因 | 修复 |
|------|------|------|
| 场景6~8照片空白 | `loading="lazy"` 以布局位置判断加载时机，CSS transform 不影响该判断；场景6~8布局距视口500~700vw，超出阈值 | 改为 `loading="eager"`，所有场景照片在页面加载时立即开始获取 |

**备选方案对比**：

| 方案 | 说明 | 评价 |
|------|------|------|
| ✅ **选用** `loading="eager"` | 直接去除懒加载限制 | 最简洁，1行，语义清晰；21张照片全量约2~5MB，移动端可接受 |
| ❌ IntersectionObserver 手动懒加载 | 自己实现基于视口的懒加载 | 30~50行代码，过度工程，对本项目无必要 |
| ❌ `decoding="async"` | 异步解码，不影响加载时机 | 不解决问题，问题在于加载触发，不在于解码 |

## Phase 1 设计

无新增数据实体、无 API 契约、无外部接口。跳过 data-model.md 和 contracts/。
