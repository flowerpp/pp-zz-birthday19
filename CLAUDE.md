# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目说明

**《给19岁的你》** — 为壮壮19岁生日制作的互动叙事网页游戏。
纯静态网页（HTML5 + CSS3 + 原生 JavaScript），部署至 GitHub Pages。

当前功能分支：`001-birthday-memory-game`

## 技术栈

- **语言**: HTML5 + CSS3 + JavaScript ES2020+（无框架，无构建工具）
- **动画**: 纯 CSS3 `@keyframes` + 原生 Canvas 粒子
- **图片格式**: WebP（源照片目录：`/Users/flowerpp/work/document/image/壮壮18岁18年精选照片/`）
- **音频**: mp3（`assets/audio/birthday-song.mp3`）
- **部署**: GitHub Pages via GitHub Actions

## 常用命令

```bash
# 本地预览（必须用 HTTP 服务器，不能直接打开 HTML）
python3 -m http.server 8080
# 然后访问 http://localhost:8080

# 手机局域网预览
ifconfig | grep "inet " | grep -v 127.0.0.1  # 查看本机 IP
# 手机访问 http://[本机IP]:8080

# 图片处理（HEIC→JPEG→WebP）
sips -s format jpeg "input.HEIC" --out "output.jpg"
cwebp -q 85 -resize 1200 0 "input.jpg" -o "output.webp"
```

## 关键文件

| 文件 | 用途 |
|------|------|
| `js/scenes.js` | **内容主文件**：爸爸的话、祝福文字、照片路径 |
| `js/main.js` | 状态机（INTRO→GALLERY→STARS→FINALE） |
| `js/stars.js` | 19颗星交互逻辑 |
| `js/animations.js` | Canvas 粒子彩蛋 |
| `js/audio.js` | 音频控制（绑定用户首次点击触发播放） |
| `css/main.css` | 主题变量（蓝紫色调） |

## 规格文档

- 规格：`specs/001-birthday-memory-game/spec.md`
- 规划：`specs/001-birthday-memory-game/plan.md`
- 数据模型：`specs/001-birthday-memory-game/data-model.md`
- 快速开始：`specs/001-birthday-memory-game/quickstart.md`
- 宪法：`.specify/memory/constitution.md`

## 开发规范

- 代码注释使用中文
- 变量名、函数名使用英文
- 每个 JS 函数 ≤ 30 行
- 禁止使用第三方框架（Vue/React/Angular）和构建工具（Webpack/Vite）

## Active Technologies
- JavaScript ES2020+（原生，无框架） + 无新增 (004-fix-gallery-photos)

## Recent Changes
- 004-fix-gallery-photos: Added JavaScript ES2020+（原生，无框架） + 无新增
