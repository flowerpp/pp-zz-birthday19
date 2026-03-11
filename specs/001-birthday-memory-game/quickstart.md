# 快速开始指南：《给19岁的你》

**分支**: `001-birthday-memory-game` | **日期**: 2026-03-11

---

## 前置准备

### 1. 环境要求

| 工具 | 说明 |
|------|------|
| macOS（已有）| 用于图片转换 |
| GitHub 账号 | 用于 Pages 部署 |
| 浏览器 | Chrome / Safari 用于本地预览 |
| cwebp（可选）| 图片格式转换工具 |

安装图片转换工具（一次性）：
```bash
brew install webp
```

---

### 2. 项目初始化（已完成）

```bash
# 仓库已在此目录初始化
cd /Users/flowerpp/work/workspace_airchina/pp-zz-birthday19
# git 仓库已初始化，在 001-birthday-memory-game 分支
```

---

## 开发流程

### 步骤 1：处理照片

从源目录精选照片并转换格式：

```bash
# 创建目标目录
mkdir -p assets/photos/scene-01-age0
mkdir -p assets/photos/scene-02-age1
mkdir -p assets/photos/scene-03-age5
mkdir -p assets/photos/scene-04-age10
mkdir -p assets/photos/scene-05-age11
mkdir -p assets/photos/scene-06-age12
mkdir -p assets/photos/scene-07-age16-17
mkdir -p assets/photos/scene-08-age18

# HEIC → JPEG（macOS sips 无需安装）
sips -s format jpeg "源文件.HEIC" --out "输出.jpg"

# JPEG/PNG → WebP（需要 cwebp）
cwebp -q 85 -resize 1200 0 "输入.jpg" -o "assets/photos/scene-01-age0/age0-01.webp"

# 快速批量转换示例（0岁照片）
SOURCE="/Users/flowerpp/work/document/image/壮壮18岁18年精选照片"
for f in "$SOURCE"/0岁*.jpg "$SOURCE"/0岁*.JPG; do
  [ -f "$f" ] || continue
  name=$(basename "$f" | sed 's/\.[^.]*$//')
  cwebp -q 85 -resize 1200 0 "$f" -o "assets/photos/scene-01-age0/${name}.webp"
done
```

---

### 步骤 2：添加音频文件

将生日快乐歌音频文件放到：
```
assets/audio/birthday-song.mp3
```

（mp3 格式，建议 ≤ 2MB；可从版权免费音源下载）

---

### 步骤 3：本地预览

由于使用 ES Module（`type="module"`），需通过本地 HTTP 服务器打开，不能直接双击 HTML 文件：

```bash
# 方法1：Python（macOS 自带）
cd /Users/flowerpp/work/workspace_airchina/pp-zz-birthday19
python3 -m http.server 8080
# 浏览器访问：http://localhost:8080

# 方法2：Node.js npx serve
npx serve . -p 8080
```

---

### 步骤 4：手机预览（同局域网）

```bash
# 查看本机 IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# 启动服务器后，手机访问：
# http://[本机IP]:8080
# 例如：http://192.168.1.100:8080
```

---

### 步骤 5：部署到 GitHub Pages

```bash
# 1. 在 GitHub 创建仓库：pp-zz-birthday19
# 2. 绑定远程仓库
git remote add origin https://github.com/[你的用户名]/pp-zz-birthday19.git

# 3. 提交代码到 main 分支
git add .
git commit -m "feat: 壮壮19岁生日网页游戏初版"
git push -u origin main

# 4. GitHub Actions 自动触发部署（约1-2分钟）
# 访问：https://[你的用户名].github.io/pp-zz-birthday19/
```

---

## 核心文件说明

| 文件 | 作用 |
|------|------|
| `index.html` | 入口，包含所有章节的 HTML 骨架 |
| `js/scenes.js` | **主要内容文件**：修改爸爸的话、祝福文字、照片路径 |
| `js/main.js` | 状态机和页面切换逻辑 |
| `js/stars.js` | 19颗星的交互和位置 |
| `js/animations.js` | 粒子彩蛋效果 |
| `js/audio.js` | 音频控制 |
| `css/main.css` | 主题颜色变量（修改这里改整体色调） |

---

## 常见问题

**Q: 手机打开页面没有声音？**
A: 必须先点击"开始旅程"按钮，音乐才会响起（浏览器安全限制）。

**Q: 照片显示不出来（破图）？**
A: 检查 `js/scenes.js` 中照片路径是否与 `assets/photos/` 下的实际文件名一致。

**Q: GitHub Pages 访问 404？**
A: 确认仓库 Settings → Pages → Source 已设置为 `gh-pages` 分支，或检查 Actions 是否运行成功。

**Q: 想修改某句祝福文字？**
A: 打开 `js/scenes.js`，找到 `BLESSING_STARS` 数组中对应的 `blessing` 字段修改即可。
