/**
 * Homepage Custom Scripts
 * - Bing Daily Image
 * - Typewriter Animation
 * - Scroll to Articles
 */

(function() {
  'use strict';

  // ============ Bing Daily Image ============
  // Note: Using static background image now, Bing image feature disabled
  function loadBingDailyImage() {
    // Background image is now handled by the layout directly
    // This function is kept for compatibility but does nothing
    return;
  }

  // ============ Typewriter Animation ============
  function typewriterEffect() {
    // 查找官方background布局中的headline元素（我们添加了id="typewriter-headline"）
    const typewriterElement = document.getElementById('typewriter-headline');
    if (!typewriterElement) return;

    // 获取原始文本（移除markdown格式）
    let originalText = typewriterElement.textContent.trim();
    if (!originalText || originalText === '') return;
    
    // 移除markdown格式（如果有）
    originalText = originalText.replace(/^\*\*|\*\*$/g, '').trim();
    
    const speed = 100; // 打字速度（毫秒）
    let index = 0;
    typewriterElement.textContent = '';
    
    function type() {
      if (index < originalText.length) {
        typewriterElement.textContent += originalText.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        // 打字完成后，添加闪烁的光标
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.style.display = 'inline-block';
        cursor.style.width = '2px';
        cursor.style.height = '1.2em';
        cursor.style.backgroundColor = 'currentColor';
        cursor.style.marginLeft = '2px';
        cursor.style.animation = 'blink 1s infinite';
        typewriterElement.appendChild(cursor);
      }
    }
    
    // 添加闪烁动画样式（如果不存在）
    if (!document.getElementById('typewriter-cursor-style')) {
      const style = document.createElement('style');
      style.id = 'typewriter-cursor-style';
      style.textContent = `
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // 延迟开始打字，让页面先加载
    setTimeout(type, 500);
  }

  // ============ Scroll to Articles ============
  // 官方background布局不需要自定义滚动处理，使用默认行为
  function initScrollToArticles() {
    // 官方布局会自动处理滚动，这里可以添加一些平滑滚动优化
    // 如果需要平滑滚动，可以添加以下代码
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ============ Initialize on DOM Ready ============
  function init() {
    // 等待DOM完全加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // 加载Bing每日一图
    loadBingDailyImage();

    // 启动打字机动画
    typewriterEffect();

    // 初始化滚动功能
    initScrollToArticles();
  }

  // 启动
  init();
})();

