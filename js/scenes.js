/**
 * 场景数据模块
 * 《给19岁的你》— 记忆长廊数据常量
 *
 * 修改内容说明：
 *   - 修改爸爸的话：直接编辑 fathersWords 字段
 *   - 替换照片：修改 photos 数组中的 src 路径
 *   - 修改祝福：编辑 BLESSING_STARS 中的 blessing 字段
 */

/** @type {MemoryScene[]} 8个人生阶段场景（只读常量） */
const MEMORY_SCENES = Object.freeze([
  {
    id: 1,
    ageLabel: '0岁',
    title: '她来了',
    fathersWords: '2007年3月11日11点03分，一个女孩来到这个世界，6斤重。你被推出产房那一刻，世界突然变得非常温柔。感谢老婆！',
    photos: [
      { src: 'assets/photos/scene-01-age0/age0-01.webp', fallback: 'assets/photos/scene-01-age0/age0-01.jpg', alt: '壮壮0岁' },
      { src: 'assets/photos/scene-01-age0/age0-02.webp', fallback: 'assets/photos/scene-01-age0/age0-02.jpg', alt: '壮壮0岁0月14天' },
      { src: 'assets/photos/scene-01-age0/age0-03.webp', fallback: 'assets/photos/scene-01-age0/age0-03.jpg', alt: '壮壮0岁7月' },
    ],
    easterEgg: { type: 'hearts', color: '#ffb7c5' },
  },
  {
    id: 2,
    ageLabel: '1岁',
    title: '第一个搞怪家',
    fathersWords: '各种和我们互动，学会了使用工具，学会了各种搞怪！',
    photos: [
      { src: 'assets/photos/scene-02-age1/age1-01.webp', fallback: 'assets/photos/scene-02-age1/age1-01.jpg', alt: '壮壮1岁' },
      { src: 'assets/photos/scene-02-age1/age1-02.webp', fallback: 'assets/photos/scene-02-age1/age1-02.jpg', alt: '壮壮1岁' },
    ],
    easterEgg: { type: 'sparkle', color: '#c9a0dc' },
  },
  {
    id: 3,
    ageLabel: '5岁',
    title: '金奖女孩',
    fathersWords: '参加儿童组全国歌唱大赛，大气参赛、捧回了金奖，却不参加领奖，高冷！',
    photos: [
      { src: 'assets/photos/scene-03-age5/age5-01.webp', fallback: 'assets/photos/scene-03-age5/age5-01.jpg', alt: '壮壮5岁' },
      { src: 'assets/photos/scene-03-age5/age5-02.webp', fallback: 'assets/photos/scene-03-age5/age5-02.jpg', alt: '壮壮5岁' },
    ],
    easterEgg: { type: 'stars', color: '#ffd700' },
  },
  {
    id: 4,
    ageLabel: '10岁',
    title: '酷飒旅行者',
    fathersWords: '我们一家去张北旅行，酷飒！',
    photos: [
      { src: 'assets/photos/scene-04-age10/age10-01.webp', fallback: 'assets/photos/scene-04-age10/age10-01.jpg', alt: '壮壮10岁张北旅行' },
      { src: 'assets/photos/scene-04-age10/age10-02.webp', fallback: 'assets/photos/scene-04-age10/age10-02.jpg', alt: '壮壮10岁' },
    ],
    easterEgg: { type: 'confetti', color: '#7b68ee' },
  },
  {
    id: 5,
    ageLabel: '11岁',
    title: '日本初体验',
    fathersWords: '我们一起去日本，东京大学我们碰到了一个小哥哥。',
    photos: [
      { src: 'assets/photos/scene-05-age11/age11-01.webp', fallback: 'assets/photos/scene-05-age11/age11-01.jpg', alt: '壮壮11岁日本' },
      { src: 'assets/photos/scene-05-age11/age11-02.webp', fallback: 'assets/photos/scene-05-age11/age11-02.jpg', alt: '壮壮11岁' },
    ],
    easterEgg: { type: 'sakura', color: '#ffb7c5' },
  },
  {
    id: 6,
    ageLabel: '12岁',
    title: '毕业的舞姿',
    fathersWords: '你小学毕业，舞蹈的身姿照片至今应该还在和4的楼道墙壁上！',
    photos: [
      { src: 'assets/photos/scene-06-age12/age12-01.webp', fallback: 'assets/photos/scene-06-age12/age12-01.jpg', alt: '壮壮12岁毕业' },
      { src: 'assets/photos/scene-06-age12/age12-02.webp', fallback: 'assets/photos/scene-06-age12/age12-02.jpg', alt: '壮壮12岁' },
      { src: 'assets/photos/scene-06-age12/age12-03.webp', fallback: 'assets/photos/scene-06-age12/age12-03.jpg', alt: '壮壮12岁舞蹈' },
    ],
    easterEgg: { type: 'sparkle', color: '#c9a0dc' },
  },
  {
    id: 7,
    ageLabel: '16-17岁',
    title: '到处疯玩的花季',
    fathersWords: '花季年龄，虽然经历了新冠和即将到来的高考，但是我们还是到处疯玩——杭州、海南、武汉、欧洲、联合国！',
    photos: [
      { src: 'assets/photos/scene-07-age16-17/age16-17-01.webp', fallback: 'assets/photos/scene-07-age16-17/age16-17-01.jpg', alt: '壮壮16岁旅行' },
      { src: 'assets/photos/scene-07-age16-17/age16-17-02.webp', fallback: 'assets/photos/scene-07-age16-17/age16-17-02.jpg', alt: '壮壮17岁' },
      { src: 'assets/photos/scene-07-age16-17/age16-17-03.webp', fallback: 'assets/photos/scene-07-age16-17/age16-17-03.jpg', alt: '壮壮花季' },
    ],
    easterEgg: { type: 'fireworks', color: '#7b68ee' },
  },
  {
    id: 8,
    ageLabel: '18岁',
    title: '首医人·朝圣者',
    fathersWords: '壮壮考上了首医心仪的专业，我们也去了五台山！',
    photos: [
      { src: 'assets/photos/scene-08-age18/age18-01.webp', fallback: 'assets/photos/scene-08-age18/age18-01.jpg', alt: '壮壮18岁' },
      { src: 'assets/photos/scene-08-age18/age18-02.webp', fallback: 'assets/photos/scene-08-age18/age18-02.jpg', alt: '壮壮18岁五台山' },
      { src: 'assets/photos/scene-08-age18/age18-03.webp', fallback: 'assets/photos/scene-08-age18/age18-03.jpg', alt: '壮壮18岁首医' },
    ],
    easterEgg: { type: 'stars', color: '#ffd700' },
  },
]);

