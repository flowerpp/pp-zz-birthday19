/**
 * 音频控制模块
 * 见契约：contracts/audio-contract.md
 *
 * 重要：startMusic() 必须在用户交互事件的同步回调中调用（iOS Safari 限制）
 */

let _audio = null;
let _playing = false;
let _enabled = true;

/**
 * 初始化音频对象（预加载），页面加载时调用一次。
 * 不自动播放。
 */
function initAudio() {
  _audio = new Audio('assets/audio/birthday-song.mp3');
  _audio.loop = true;
  _audio.volume = 0.7;
  _audio.preload = 'auto';
}

/**
 * 在用户交互回调中调用，触发音乐播放。
 * 浏览器拒绝时静默降级（不抛错）。
 */
function startMusic() {
  if (!_audio || !_enabled) return;
  const promise = _audio.play();
  if (promise !== undefined) {
    promise
      .then(() => { _playing = true; updateAudioBtn(); })
      .catch(() => {
        /* 浏览器阻止自动播放，静默降级，游戏正常继续 */
        _enabled = false;
        _playing = false;
        updateAudioBtn();
      });
  }
}

/**
 * 切换播放 / 暂停状态。
 * @returns {boolean} 切换后是否正在播放
 */
function toggleMusic() {
  if (!_audio || !_enabled) return false;
  if (_playing) {
    _audio.pause();
    _playing = false;
  } else {
    _audio.play().catch(() => {});
    _playing = true;
  }
  updateAudioBtn();
  return _playing;
}

/** @returns {boolean} 当前是否正在播放 */
function isPlaying() {
  return _playing;
}

/** 同步按钮图标 */
function updateAudioBtn() {
  const btn = document.querySelector('.audio-btn');
  if (!btn) return;
  btn.textContent = _playing ? '♪' : '♩';
  btn.title = _playing ? '暂停音乐' : '播放音乐';
}
