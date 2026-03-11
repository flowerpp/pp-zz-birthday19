/**
 * 动画模块：彩蛋粒子 + 终幕烟花
 * 《给19岁的你》
 */

/* ============================================
   彩蛋动画（点击照片触发）
   ============================================ */

/**
 * 触发彩蛋动画
 * @param {string} type  - hearts|stars|sparkle|confetti|sakura|fireworks
 * @param {string} color - CSS 颜色值
 * @param {HTMLElement} target - 触发元素（粒子从此处扩散）
 */
function triggerEasterEgg(type, color, target) {
  const rect   = target.getBoundingClientRect();
  const originX = rect.left + rect.width  / 2;
  const originY = rect.top  + rect.height / 2;

  const configs = {
    hearts:   { count: 12, symbols: ['❤️', '💜', '💗'], anim: 'rise' },
    stars:    { count: 15, symbols: ['⭐', '✨', '🌟'], anim: 'rise' },
    sparkle:  { count: 20, symbols: ['✦', '✧', '·'],   anim: 'burst' },
    confetti: { count: 18, symbols: ['🎊', '🎉', '🎈'], anim: 'fall' },
    sakura:   { count: 14, symbols: ['🌸', '🌺', '🌷'], anim: 'sakura' },
    fireworks:{ count: 16, symbols: ['🎆', '💥', '⚡'], anim: 'burst' },
  };

  const cfg = configs[type] || configs.sparkle;
  for (let i = 0; i < cfg.count; i++) {
    spawnParticle(originX, originY, cfg.symbols, color, cfg.anim, i);
  }
}

function spawnParticle(x, y, symbols, color, animType, index) {
  const el = document.createElement('span');
  el.textContent = symbols[index % symbols.length];
  el.style.cssText = `
    position: fixed;
    left: ${x}px;
    top:  ${y}px;
    pointer-events: none;
    z-index: 9999;
    font-size: ${0.8 + Math.random() * 0.8}rem;
    user-select: none;
  `;
  document.body.appendChild(el);

  const angle  = (Math.random() * 360) * (Math.PI / 180);
  const dist   = 60 + Math.random() * 100;
  const dx     = Math.cos(angle) * dist;
  const dy     = animType === 'rise'   ? -(30 + Math.random() * 80)
               : animType === 'sakura' ? 80 + Math.random() * 60
               : Math.sin(angle) * dist;
  const dur    = 1200 + Math.random() * 600;
  const delay  = index * 40;

  setTimeout(() => {
    el.animate([
      { opacity: 1, transform: 'translate(0,0) scale(1)' },
      { opacity: 0, transform: `translate(${dx}px, ${dy}px) scale(0.2) rotate(${Math.random()*360}deg)` },
    ], { duration: dur, easing: 'ease-out', fill: 'forwards' })
      .onfinish = () => el.remove();
  }, delay);
}

/* ============================================
   终幕烟花（Canvas 粒子）
   ============================================ */

/**
 * 在全屏 Canvas 上播放3秒烟花效果
 * 结束后自动移除 Canvas
 */
function triggerFireworks() {
  const canvas  = document.createElement('canvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = `
    position:fixed; inset:0;
    z-index:500; pointer-events:none;
  `;
  document.body.appendChild(canvas);

  const ctx       = canvas.getContext('2d');
  const particles = [];
  const colors    = ['#c9a0dc','#7b68ee','#ffb7c5','#ffd700','#ffffff','#b39ddb'];
  let   startTime = null;
  const DURATION  = 3500;

  function launch() {
    const cx = 0.2 + Math.random() * 0.6;  /* 横向随机 */
    const cy = 0.1 + Math.random() * 0.5;  /* 上半屏 */
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 40 + Math.floor(Math.random() * 30);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x:    canvas.width  * cx,
        y:    canvas.height * cy,
        vx:   Math.cos(angle) * speed,
        vy:   Math.sin(angle) * speed,
        life: 1,
        decay: 0.012 + Math.random() * 0.008,
        radius: 2 + Math.random() * 2,
        color,
      });
    }
  }

  let lastLaunch = -999;
  function draw(ts) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;

    ctx.fillStyle = 'rgba(10,10,46,0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* 每 400ms 发射一次 */
    if (elapsed - lastLaunch > 400 && elapsed < DURATION - 500) {
      launch();
      lastLaunch = elapsed;
    }

    /* 更新粒子 */
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x    += p.vx;
      p.y    += p.vy;
      p.vy   += 0.06;   /* 重力 */
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }

      ctx.globalAlpha = p.life;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (elapsed < DURATION) {
      requestAnimationFrame(draw);
    } else {
      canvas.style.transition = 'opacity 0.8s ease';
      canvas.style.opacity    = '0';
      setTimeout(() => canvas.remove(), 800);
    }
  }

  requestAnimationFrame(draw);
}

/* 挂载到 window 供其他模块调用 */
window.triggerEasterEgg = triggerEasterEgg;
window.triggerFireworks = triggerFireworks;
