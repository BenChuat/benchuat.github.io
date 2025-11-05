/**
 * Homepage Custom Scripts
 * - Bing Daily Image
 * - Typewriter Animation
 * - Scroll to Articles
 */

(function() {
  'use strict';

  // ============ Bing Daily Image ============
  function loadBingDailyImage() {
    const container = document.getElementById('bing-image-container');
    if (!container) return;

    // Bing每日一图API
    // 使用代理服务避免CORS问题，或者直接使用已知的Bing图片URL格式
    const bingAPI = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';
    
    // 尝试从缓存获取
    const cachedImage = localStorage.getItem('bingDailyImage');
    const cacheTime = localStorage.getItem('bingDailyImageTime');
    const now = Date.now();
    
    // 如果缓存存在且未过期（24小时），使用缓存
    if (cachedImage && cacheTime && (now - parseInt(cacheTime)) < 24 * 60 * 60 * 1000) {
      container.style.backgroundImage = `url(${cachedImage})`;
      container.style.opacity = '1';
      return;
    }

    // 尝试使用fetch获取（Bing API通常支持CORS）
    fetch(bingAPI)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(data => {
        if (data && data.images && data.images[0]) {
          const imageUrl = 'https://www.bing.com' + data.images[0].url;
          
          // 缓存图片URL和时间戳
          localStorage.setItem('bingDailyImage', imageUrl);
          localStorage.setItem('bingDailyImageTime', now.toString());
          
          // 预加载图片
          const img = new Image();
          img.onload = function() {
            container.style.backgroundImage = `url(${imageUrl})`;
            container.style.opacity = '1';
          };
          img.onerror = function() {
            // 如果加载失败，使用默认背景
            container.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            container.style.opacity = '1';
          };
          img.src = imageUrl;
        } else {
          // 如果API返回异常，使用默认背景
          container.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          container.style.opacity = '1';
        }
      })
      .catch(error => {
        console.warn('Failed to load Bing daily image, using default background:', error);
        // 使用默认背景
        container.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        container.style.opacity = '1';
      });
  }

  // ============ Typewriter Animation ============
  function typewriterEffect() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    // 从配置或默认值获取文本
    let text = typewriterElement.getAttribute('data-text');
    if (!text || text.trim() === '') {
      text = "I'm only human";
      typewriterElement.setAttribute('data-text', text);
    }
    const speed = parseInt(typewriterElement.getAttribute('data-speed')) || 100; // 打字速度（毫秒）
    
    let index = 0;
    typewriterElement.textContent = '';
    
    function type() {
      if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        // 打字完成后，添加闪烁的光标
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        typewriterElement.appendChild(cursor);
      }
    }
    
    // 延迟开始打字，让页面先加载
    setTimeout(type, 500);
  }

  // ============ Scroll to Articles ============
  function initScrollToArticles() {
    const scrollArrow = document.getElementById('scroll-arrow');
    const articlesSection = document.getElementById('recent-articles-section');
    const heroSection = document.getElementById('hero-section');
    
    if (!scrollArrow || !articlesSection || !heroSection) return;

    let hasScrolled = false;

    // 检查是否应该显示文章区域
    function checkScroll() {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      // 如果滚动超过hero区域的80%，显示文章
      if (scrollPosition > heroBottom * 0.8 && !hasScrolled) {
        articlesSection.classList.add('visible');
        hasScrolled = true;
        scrollArrow.style.opacity = '0';
        scrollArrow.style.pointerEvents = 'none';
      }
    }

    // 点击箭头滚动到文章区域
    scrollArrow.addEventListener('click', function() {
      const heroHeight = heroSection.offsetHeight;
      window.scrollTo({
        top: heroHeight,
        behavior: 'smooth'
      });
      
      // 延迟显示文章区域，让滚动动画完成
      setTimeout(function() {
        articlesSection.classList.add('visible');
        hasScrolled = true;
        scrollArrow.style.opacity = '0';
        scrollArrow.style.pointerEvents = 'none';
      }, 500);
    });

    // 监听滚动事件
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // 初始检查
    checkScroll();
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

