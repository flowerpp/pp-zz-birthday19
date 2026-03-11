/**
 * 星光模块：19颗祝福星的渲染与交互
 * 《给19岁的你》
 */

let _currentStarId = null;   /* 当前打开的弹窗对应的星 id */

/**
 * 渲染19颗星到 .stars-field
 * 按 position.x/y 绝对定位
 */
function renderStars() {
  const field   = document.querySelector('.stars-field');
  const stars   = getBlessingStars();

  stars.forEach(star => {
    const el = document.createElement('div');
    el.className  = 'star' + (star.isSpecial ? ' star-special' : '');
    el.dataset.id = star.id;
    el.title      = `第 ${star.id} 颗星`;

    /* 定位：留出边距避免超出屏幕 */
    el.style.left = `calc(${star.position.x * 100}% - 1.1rem)`;
    el.style.top  = `calc(${star.position.y * 100}% - 1.1rem)`;

    /* 随机闪烁节奏 */
    el.style.animationDelay = `${Math.random() * 3}s`;

    el.addEventListener('click', () => openBlessing(star));
    field.appendChild(el);
  });
}

/**
 * 星光界面入场动画：19颗星依次飘入（交错 delay）
 */
function enterStarsScene() {
  renderStars();
  const starEls = document.querySelectorAll('.star');
  starEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('star-entering');
    }, i * 120);
  });
}

/**
 * 打开祝福弹窗
 * @param {BlessingStar} star
 */
function openBlessing(star) {
  _currentStarId = star.id;

  const popup = document.querySelector('.blessing-popup');
  const text  = popup.querySelector('.blessing-text');
  const icon  = popup.querySelector('.blessing-star-icon');

  icon.textContent = star.isSpecial ? '💫' : '⭐';
  text.textContent = star.blessing;
  popup.classList.add('visible');

  /* 标记该星已打开 */
  const starEl = document.querySelector(`.star[data-id="${star.id}"]`);
  if (starEl) starEl.classList.add('star-opened');
  state.openedStars.add(star.id);

  updateStarsCounter();
}

/** 关闭弹窗，检查是否所有星已打开 */
function closeBlessing() {
  document.querySelector('.blessing-popup').classList.remove('visible');

  /* 所有19颗星已打开 → 触发终幕 */
  if (state.openedStars.size >= getBlessingStars().length) {
    setTimeout(() => triggerFinale(), 800);
  }
}

/** 更新已打开数量提示 */
function updateStarsCounter() {
  const counter = document.querySelector('.stars-counter');
  if (counter) {
    const opened = state.openedStars.size;
    const total  = getBlessingStars().length;
    counter.textContent = opened < total
      ? `已打开 ${opened} / ${total} 颗星`
      : '✨ 所有祝福已收到 ✨';
  }
}
