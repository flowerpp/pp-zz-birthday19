# 数据模型：《给19岁的你》

**分支**: `001-birthday-memory-game` | **日期**: 2026-03-11

---

## 核心实体

### 1. 记忆场景（MemoryScene）

代表记忆长廊中的一个人生阶段场景。

```javascript
/**
 * 记忆场景数据结构
 * 对应规格 FR-003, FR-004
 */
const MEMORY_SCENES = [
  {
    id: 1,                          // 场景序号（1-8）
    ageLabel: "0岁",                 // 年龄标签（显示用）
    title: "她来了",                  // 场景标题（可选显示）
    fathersWords: "2007年3月11日11点03分，...", // 爸爸的话（全文）
    photos: [                        // 精选照片列表（1-3张）
      {
        src: "assets/photos/scene-01-age0/age0-01.webp",
        alt: "壮壮0岁",              // 无障碍描述
        caption: ""                  // 照片说明（可空）
      }
    ],
    easterEgg: {                     // 点击彩蛋配置
      type: "hearts",                // 类型：hearts | stars | sparkle | confetti
      color: "#c9a0dc"               // 主色调（蓝紫系）
    }
  }
  // ... 场景 2-8 同结构
];
```

**8个场景完整定义**：

| id | ageLabel | title | easterEgg.type | 照片目录 |
|----|----------|-------|---------------|---------|
| 1 | 0岁 | 她来了 | hearts | scene-01-age0/ |
| 2 | 1岁 | 第一个搞怪家 | sparkle | scene-02-age1/ |
| 3 | 5岁 | 金奖女孩 | stars | scene-03-age5/ |
| 4 | 10岁 | 酷飒旅行者 | confetti | scene-04-age10/ |
| 5 | 11岁 | 日本初体验 | sakura | scene-05-age11/ |
| 6 | 12岁 | 毕业的舞姿 | sparkle | scene-06-age12/ |
| 7 | 16-17岁 | 到处疯玩的花季 | fireworks | scene-07-age16-17/ |
| 8 | 18岁 | 首医人·朝圣者 | stars | scene-08-age18/ |

---

### 2. 祝福星（BlessingStar）

代表19颗星光中的一颗，每颗含一句祝福。

```javascript
/**
 * 祝福星数据结构
 * 对应规格 FR-005
 */
const BLESSING_STARS = [
  {
    id: 1,                           // 序号（1-19）
    blessing: "壮壮，姑且20岁之前我们还这么叫你，爸爸妈妈永远爱你。",
    isSpecial: false,                // 是否为终幕彩蛋星
    position: { x: 0.2, y: 0.3 }   // 屏幕相对位置（0-1之间）
  },
  // ... 星 2-18 同结构
  {
    id: 19,
    blessing: "生日快乐，壮壮，我们爱你。❤️",
    isSpecial: true,                 // 触发终幕彩蛋
    position: { x: 0.5, y: 0.5 }   // 居中，突出第19颗
  }
];
```

**19句祝福完整列表**（与规格 spec.md 一致）：

| id | isSpecial | 祝福内容（前20字） |
|----|-----------|-----------------|
| 1 | false | 壮壮，姑且20岁之前我们还这么叫你... |
| 2 | false | 亲爱的女儿，19岁意味着新的开始。 |
| 3 | false | 未来的路很长，但无论你去哪里... |
| 4 | false | 永远勇敢，永远热爱自己。 |
| 5 | false | 愿你始终保持那份大气从容... |
| 6 | false | 愿你的笑容永远那么灿烂... |
| 7 | false | 愿你在医学的路上，用你的善良... |
| 8 | false | 愿你永远保持对世界的好奇心... |
| 9 | false | 愿你走过更多的山川大海... |
| 10 | false | 愿你永远有爱你的人在身旁。 |
| 11 | false | 愿你健康快乐，这是最朴实也最深切... |
| 12 | false | 愿你在最难的时候也能想起... |
| 13 | false | 愿你永远是那个敢于高冷... |
| 14 | false | 愿你的未来充满光，就像星空一样无限。 |
| 15 | false | 你是我们最骄傲的作品，也是最好的礼物。 |
| 16 | false | 愿你永远记得，家永远是你最温暖的港湾。 |
| 17 | false | 愿你用你的医者仁心... |
| 18 | false | 十九年，谢谢你让我们成为你的爸爸妈妈。 |
| 19 | **true** | 生日快乐，壮壮，我们爱你。❤️ |

---

### 3. 应用状态（AppState）

全局状态机，管理当前页面和进度。

```javascript
/**
 * 应用状态枚举
 * 对应规格 FR-003, FR-007
 */
const APP_STATES = {
  INTRO:    'intro',    // 序幕：封面页
  GALLERY:  'gallery',  // 记忆长廊（当前场景1-8）
  STARS:    'stars',    // 19朵星光
  FINALE:   'finale'   // 终幕彩蛋
};

const state = {
  current: APP_STATES.INTRO,
  currentSceneIndex: 0,           // 0-7，当前显示的场景
  openedStars: new Set(),         // 已打开的星星 id 集合
  audioPlaying: false,            // 音频播放状态
  audioEnabled: true              // 用户是否允许音频
};
```

---

### 4. 照片资源规格（PhotoAsset）

```text
命名规范：{age-label}-{序号:02d}.webp
示例：age0-01.webp, age12-01.webp, age16-17-01.webp

尺寸规范：
  - 最长边 ≤ 1200px
  - 体积 ≤ 200KB
  - 宽高比：保持原始比例（不裁剪）

目录规范：
  assets/photos/scene-{id:02d}-{age-slug}/
```

---

## 状态转换图

```
[INTRO] ──点击"开始旅程"──→ [GALLERY·场景1]
                                    │
                         滑动/点击下一个场景
                                    ↓
                    [GALLERY·场景2] → ... → [GALLERY·场景8]
                                                   │
                                        点击"继续"或最后一个场景完成
                                                   ↓
                                             [STARS]
                                         点开第1-18颗星（随机顺序）
                                                   │
                                           点开第19颗星
                                                   ↓
                                            [FINALE]
                                                   │
                                        点击"重新旅行"
                                                   ↓
                                             [INTRO]
```

---

## 验证规则

| 实体 | 字段 | 约束 |
|------|------|------|
| MemoryScene | photos | 长度 1-3，src 必须指向存在的 WebP 文件 |
| MemoryScene | id | 唯一，范围 1-8 |
| BlessingStar | id | 唯一，范围 1-19 |
| BlessingStar | isSpecial | 仅 id=19 为 true |
| BlessingStar | position.x/y | 范围 0.05-0.95（避免靠近屏幕边缘） |
| AppState | currentSceneIndex | 范围 0-7 |
