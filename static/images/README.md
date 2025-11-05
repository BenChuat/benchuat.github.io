# 默认背景图放置说明

## 如何放置默认背景图

1. **创建目录**：如果 `static/images/` 目录不存在，请先创建它

2. **放置图片**：
   - 将你的默认背景图片放在 `static/images/` 目录下
   - 建议图片格式：`.jpg` 或 `.png`
   - 建议图片尺寸：1920x1080 或更大（会自适应缩放）
   - 建议文件命名：`default-bg.jpg` 或 `default-bg.png`

3. **配置路径**：
   - 打开 `config/_default/params.toml`
   - 找到 `defaultBackgroundImage` 配置项
   - 设置为你图片的路径，例如：
     - 如果图片是 `static/images/default-bg.jpg`，则填写：`"images/default-bg.jpg"`
     - 如果图片是 `static/images/background.png`，则填写：`"images/background.png"`

4. **使用网络图片**（可选）：
   - 如果你想使用网络上的图片，可以直接填写URL：
     - `defaultBackgroundImage = "https://example.com/bg.jpg"`

## 注意事项

- 图片路径相对于 `static/` 目录，不需要 `/static/` 前缀
- 如果图片路径配置错误，系统会使用默认的渐变背景
- Bing每日一图会自动覆盖默认背景图（如果API可用）