/** @type {BlessingStar[]} 19颗祝福星（只读常量） */
const BLESSING_STARS = Object.freeze([
  { id: 1,  blessing: '壮壮，姑且20岁之前我们还这么叫你，爸爸妈妈永远爱你。', isSpecial: false, position: { x: 0.15, y: 0.20 } },
  { id: 2,  blessing: '亲爱的女儿，19岁意味着新的开始。', isSpecial: false, position: { x: 0.75, y: 0.15 } },
  { id: 3,  blessing: '未来的路很长，但无论你去哪里，爸爸妈妈永远是你最坚定的支持者。', isSpecial: false, position: { x: 0.45, y: 0.12 } },
  { id: 4,  blessing: '永远勇敢，永远热爱自己。', isSpecial: false, position: { x: 0.88, y: 0.35 } },
  { id: 5,  blessing: '愿你始终保持那份大气从容——就像5岁拿了金奖却不参加领奖的你。', isSpecial: false, position: { x: 0.08, y: 0.45 } },
  { id: 6,  blessing: '愿你的笑容永远那么灿烂，温暖每一个靠近你的人。', isSpecial: false, position: { x: 0.60, y: 0.28 } },
  { id: 7,  blessing: '愿你在医学的路上，用你的善良治愈世界。', isSpecial: false, position: { x: 0.30, y: 0.38 } },
  { id: 8,  blessing: '愿你永远保持对世界的好奇心，就像第一次去日本时的你。', isSpecial: false, position: { x: 0.82, y: 0.55 } },
  { id: 9,  blessing: '愿你走过更多的山川大海，带回更多的故事。', isSpecial: false, position: { x: 0.20, y: 0.62 } },
  { id: 10, blessing: '愿你永远有爱你的人在身旁。', isSpecial: false, position: { x: 0.55, y: 0.48 } },
  { id: 11, blessing: '愿你健康快乐，永远壮壮。', isSpecial: false, position: { x: 0.70, y: 0.68 } },
  { id: 12, blessing: '愿你在最难的时候也能想起，你不是一个人。', isSpecial: false, position: { x: 0.10, y: 0.75 } },
  { id: 13, blessing: '愿你永远是那个敢于高冷、敢于特立独行的自己。', isSpecial: false, position: { x: 0.40, y: 0.72 } },
  { id: 14, blessing: '愿你的未来充满光，就像星空一样无限。', isSpecial: false, position: { x: 0.85, y: 0.78 } },
  { id: 15, blessing: '你是我们最骄傲的作品，也是最好的礼物。', isSpecial: false, position: { x: 0.25, y: 0.82 } },
  { id: 16, blessing: '愿你永远记得，家永远是你最温暖的港湾。', isSpecial: false, position: { x: 0.65, y: 0.85 } },
  { id: 17, blessing: '愿你用你的医者仁心，让这个世界多一点温柔。', isSpecial: false, position: { x: 0.48, y: 0.88 } },
  { id: 18, blessing: '十九年，谢谢你让我们成为你的爸爸妈妈。', isSpecial: false, position: { x: 0.92, y: 0.22 } },
  { id: 19, blessing: '生日快乐，壮壮，我们爱你。❤️', isSpecial: true,  position: { x: 0.50, y: 0.50 } },
]);

