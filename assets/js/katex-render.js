// 自定义 KaTeX 渲染配置
// 支持行内公式 $ $ 和行间公式 $$ $$
document.getElementById("katex-render") &&
  document.getElementById("katex-render").addEventListener("load", () => {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},   // 行间公式
        {left: "\\[", right: "\\]", display: true}, // 行间公式（LaTeX格式）
        {left: "$", right: "$", display: false},    // 行内公式
        {left: "\\(", right: "\\)", display: false} // 行内公式（LaTeX格式）
      ],
      throwOnError: false
    });
  });

