# 接口契约：场景数据模块

**模块**: `js/scenes.js`
**版本**: 1.0.0 | **日期**: 2026-03-11

---

## 概述

场景数据模块负责提供记忆长廊的全部场景内容，以及场景切换的状态管理。
其他模块（main.js、animations.js）通过此模块获取场景数据，不直接操作 DOM 场景元素。

---

## 导出接口

### `getScene(index)`

返回指定序号的场景对象。

| 参数 | 类型 | 说明 |
|------|------|------|
| index | number | 场景索引，范围 0-7 |

**返回值**:
```javascript
{
  id: number,           // 1-8
  ageLabel: string,     // 显示标签，如 "0岁"
  title: string,        // 场景标题
  fathersWords: string, // 爸爸的话（完整文本）
  photos: Array<{
    src: string,        // 相对路径，如 "assets/photos/scene-01-age0/age0-01.webp"
    alt: string         // 无障碍文本
  }>,
  easterEgg: {
    type: string,       // 彩蛋类型枚举：hearts|stars|sparkle|confetti|sakura|fireworks
    color: string       // CSS 颜色值
  }
}
```

**错误行为**:
- index < 0 或 index > 7：返回 `null`（调用方需处理）

---

### `getTotalScenes()`

返回场景总数（固定值 8）。

| 返回 | 类型 | 说明 |
|------|------|------|
| 8 | number | 场景总数 |

---

### `getBlessingStars()`

返回全部19颗祝福星数据数组。

**返回值**: `Array<BlessingStar>`，长度固定为 19，按 id 排序。

---

### `getSpecialStar()`

返回终幕彩蛋星（id=19）。

**返回值**: `BlessingStar`（isSpecial=true）

---

## 不变式

- `MEMORY_SCENES` 数组长度恒为 8
- `BLESSING_STARS` 数组长度恒为 19
- 有且仅有一颗 `isSpecial=true` 的星（id=19）
- 每个场景至少有 1 张照片
- 所有照片路径以 `assets/photos/` 开头

---

## 变更规则

修改场景文字（爸爸的话、祝福内容）：直接修改 `js/scenes.js` 中的数据常量。
添加或替换照片：在 `assets/photos/` 对应目录添加 WebP 文件并更新路径。
禁止从外部模块直接修改 `MEMORY_SCENES` 或 `BLESSING_STARS`（视为只读常量）。
