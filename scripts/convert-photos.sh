#!/usr/bin/env bash
# 照片处理脚本：从源目录精选照片并转换为 WebP 格式
# 用法：bash scripts/convert-photos.sh
# 依赖：sips（macOS 自带）、cwebp（brew install webp）

set -e

SRC="/Users/flowerpp/work/document/image/壮壮18岁18年精选照片"
DEST="assets/photos"
QUALITY=85
MAX_WIDTH=1200

# 检查依赖
if ! command -v cwebp &> /dev/null; then
  echo "请先安装 cwebp：brew install webp"
  exit 1
fi

# 转换单张图片（HEIC/JPG/PNG → WebP）
convert_to_webp() {
  local src="$1"
  local dest="$2"
  local ext="${src##*.}"
  local tmp_jpg="/tmp/birthday_convert_$$.jpg"

  # HEIC 先转 JPEG
  if [[ "${ext,,}" == "heic" ]]; then
    sips -s format jpeg "$src" --out "$tmp_jpg" &>/dev/null
    src="$tmp_jpg"
  fi

  cwebp -q "$QUALITY" -resize "$MAX_WIDTH" 0 "$src" -o "$dest" 2>/dev/null
  rm -f "$tmp_jpg"
  echo "  ✓ $(basename "$dest")"
}

echo "=== 开始照片处理 ==="

# 场景1：0岁（全选3张）
echo "场景1：0岁"
convert_to_webp "$SRC/0岁.jpg"           "$DEST/scene-01-age0/age0-01.webp"
convert_to_webp "$SRC/0岁0月14天.JPG"    "$DEST/scene-01-age0/age0-02.webp"
convert_to_webp "$SRC/0岁7月.jpg"        "$DEST/scene-01-age0/age0-03.webp"

# 场景2：1岁（精选2张）
echo "场景2：1岁"
convert_to_webp "$SRC/1岁.JPG"           "$DEST/scene-02-age1/age1-01.webp"
convert_to_webp "$SRC/1岁1.JPG"          "$DEST/scene-02-age1/age1-02.webp"

# 场景3：5岁（精选2张）
echo "场景3：5岁"
convert_to_webp "$SRC/5岁.JPG"           "$DEST/scene-03-age5/age5-01.webp"
convert_to_webp "$SRC/5岁1.JPG"          "$DEST/scene-03-age5/age5-02.webp"

# 场景4：10岁（精选2张）
echo "场景4：10岁"
convert_to_webp "$SRC/10岁.jpeg"         "$DEST/scene-04-age10/age10-01.webp"
convert_to_webp "$SRC/10岁1.JPG"         "$DEST/scene-04-age10/age10-02.webp"

# 场景5：11岁（精选2张）
echo "场景5：11岁"
convert_to_webp "$SRC/11岁1.jpeg"        "$DEST/scene-05-age11/age11-01.webp"
convert_to_webp "$SRC/11岁2.jpeg"        "$DEST/scene-05-age11/age11-02.webp"

# 场景6：12岁（精选3张）
echo "场景6：12岁"
convert_to_webp "$SRC/12岁.jpg"          "$DEST/scene-06-age12/age12-01.webp"
convert_to_webp "$SRC/12岁1.pic.jpg"     "$DEST/scene-06-age12/age12-02.webp"
convert_to_webp "$SRC/12岁5.jpeg"        "$DEST/scene-06-age12/age12-03.webp"

# 场景7：16-17岁（精选3张）
echo "场景7：16-17岁"
convert_to_webp "$SRC/16岁.JPG"          "$DEST/scene-07-age16-17/age16-17-01.webp"
convert_to_webp "$SRC/16岁3.JPG"         "$DEST/scene-07-age16-17/age16-17-02.webp"
convert_to_webp "$SRC/17岁.jpg"          "$DEST/scene-07-age16-17/age16-17-03.webp"

# 场景8：18岁（精选3张）
echo "场景8：18岁"
convert_to_webp "$SRC/18岁.JPG"          "$DEST/scene-08-age18/age18-01.webp"
convert_to_webp "$SRC/18岁1.JPG"         "$DEST/scene-08-age18/age18-02.webp"
convert_to_webp "$SRC/18岁2.JPG"         "$DEST/scene-08-age18/age18-03.webp"

echo "家庭合影"
ls "$SRC/3岁36.JPG" 

convert_to_webp "$SRC/3岁36.JPG"          "$DEST/finale/finale-01.webp"
echo ""
echo "=== 照片处理完成！==="
echo "请手动将一张家庭合影放到：assets/photos/finale/finale-01.webp"
echo "（同时保留 assets/photos/finale/finale-01.jpg 作为回退）"
