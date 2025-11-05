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

    // 获取默认背景图
    const defaultBg = container.getAttribute('data-default-bg');
    
    // 设置默认背景（如果有）
    if (defaultBg) {
      container.style.backgroundImage = `url(${defaultBg})`;
      container.style.opacity = '1';
    } else {
      // 如果没有默认背景，使用渐变
      container.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      container.style.opacity = '1';
    }

    // Bing每日一图API
    const bingAPI = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';
    
    // 尝试从缓存获取
    const cachedImage = localStorage.getItem('bingDailyImage');
    const cacheTime = localStorage.getItem('bingDailyImageTime');
    const now = Date.now();
    
    // 如果缓存存在且未过期（24小时），使用缓存覆盖默认背景
    if (cachedImage && cacheTime && (now - parseInt(cacheTime)) < 24 * 60 * 60 * 1000) {
      // 预加载缓存的图片
      const img = new Image();
      img.onload = function() {
        container.style.backgroundImage = `url(${cachedImage})`;
        container.style.opacity = '1';
      };
      img.onerror = function() {
        // 如果缓存图片加载失败，保持默认背景
        console.warn('Cached Bing image failed to load, using default background');
      };
      img.src = cachedImage;
    }

    // 尝试获取新的Bing图片（异步，不阻塞默认背景显示）
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
          
          // 预加载新图片
          const img = new Image();
          img.onload = function() {
            // 淡入新图片
            container.style.transition = 'opacity 1s ease-in-out';
            container.style.backgroundImage = `url(${imageUrl})`;
            container.style.opacity = '1';
          };
          img.onerror = function() {
            // 如果加载失败，保持当前背景
            console.warn('Failed to load new Bing image, keeping current background');
          };
          img.src = imageUrl;
        }
      })
      .catch(error => {
        // 静默失败，保持默认背景
        console.debug('Bing API not available, using default background');
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

