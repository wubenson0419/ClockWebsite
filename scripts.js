class NTPClock {
  constructor(timeId, msgId) {
    this.$time = document.getElementById(timeId);
    this.$msg = document.getElementById(msgId);
    this.tzOffset = parseInt(localStorage.getItem('tz_offset')) || this.DEFAULT_OFFSET;
    this.ntpDelta = 0;
  }

  DEFAULT_OFFSET = 8 * 3600 * 1000;   // UTC+8 時區預設
  BURNIN_DISTANCE = 1.5;             // 防烙印偏移量
  BURNIN_INTERVAL = 10000;           // 每 10 秒做一次偏移
  MSG_FADE_DELAY = 5000;             // 訊息淡出延遲
  MSG_REMOVE_DELAY = 6000;           // 訊息移除延遲

  init() {
    this.saveOffsetIfNotSet();
    this.updateTime();
    this.applyBurnInShift();
    this.burninTimer = setInterval(() => this.applyBurnInShift(), this.BURNIN_INTERVAL);
    setTimeout(() => this.$msg.classList.add('fade-out'), this.MSG_FADE_DELAY);
    setTimeout(() => this.$msg.remove(), this.MSG_REMOVE_DELAY);
  }

  saveOffsetIfNotSet() {
    if (!localStorage.getItem('tz_offset')) {
      localStorage.setItem('tz_offset', this.DEFAULT_OFFSET);
    }
  }

  applyBurnInShift() {
    const dx = (Math.random() * 2 - 1) * this.BURNIN_DISTANCE;
    const dy = (Math.random() * 2 - 1) * this.BURNIN_DISTANCE;
    this.$time.style.transform = `translate3d(calc(-50% + ${dx}vw), calc(-50% + ${dy}vh), 0)`;
  }

  updateTime = () => {
    const now = Date.now() + this.ntpDelta + this.tzOffset;
    const d = new Date(now);
    const hh = d.getUTCHours().toString().padStart(2, '0');
    const mm = d.getUTCMinutes().toString().padStart(2, '0');
    const ss = d.getUTCSeconds().toString().padStart(2, '0');
    this.$time.textContent = `${hh}：${mm}：${ss}`;
    const drift = now % 1000;
    setTimeout(() => requestAnimationFrame(this.updateTime), 1000 - drift);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NTPClock('time', 'message').init();

  // PWA: 註冊 Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => console.error('SW 註冊失敗:', err));
  }

  const fullscreenButton = document.getElementById('fullscreen-toggle');
  const fullscreenIcon = fullscreenButton.querySelector('.material-symbols-outlined');

  fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        fullscreenIcon.textContent = 'fullscreen_exit';
      });
    } else {
      document.exitFullscreen().then(() => {
        fullscreenIcon.textContent = 'fullscreen';
      });
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      fullscreenIcon.textContent = 'fullscreen';
    } else {
      fullscreenIcon.textContent = 'fullscreen_exit';
    }
  });

  let mouseMoveTimeout;
  const fullscreenControls = document.getElementById('fullscreen-controls');

  const showControls = () => {
    fullscreenControls.classList.remove('hidden');
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
      fullscreenControls.classList.add('hidden');
    }, 5000); // 5秒後隱藏
  };

  document.addEventListener('mousemove', showControls);

  // 初始化時顯示按鈕並啟動計時器
  showControls();

  const customizationPanel = document.getElementById('customization-panel');
  const timeElement = document.getElementById('time');
  const colorPicker = document.getElementById('color-picker');
  const fontPicker = document.getElementById('font-picker');
  let dateDisplay;

  // 初始化偏好設定
  const savedColor = localStorage.getItem('timeColor');
  const savedFont = localStorage.getItem('timeFont');

  if (savedColor) {
    timeElement.style.color = savedColor;
    timeElement.style.textShadow = `0 0 5px ${savedColor}, 0 0 15px ${savedColor}, 0 0 30px ${savedColor}`;
    colorPicker.value = savedColor;
  }

  if (savedFont) {
    timeElement.style.fontFamily = savedFont;
    fontPicker.value = savedFont;
  }

  colorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    timeElement.style.color = color;
    timeElement.style.textShadow = `0 0 5px ${color}, 0 0 15px ${color}, 0 0 30px ${color}`;
    localStorage.setItem('timeColor', color);
  });

  fontPicker.addEventListener('change', (event) => {
    const font = event.target.value;
    timeElement.style.fontFamily = font;
    if (dateDisplay) {
        dateDisplay.style.fontFamily = font;
    }

    if (font.includes("Sixtyfour")) {
      timeElement.style.fontSize = "10vw"; // 縮小字體
    } else {
      timeElement.style.fontSize = "15vw"; // 恢復預設字體大小
    }

    localStorage.setItem('timeFont', font);
  });

  customizationPanel.classList.remove('hidden');

  let customizationTimeout;

  const hideCustomizationPanel = () => {
    customizationPanel.classList.add('hidden');
  };

  // 修復自訂面板自動隱藏功能
  const resetCustomizationTimeout = () => {
    clearTimeout(customizationTimeout);
    customizationTimeout = setTimeout(hideCustomizationPanel, 5000); // 5秒後隱藏
  };

  document.addEventListener('mousemove', () => {
    customizationPanel.classList.remove('hidden');
    resetCustomizationTimeout();
  });

  resetCustomizationTimeout();

  const resetButton = document.getElementById('reset-button');

  resetButton.addEventListener('click', () => {
    // 重設時間字型與顏色為預設值
    const defaultFont = "'Major Mono Display', monospace";
    const defaultColor = "#FF8C00";

    timeElement.style.fontFamily = defaultFont;
    timeElement.style.color = defaultColor;
    timeElement.style.textShadow = `0 0 5px ${defaultColor}, 0 0 15px ${defaultColor}, 0 0 30px ${defaultColor}`;

    localStorage.setItem('timeFont', defaultFont);
    localStorage.setItem('timeColor', defaultColor);

    // 確保 Sixtyfour 字型的特殊處理
    if (defaultFont.includes("Sixtyfour")) {
        timeElement.style.fontSize = "10vw"; // 縮小字體
    } else {
        timeElement.style.fontSize = "15vw"; // 恢復預設字體大小
    }

    // 日期永遠保持白色粗體，並重設字型
    dateDisplay.style.color = "#FFFFFF";
    dateDisplay.style.fontWeight = "bold";
    dateDisplay.style.fontFamily = defaultFont;

    // 重設選擇框中的顏色
    colorPicker.value = defaultColor;
  });

  // 日期按鈕功能邏輯
  const toggleDateButton = document.getElementById('toggle-date-button');
  dateDisplay = document.getElementById('date-display');

  // 初始化日期顯示狀態
  const savedDateVisibility = localStorage.getItem('dateVisibility');
  if (savedDateVisibility === 'visible') {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
    dateDisplay.textContent = formattedDate;
    dateDisplay.style.display = 'block';
    toggleDateButton.innerHTML = '<span class="material-symbols-outlined">event_busy</span>';
  } else {
    dateDisplay.style.display = 'none';
    toggleDateButton.innerHTML = '<span class="material-symbols-outlined">event_available</span>';
  }

  toggleDateButton.addEventListener('click', () => {
    if (dateDisplay.style.display === 'none') {
      const today = new Date();
      const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
      dateDisplay.textContent = formattedDate;
      dateDisplay.style.display = 'block';
      toggleDateButton.innerHTML = '<span class="material-symbols-outlined">event_busy</span>';
      localStorage.setItem('dateVisibility', 'visible');
    } else {
      dateDisplay.style.display = 'none';
      toggleDateButton.innerHTML = '<span class="material-symbols-outlined">event_available</span>';
      localStorage.setItem('dateVisibility', 'hidden');
    }
  });
});
