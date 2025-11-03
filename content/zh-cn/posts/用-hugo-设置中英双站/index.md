+++
title = "用 Hugo 设置中英双站"
date = "2025-11-03T16:32:59"
lang = "zh-cn"
draft = false
slug = "用-hugo-设置中英双站"
categories = []
tags = [ "Hugo", "博客搭建",]
featured = false
summary = ""
+++

# 用 Hugo 设置中英双站

> 作者：**BenChuat**
>  更新时间：2025-10-30
>  标签：`Hugo`  `静态博客`  `Blowfish主题`  `多语言`  `GitHub Pages`

```toml
theme = "blowfish"
```

## 开启多语言支持

我们要让博客拥有两个版本：

* 中文：主语言（默认）
* 英文：可切换语言

![image-20251030144528600](用 Hugo 设置中英双站.assets/396e4d402e99.png)

在 `config/_default/` 下新建两个语言配置文件：

### `languages.zh-cn.toml`

```toml
disabled = false
# 是否禁用中文语言；false 表示启用中文站

languageCode = "zh-cn"
# HTML lang="zh-cn"

languageName = "中文"
# 语言切换器里显示 "中文"

weight = 1
# 设为 1，代表中文是主语言、默认语言

title = "BenChuat 的数字花园"
# 中文站点标题

[params]
  displayName = "中"
  # 右上角语言切换里显示的名字，比如“中”

  isoCode = "zh-CN"
  # 用于 SEO / 结构化数据 / OG

  rtl = false
  # 中文也是从左到右

  dateFormat = "2006年1月2日"
  # 日期格式示例: 2025年10月29日

  description = "记录 AI、机器人、个人项目与思考的地方。"
  # 中文站 meta description

  copyright = "© 2025 BenChuat. 保留所有权利"
  # 页脚版权

[params.author]
  name = "BenChuat"
  email = "example@gmail.com"
  headline = "AI · 机器人 · 数字花园"
  bio = "一个在折腾 AI、深度学习、个人知识库和工程实践的学生。"
  # 作者卡片（中文站版本）

  # image = "images/avatar.png"
  # imageQuality = 96

  links = [
    { email = "mailto:example@gmail.com" },
    { link = "http://example.com" }
    # { github = "https://github.com/BenChuat" }
  ]

```

### `languages.en.toml`

```toml
disabled = false
# 是否禁用英文语言；false 表示启用英文站

languageCode = "en"
# HTML lang="en" / SEO 语言声明

languageName = "English"
# 语言切换器里显示 "English"

weight = 2
# 语言权重。中文站可以是 1，英文设成 2，这样中文是默认语言

title = "BenChuat's Blog"
# 英文站显示的站点标题

[params]
  displayName = "EN"
  # 语言切换标签，比如右上角显示 EN

  isoCode = "en"
  # 用于结构化数据，比如 OpenGraph、JSON-LD 等

  rtl = false
  # 文本方向：英文是从左到右，保持 false

  dateFormat = "2 January 2006"
  # 英文日期格式。最终显示类似 "29 October 2025"

  description = "Welcome to BenChuat's Blog"
  # 这个语言版本的网站描述（会进 meta description）

  copyright = "© 2025 BenChuat. All rights reserved."
  # 页脚版权信息

[params.author]
  name = "BenChuat"
  email = "example@gmail.com"
  headline = "I'm only human"
  bio = "A little bit about BenChuat."
  # 你在英文站里展示的个人简介、作者名片

  # 头像路径（可选）
  # image = "images/avatar.png"
  # imageQuality = 96

  # Blowfish 支持展示一组社交链接。
  # 每个条目是 { 平台名 = "链接" } 的格式。
  # 注意：这是一个数组，用 [ ... ] 包住。
  links = [
    { email = "mailto:chuatben@gmail.com" },
    { link = "http://example.com" }
    # 想加 GitHub 就这样：
    # { github = "https://github.com/BenChuat" },
    # 想加 LinkedIn：
    # { linkedin = "https://linkedin.com/in/xxx" }
  ]

```

> 小贴士：
>
> * 文件名要和语言代码对应：`zh-cn`、`en`。
> * 语言排序由 `weight` 决定：数值越小越靠前。
> * 所有文件务必保存为 **UTF-8 无 BOM** 编码。

------

## 配置多语言菜单

再在 `config/_default/` 里创建菜单文件。

### `menus.zh-cn.toml`

```toml
[[main]]
name = "首页"
pageRef = "/"
weight = 1

[[main]]
name = "归档"
pageRef = "/archives/"
weight = 2

[[main]]
name = "标签"
pageRef = "/tags/"
weight = 3

[[main]]
name = "关于"
pageRef = "/about/"
weight = 4
```

### `menus.en.toml`

```toml
[[main]]
name = "Home"
pageRef = "/"
weight = 1

[[main]]
name = "Archive"
pageRef = "/archives/"
weight = 2

[[main]]
name = "Tags"
pageRef = "/tags/"
weight = 3

[[main]]
name = "About"
pageRef = "/about/"
weight = 4
```

保存后，Hugo 会根据当前语言自动加载对应菜单。

------

## 文章目录结构

创建两个内容目录，中文写作主力，英文可选：

```
content/
 ├── zh-cn/
 │    └── posts/
 │         └── hello-world.md
 └── en/
      └── about/
           └── _index.md
```

## 示例文章

在 PowerShell 或终端中运行（确保你在项目根目录 `D:\hugo\blog` 下）：

```
# 创建中文示例文章
hugo new zh-cn/posts/hello-hugo.md

# 创建英文示例文章
hugo new en/posts/hello-hugo.md
```

执行后，Hugo 会自动生成两个 Markdown 文件：

```
content/zh-cn/posts/hello-hugo.md
content/en/posts/hello-hugo.md
```

![image-20251031095448807](用 Hugo 设置中英双站.assets/4ac99d544058.png)

![image-20251031095527896](用 Hugo 设置中英双站.assets/ba37a8563ba3.png)

### 让中英文文章互相关联

Hugo 允许你把两篇内容标记为“同一篇文章的多语言版本”。 
只需在两篇文章的 front matter 里加上相同的 `translationKey`。

`translationKey = "hello-hugo"`
加在两篇文件的头部，就像这样：

```yaml
date = '2025-10-30T14:54:50+08:00'
draft = true
title = '你好Hugo'
tags = ["博客搭建", "Hugo", "Blowfish"]
categories = ["建站日记"]
description = "我的 Hugo 双语博客的第一篇文章"
translationKey = "hello-hugo"
```

这样当你在中文页面时，Blowfish 会自动在侧边显示："Read this post in English"
点击后跳到英文版本，非常智能。

------

## 本地启动预览

```bash
hugo server -D
```

打开浏览器访问：

👉 [http://localhost:1313](http://localhost:1313/)

你会看到：

* 顶部菜单是中文；
* 右上角语言切换按钮「中 / EN」；
* 切到英文后，标题、菜单、日期都自动变语言。

------

## 常见问题

| 问题                           | 解决方案                                    |
| ------------------------------ | ------------------------------------------- |
| 出现 `invalid UTF-8`           | 用 VS Code → 右下角选择「UTF-8 无 BOM」保存 |
| 出现 `expected value, not eof` | 数组 `[ ... ]` 未闭合或末尾多了逗号         |
| 英文菜单未显示                 | 检查文件名 `menus.en.toml` 与语言代码一致   |
| 切换语言后文章消失             | 对应语言目录下未创建 `content/en/` 内容     |

------

