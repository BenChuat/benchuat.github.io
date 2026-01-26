// 自定义 KaTeX 渲染配置
// 支持行内公式 $ $ 和行间公式 $$ $$
(function() {
  function initKaTeX() {
    // 检查 KaTeX 是否已加载
    if (typeof renderMathInElement === 'undefined') {
      // 如果还没加载，等待一下再试
      setTimeout(initKaTeX, 100);
      return;
    }
    
    // 配置并渲染数学公式
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},   // 行间公式
        {left: "\\[", right: "\\]", display: true}, // 行间公式（LaTeX格式）
        {left: "$", right: "$", display: false},    // 行内公式
        {left: "\\(", right: "\\)", display: false} // 行内公式（LaTeX格式）
      ],
      throwOnError: false,
      strict: false
    });
  }
  
  // 如果 katex-render 脚本已加载，直接初始化
  const katexScript = document.getElementById("katex-render");
  if (katexScript) {
    if (katexScript.complete) {
      // 脚本已加载完成
      initKaTeX();
    } else {
      // 等待脚本加载完成
      katexScript.addEventListener("load", initKaTeX);
    }
  } else {
    // 如果没有找到脚本，尝试直接初始化（可能在其他地方加载）
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initKaTeX, 500);
      });
    } else {
      setTimeout(initKaTeX, 500);
    }
  }
})();

