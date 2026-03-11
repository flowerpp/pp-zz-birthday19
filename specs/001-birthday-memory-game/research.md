# 研究文档：《给19岁的你》

**分支**: `001-birthday-memory-game` | **日期**: 2026-03-11
**状态**: Phase 0 完成 — 所有 NEEDS CLARIFICATION 已解决

---

## 研究议题 1：移动端音频自动播放策略

### 问题背景
iOS Safari 和 Android Chrome 均对音频自动播放有严格限制，必须在用户主动交互（tap/click）后才能触发播放。

### 决策
**方案**: 用户点击"开始旅程"按钮时，在同一事件回调中调用 `audio.play()`，作为首次用户交互的直接响应。提供一个常驻的音频控制按钮（右上角）允许随时暂停/继续。

### 理由
- 点击"开始旅程"天然满足"用户主动交互"的浏览器要求
- 无需 AudioContext unlock hack，代码最简单
- 符合用户预期：进入体验时音乐同步响起

### 被排除的替代方案
| 方案 | 排除原因 |
|------|---------|
| 页面加载后自动播放 | iOS Safari 完全阻止，Android Chrome 仅允许静音自动播放 |
| AudioContext.resume() + unlock | 代码复杂度高，对此项目过度设计 |
| 不播放背景音乐 | 用户明确要求生日快乐歌，是体验的重要组成 |

---

## 研究议题 2：图片格式与压缩策略

### 问题背景
照片源目录共 189 张图片，格式混杂（JPG/HEIC/PNG），需要为网页优化。

### 各年龄段可用照片统计

| 场景 | 年龄 | 可用照片数 | 精选建议 |
|------|------|----------|---------|
| 1 | 0岁 | 3张 | 全选（3张） |
| 2 | 1岁 | 6张 | 精选2张 |
| 3 | 5岁 | 7张 | 精选2张（含歌唱比赛相关） |
| 4 | 10岁 | 7张 | 精选2张（张北旅行） |
| 5 | 11岁 | 8张 | 精选2张（日本旅行） |
| 6 | 12岁 | 42张 | 精选3张（毕业/舞蹈） |
| 7 | 16-17岁 | 24张 | 精选3张（各地旅行） |
| 8 | 18岁 | 4张 | 全选或精选3张（首医/五台山） |

**总计**：每场景 2-3 张，共约 **20 张精选照片**用于网页展示。

### 决策
**格式**: 所有照片转换为 **WebP**，同时保留 **JPEG 副本**作为回退（研究 Agent 确认需要）。
**HTML 结构**: 使用 `<picture>` 元素，WebP 优先，JPEG 回退：
```html
<picture>
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="壮壮X岁">
</picture>
```
**分辨率**: 最长边 ≤ 1200px（Retina 屏足够清晰）。
**体积目标**: WebP 单张 ≤ 200KB；JPEG 回退单张 ≤ 400KB；20 张 WebP 总计 ≤ 4MB。
**HEIC 处理**: `sips` 转 JPEG，`cwebp` 再转 WebP；两个格式均保存到对应目录。

### 转换命令参考（macOS）
```bash
# HEIC → JPEG（macOS 自带 sips）
sips -s format jpeg input.HEIC --out output.jpg

# JPEG → WebP（需安装 cwebp）
brew install webp
cwebp -q 85 input.jpg -o output.webp
```

### 被排除的替代方案
| 方案 | 排除原因 |
|------|---------|
| 直接使用原始 HEIC | 浏览器不支持 HEIC 格式 |
| 保留 JPG 不转 WebP | 体积大 30-50%，首屏加载变慢 |
| 压缩到 100px 缩略图 | 手机全屏展示时图片模糊，影响情感体验 |

---

## 研究议题 3：动画实现方案

### 问题背景
需要实现：场景切换过渡、照片点击彩蛋、星光粒子、终幕绽放效果。

### 决策
**方案**: **纯 CSS3 动画 + 原生 Canvas 粒子**，不引入第三方动画库。

具体分工：
- **场景切换**：CSS `transform: translateX` + `transition`，GPU 加速，流畅
- **星星出现**：CSS `@keyframes` 淡入 + 位移
- **照片点击彩蛋**：CSS animation class 切换（心形/星光/波纹）
- **终幕粒子绽放**：原生 Canvas `requestAnimationFrame` 粒子系统（约 60 行 JS）

### 理由
- 无需加载 GSAP（~130KB gzip），减少资源体积
- CSS 动画由浏览器 GPU 加速，性能优于 JS 操控 DOM
- Canvas 粒子系统代码量小，易于维护

### 被排除的替代方案
| 方案 | 排除原因 |
|------|---------|
| GSAP 3.x | 无必要的 130KB 额外依赖；纯 CSS 已足够 |
| Three.js | 对此项目严重过度设计 |
| Lottie 动画 | 需要单独设计动画文件，工作量倍增 |

---

## 研究议题 4：GitHub Pages 部署方案

### 决策
**方案**: GitHub Actions 自动部署工作流 + `gh-pages` 分支策略。

访问地址格式：`https://[username].github.io/pp-zz-birthday19/`

### 配置文件

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
          publish_branch: gh-pages
```

### 理由
- `peaceiris/actions-gh-pages` 是业界标准做法，零配置
- 每次 push 到 main 自动部署，维护简单
- 默认 HTTPS，满足 SC-001 安全要求

### 被排除的替代方案
| 方案 | 排除原因 |
|------|---------|
| 手动上传文件 | 不可持续，每次修改都需手动操作 |
| Netlify/Vercel | 需要额外账号，增加依赖；GitHub Pages 已足够且免费 |
| 自定义域名 | 非必须，生日链接分享默认域名即可 |

---

## 研究议题 5：手机触摸滑动手势

### 决策
**方案**: 原生 `touchstart` / `touchend` 事件监听，计算滑动方向，触发场景切换。最小滑动距离阈值 50px，防止误触。

```javascript
// 核心逻辑（伪代码）
let startX;
el.addEventListener('touchstart', e => startX = e.touches[0].clientX);
el.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (Math.abs(diff) > 50) diff < 0 ? nextScene() : prevScene();
});
```

### 被排除的替代方案
| 方案 | 排除原因 |
|------|---------|
| Hammer.js | 额外依赖（9KB），原生实现已足够 |
| 仅提供按钮切换 | 手机体验不自然，触摸滑动是移动端直觉操作 |

---

## 所有 NEEDS CLARIFICATION 解决状态

| 议题 | 状态 | 决策摘要 |
|------|------|---------|
| 音频自动播放 | ✅ 已解决 | 绑定首次用户点击事件触发 audio.play() |
| 图片格式/压缩 | ✅ 已解决 | WebP，1200px，≤200KB/张，sips+cwebp 工具链 |
| 动画实现 | ✅ 已解决 | 纯 CSS3 + Canvas 粒子，无第三方动画库 |
| GitHub Pages 部署 | ✅ 已解决 | GitHub Actions + peaceiris/actions-gh-pages |
| 触摸手势 | ✅ 已解决 | 原生 touchstart/touchend，阈值 50px |
