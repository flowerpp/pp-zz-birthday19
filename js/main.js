/**
 * 主状态机与页面协调
 * 《给19岁的你》
 *
 * 状态流转：INTRO → GALLERY → STARS → FINALE → INTRO（重新旅行）
 */

/* ============================================
   应用状态
   ============================================ */
const APP_STATES = Object.freeze({
  INTRO:   'intro',
  GALLERY: 'gallery',
  STARS:   'stars',
  FINALE:  'finale',
});

const state = {
  current:           APP_STATES.INTRO,
  currentSceneIndex: 0,
  openedStars:       new Set(),
  isAnimating:       false,   /* 防止动画期间重复触发 */
};

/* ============================================
   章节切换
   ============================================ */
function switchTo(nextState) {
  const current = document.getElementById(state.current);
  const next    = document.getElementById(nextState);
  if (!next || state.current === nextState) return;

  current.classList.remove('active');
  state.current = nextState;
  next.classList.add('active');
}

/* ============================================
   序幕渲染（US1）
   ============================================ */
function renderIntro() {
  /* 逐行淡入邀请信文字 */
  const lines = document.querySelectorAll('.intro-line');
  lines.forEach((line, i) => {
    line.style.animationDelay = `${0.5 + i * 0.8}s`;
    line.classList.add('fade-in-up');
  });

  /* 延迟 1.5s 显示"开始旅程"按钮 */
  const btn = document.getElementById('start-btn');
  if (btn) {
    const totalDelay = 0.5 + lines.length * 0.8 + 0.5;
    btn.style.transitionDelay = `${totalDelay}s`;
    setTimeout(() => btn.classList.add('visible'), totalDelay * 1000);
  }
}

/* ============================================
   长廊初始化（US2）
   ============================================ */
function initGallery() {
  const wrapper = document.querySelector('.scene-wrapper');
  if (!wrapper || wrapper.children.length > 0) return;
  renderAllScenes(wrapper);
  updateGalleryUI();
  initGalleryNav();
}

function updateGalleryUI() {
  const total   = getTotalScenes();
  const current = state.currentSceneIndex + 1;

  document.querySelector('.progress-indicator').textContent = `${current} / ${total}`;
  document.querySelector('.nav-prev').style.visibility = current === 1     ? 'hidden' : 'visible';

  /* 最后一个场景显示"继续→"，否则显示"→"箭头 */
  const nextBtn = document.querySelector('.nav-next');
  const continueBtn = document.querySelector('.gallery-continue');
  if (current === total) {
    nextBtn.style.display      = 'none';
    continueBtn.style.display  = 'flex';
  } else {
    nextBtn.style.display      = 'flex';
    continueBtn.style.display  = 'none';
  }
}

function goToScene(index) {
  if (state.isAnimating) return;
  const total = getTotalScenes();
  if (index < 0 || index >= total) return;

  state.isAnimating = true;
  state.currentSceneIndex = index;

  const wrapper = document.querySelector('.scene-wrapper');
  wrapper.style.transform = `translateX(-${index * 100}%)`;
  updateGalleryUI();

  /* 场景文字淡入动画 */
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach((s, i) => {
    s.classList.toggle('scene-active', i === index);
  });

  setTimeout(() => { state.isAnimating = false; }, 600);
}

function initGalleryNav() {
  /* 桌面箭头 */
  document.querySelector('.nav-prev').addEventListener('click', () => {
    goToScene(state.currentSceneIndex - 1);
  });
  document.querySelector('.nav-next').addEventListener('click', () => {
    goToScene(state.currentSceneIndex + 1);
  });

  /* 触摸滑动（手机） */
  let touchStartX = 0;
  const gallery = document.getElementById('gallery');
  gallery.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  gallery.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) < 50) return;   /* 阈值 50px */
    if (diff < 0) goToScene(state.currentSceneIndex + 1);
    else          goToScene(state.currentSceneIndex - 1);
  }, { passive: true });

  /* 继续→ 按钮进入星光 */
  document.querySelector('.gallery-continue').addEventListener('click', () => {
    switchTo(APP_STATES.STARS);
    enterStarsScene();
  });
}

/* ============================================
   终幕彩蛋（US4）
   ============================================ */
function triggerFinale() {
  switchTo(APP_STATES.FINALE);
  const overlay  = document.querySelector('.finale-overlay');
  const photo    = document.querySelector('.finale-photo');
  const message  = document.querySelector('.finale-message');
  const restartBtn = document.querySelector('.finale-restart');

  /* 动画序列 */
  setTimeout(() => overlay.classList.add('finale-visible'),  0);
  setTimeout(() => { startMusic(); },                         500);
  setTimeout(() => photo.classList.add('finale-photo-in'),   800);
  setTimeout(() => message.classList.add('finale-msg-in'),   2000);
  setTimeout(() => triggerFireworks(),                        2500);
  setTimeout(() => {
    restartBtn.style.opacity       = '1';
    restartBtn.style.pointerEvents = 'all';
  }, 5000);
}

/* ============================================
   重新旅行
   ============================================ */
function restart() {
  state.openedStars.clear();
  state.currentSceneIndex = 0;
  state.isAnimating = false;

  /* 重置场景位置 */
  const wrapper = document.querySelector('.scene-wrapper');
  if (wrapper) wrapper.style.transform = 'translateX(0)';
  updateGalleryUI();

  /* 重置星光界面 */
  document.querySelectorAll('.star').forEach(s => {
    s.classList.remove('star-opened');
  });

  /* 重置终幕 */
  document.querySelector('.finale-overlay')?.classList.remove('finale-visible');
  document.querySelector('.finale-photo')?.classList.remove('finale-photo-in');
  document.querySelector('.finale-message')?.classList.remove('finale-msg-in');
  const restartBtn = document.querySelector('.finale-restart');
  if (restartBtn) {
    restartBtn.style.opacity       = '0';
    restartBtn.style.pointerEvents = 'none';
  }

  switchTo(APP_STATES.INTRO);
}

/* ============================================
   初始化入口
   ============================================ */
function init() {
  /* 音频初始化 */
  initAudio();

  /* 音频控制按钮 */
  const audioBtn = document.querySelector('.audio-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', toggleMusic);
  }

  /* 显示序幕 */
  document.getElementById('intro').classList.add('active');
  renderIntro();

  /* 开始旅程按钮 */
  document.getElementById('start-btn').addEventListener('click', () => {
    startMusic();
    document.querySelector('.audio-btn').classList.add('visible');
    initGallery();
    switchTo(APP_STATES.GALLERY);
    /* 触发第一个场景的进入动画 */
    setTimeout(() => goToScene(0), 100);
  });

  /* 重新旅行按钮 */
  document.querySelector('.finale-restart').addEventListener('click', restart);
}

/* DOM 加载完成后启动 */
document.addEventListener('DOMContentLoaded', init);