/* ============================================
   公共接口（见 contracts/scene-data.md）
   ============================================ */

/**
 * 获取指定索引的场景对象
 * @param {number} index - 0~7
 * @returns {MemoryScene|null}
 */
function getScene(index) {
  if (index < 0 || index >= MEMORY_SCENES.length) return null;
  return MEMORY_SCENES[index];
}

/** @returns {number} 场景总数（固定8） */
function getTotalScenes() {
  return MEMORY_SCENES.length;
}

/** @returns {BlessingStar[]} 全部19颗星数组 */
function getBlessingStars() {
  return BLESSING_STARS;
}

/** @returns {BlessingStar} 终幕彩蛋星（id=19） */
function getSpecialStar() {
  return BLESSING_STARS.find(s => s.isSpecial);
}

/**
 * 渲染所有场景 DOM 到长廊容器
 * @param {HTMLElement} wrapper - .scene-wrapper 元素
 */
function renderAllScenes(wrapper) {
  MEMORY_SCENES.forEach((scene, index) => {
    const el = document.createElement('div');
    el.className = 'scene';
    el.dataset.sceneIndex = index;

    /* 照片区 */
    const photoArea = document.createElement('div');
    photoArea.className = 'scene-photos';
    scene.photos.forEach(photo => {
      const picture = document.createElement('picture');
      const sourceWebp = document.createElement('source');
      sourceWebp.srcset = photo.src;
      sourceWebp.type = 'image/webp';
      const img = document.createElement('img');
      img.src = photo.fallback;
      img.alt = photo.alt;
      img.loading = 'lazy';
      img.className = 'scene-photo';
      picture.appendChild(sourceWebp);
      picture.appendChild(img);
      /* 骨架占位 */
      const skeleton = document.createElement('div');
      skeleton.className = 'photo-skeleton';
      const wrapper2 = document.createElement('div');
      wrapper2.className = 'photo-wrapper';
      wrapper2.appendChild(skeleton);
      wrapper2.appendChild(picture);
      photoArea.appendChild(wrapper2);

      /* 图片加载完成后移除骨架 */
      img.onload = () => skeleton.classList.add('loaded');
      img.onerror = () => skeleton.classList.add('loaded');
    });

    /* 文字区 */
    const textArea = document.createElement('div');
    textArea.className = 'scene-text';
    const ageLabel = document.createElement('span');
    ageLabel.className = 'scene-age-label';
    ageLabel.textContent = scene.ageLabel;
    const words = document.createElement('p');
    words.className = 'scene-words';
    words.textContent = scene.fathersWords;
    textArea.appendChild(ageLabel);
    textArea.appendChild(words);

    el.appendChild(photoArea);
    el.appendChild(textArea);

    /* 彩蛋：点击照片区触发 */
    photoArea.addEventListener('click', () => {
      if (window.triggerEasterEgg) {
        window.triggerEasterEgg(scene.easterEgg.type, scene.easterEgg.color, photoArea);
      }
    });

    wrapper.appendChild(el);
  });
}
